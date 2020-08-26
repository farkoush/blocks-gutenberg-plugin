
class mySelectPosts extends Component {
	static getInitialState( selectedPost ) {
        return {
          posts: [],
          selectedPost: selectedPost,
          post: {}, 
        };
      }
      // Constructing our component. With super() we are setting everything to 'this'.
      // Now we can access the attributes with this.props.attributes
    //   constructor() {
    //     super( ...arguments );
    //     // Maybe we have a previously selected post. Try to load it.
    //     this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );
    //   }
    constructor() {
        super( ...arguments );
        this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );
        // Bind so we can use 'this' inside the method.
        this.getOptions = this.getOptions.bind(this);
        // Load posts.
        this.getOptions();
        this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
      }
      getOptions() {
        return ( new wp.api.collections.Posts() ).fetch().then( ( posts ) => {
          if( posts && 0 !== this.state.selectedPost ) {
            // If we have a selected Post, find that post and add it.
            const post = posts.find( ( item ) => { return item.id == this.state.selectedPost } );
            // This is the same as { post: post, posts: posts }
            this.setState( { post, posts } );
          } else {
            this.setState({ posts });
          }
        });
      } 
    //   render() {
    //     let options = [ { value: 0, label: __( 'Select a Post' ) } ];
    //     let output  = __( 'Loading Posts' );
    //     if( this.state.posts.length > 0 ) {
    //       const loading = __( 'We have %d posts. Choose one.' );
    //       output = loading.replace( '%d', this.state.posts.length );
    //       this.state.posts.forEach((post) => {
    //         options.push({value:post.id, label:post.title.rendered});
    //       });
    //      } else {
    //        output = __( 'No posts found. Please create some first.' );
    //      }
    //      return [
    //        !! this.props.isSelected && ( <InspectorControls key='inspector'>
    //          <SelectControl value={ this.props.attributes.selectedPost } label={ __( 'Select a Post' ) } options={ options } />
    //         </InspectorControls>
    //        ),
    //        output
    //      ]
    //   }
    onChangeSelectPost( value ) {
        // Find the post
        const post = this.state.posts.find( ( item ) => { return item.id == parseInt( value ) } );
        // Set the state
        this.setState( { selectedPost: parseInt( value ), post } );
        // Set the attributes
        this.props.setAttributes( {
          selectedPost: parseInt( value ),
          title: post.title.rendered,
          content: post.excerpt.rendered,
          link: post.link,
        });
      }
    
    //   render() {
    //     // ...
    //     return [
    //      !! this.props.focus && ( <InspectorControls key='inspector'>
    //        // Adding onChange method.
    //        <SelectControl onChange={this.onChangeSelectPost} value={ this.props.attributes.selectedPost } label={ __( 'Select a Post' ) } options={ options } />
    //       </InspectorControls>
    //       ),
    //       output
    //     ]
    //   }
    render() {
        let options = [ { value: 0, label:  'Select a Post'  } ];
        let output  = 'Loading Posts' ;
        this.props.className += ' loading';
        if( this.state.posts.length > 0 ) {
          const loading =  'We have %d posts. Choose one.' ;
          output = loading.replace( '%d', this.state.posts.length );
          this.state.posts.forEach((post) => {
            options.push({value:post.id, label:post.title.rendered});
          });
         } else {
           output = 'No posts found. Please create some first.' ;
         }
         if( this.state.post.hasOwnProperty('title') ) {
            output = <div className="post">
              <a href={ this.state.post.link }><h2 dangerouslySetInnerHTML={ { __html: this.state.post.title.rendered } }></h2></a>
              <p dangerouslySetInnerHTML={ { __html: this.state.post.excerpt.rendered } }></p>
              </div>;
            this.props.className += ' has-post';
          } else {
            this.props.className += ' no-post';
          }
          return [
            !! this.props.isSelected && ( <InspectorControls key='inspector'>
              <SelectControl onChange={this.onChangeSelectPost} value={ this.props.attributes.selectedPost } label={ __( 'Select a Post' ) } options={ options } />
            </InspectorControls>
            ), 
            <div className={this.props.className}>{output}</div>
          ]
      }
      
}

registerBlockType( 'hooraweb/custom-last-post', {
	// ...
    title: 'custom last post', // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    
      attributes: {
        content: {
          type: 'array',
          source: 'children',
          selector: 'p',
        },
        title: {
          type: 'string',
          selector: 'h2'
        },
        link: {
          type: 'string',
          selector: 'a'
        },
        selectedPost: {
          type: 'number',
          default: 0,
        },
      },
	// The "edit" property must be a valid function.
    edit: mySelectPosts,
    save: function( props ) {
        return (
          <div>
            <div className="post">
              <a href={ props.attributes.link }><h2 dangerouslySetInnerHTML={ { __html: props.attributes.title } }></h2></a>
              {/* <p dangerouslySetInnerHTML={ { __html: props.attributes.content } }></p> */}
            </div>
          </div>
        );
      },

	// ...
} );


