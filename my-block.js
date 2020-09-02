// const { __ } = wp.i18n; // Import __() from wp.i18n
// const {registerBlockType} = wp.blocks;
// import { RichText } from '@wordpress/block-editor';
const { 
    RichText,
    InspectorControls,
     ColorPalette,
     MediaUpload

} = wp.blockEditor;
// const {PanelBody, IconButton} = wp.components;
const { SelectControl } = wp.components;
// const { Component } = wp.element;
var el = wp.element.createElement;
// var el = element.createElement;

wp.blocks.registerBlockType('hanane/border-box', {
  title: 'sample-block',
  icon: 'smiley',
  category: 'common',
  attributes: {
    content: {type: 'string'},
    color: {type: 'string'}
  },
  edit: function(props) {
    function updateContent(event) {
      props.setAttributes({content: event.target.value})
    }

    function updateColor(value) {
      props.setAttributes({color: value.hex})
    }

    return wp.element.createElement(
      "div",
      null,
      wp.element.createElement(
        "h3",
        null,
        "Your Cool Border Box"
      ),
      wp.element.createElement("input", { type: "text", value: props.attributes.content, onChange: updateContent }),
      wp.element.createElement(wp.components.ColorPicker, { color: props.attributes.color, onChangeComplete: updateColor })
    );
  },
  save: function(props) {
    return wp.element.createElement(
      "h3",
      { style: { border: "5px solid " + props.attributes.color } },
      props.attributes.content
    );
  }
});

wp.blocks.registerBlockType( 'designa/image-block', {
  title: 'Image block',
  description: 'Image block.',
  icon: 'video-alt3',
  category: 'common',
  
  attributes: {
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    }
  },


  edit: function( props ) {
      
      var attributes = props.attributes;
      
      var onSelectImage = function( media ) {
      return props.setAttributes({
        mediaURL: media.url
      });
    };

    return [
              
      wp.element.createElement( InspectorControls, { key: 'inspector' },
      wp.element.createElement( wp.components.PanelBody, {
          title: 'Image block',
          className: 'image-block',
          initialOpen: true,
        },

        wp.element.createElement( MediaUpload, {
            onSelect: onSelectImage,
            type: 'image',
            render: function( obj ) {
              return wp.element.createElement( wp.components.Button, {
                    className: 'components-icon-button image-block-btn is-button is-default is-large',
                    onClick: obj.open
                },
                wp.element.createElement( 'svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
                wp.element.createElement( 'path', { d: "M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z" } )
                ),
                wp.element.createElement( 'span', {},
                    'Select image'
                ),
              );
            }
          }),
        
        ),
      )
              
    ];
  },


  save: function( props ) {
    var attributes = props.attributes;

    return (
      wp.element.createElement( 'div', {
        className: props.className
      },
      wp.element.createElement( 'img', {
              src: attributes.mediaURL
          })
      )
    );

  },


} );

// } )(
// window.wp.editor,
// window.wp.components,
// window.wp.i18n,
// window.wp.element,
// );

registerBlockType('hooraweb/custom-cta',{
  //built-in-attributes

  title :'cta',
  description: 'gutenberg block for custom cta',
  icon:'format-image',
  category:'common',

  //custom attributes

  attributes:{ 
      title: {
          type: 'string',
          source: 'html',
          selector: 'h2',
      },
      body: {
          type: 'string',
          source: 'html',
          selector: 'p',
      },
      backgroundImage: {
          type: 'string',
          default: 'http://placehold.it/500',
      },
      mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
      }
  },


  //built-in functions
  
  edit( { className,attributes, setAttributes } ) {
      const {title, body, backgroundImage} = attributes
      //custom functions
      // function onChange( event ) {
          //     setAttributes( { author: event.target.value } );
          // }
      function onChangeTitle( newTitle ) {
          setAttributes( { title: newTitle } );
      }
      function onChangeBody( newBody ) {
          setAttributes( { body: newBody } );
      }
      function onSelectImage( newImage ) {
          setAttributes( { backgroundImage: newImage.sizes.full.url } );
      }
   
      // return <input value={ attributes.author } onChange={ onChange } type="text" />;
      return [
          /*#__PURE__*/
          React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
            title: "Background Image Setting"
          }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Select a Image")), /*#__PURE__*/React.createElement("div", {
            className: "media"
          }, /*#__PURE__*/React.createElement(MediaUpload, {
            onSelect: onSelectImage,
            render: ({
              open
            }) => {
              return /*#__PURE__*/React.createElement("img", {
                src: backgroundImage,
                onClick: open
              });
            }
          })))),
          /*#__PURE__*/React.createElement("div", {
            class: "cta-container",
            style: {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          }, 
          /*#__PURE__*/React.createElement(RichText, {
            key: "editable",
            tagName: "h2",
            value: title,
            onChange: onChangeTitle,
            placeholder: "Heading..." // Display this text before any content has been added by the user

          }), 
          /*#__PURE__*/React.createElement(RichText, {
            key: "editable",
            tagName: "p",
            value: body,
            onChange: onChangeBody,
            placeholder: "body..."
          }))
      ]

  },

  save({attributes}){
      const {title, body, backgroundImage} = attributes
      return (
          <div class="cta-container"
          style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize:'cover',
              backgroundPosition: 'center',
              backgroundRepeat : 'no-repeat'
          }}>
              <h2>{ title }</h2>
              <RichText.Content
                  tagName="p" // The tag here is the element output and editable in the admin
                  // className={ className }
                  value={ body }
              />
          </div>
      )
      
  }
})


// registerBlockType('hooraweb/custom-cta',{
  //   //built-in-attributes
  
  //   title :'cta',
  //   description: 'gutenberg block for custom cta',
  //   icon:'format-image',
  //   category:'common',
  
  //   //custom attributes
  
  //   attributes:{ 
  //       title: {
  //           type: 'string',
  //           source: 'html',
  //           selector: 'h2',
  //       },
  //       body: {
  //           type: 'string',
  //           source: 'html',
  //           selector: 'p',
  //       },
  //       backgroundImage: {
  //           type: 'string',
  //           default: 'http://placehold.it/500',
  //       },
  //   },
  
  
  //   //built-in functions
    
  //   edit( { className,attributes, setAttributes } ) {
  //       const {title, body, backgroundImage} = attributes
  //       //custom functions
  //       // function onChange( event ) {
  //           //     setAttributes( { author: event.target.value } );
  //           // }
  //       function onChangeTitle( newTitle ) {
  //           setAttributes( { title: newTitle } );
  //       }
  //       function onChangeBody( newBody ) {
  //           setAttributes( { body: newBody } );
  //       }
  //       function onSelectImage( newImage ) {
  //           setAttributes( { backgroundImage: newImage.sizes.full.url } );
  //       }
     
  //       // return <input value={ attributes.author } onChange={ onChange } type="text" />;
  //       return ([
  //           <InspectorControls>
  //               <PanelBody title={"Background Image Setting"}>
  //                   <p><strong>Select a Image</strong></p>
  //                   {/* <MediaUpload
  //                       onSelect = {onSelectImage}
  //                       type="image"
  //                       value= {backgroundImage}
  //                       render= { ( { open } ) => {
  //                           <IconButton
  //                               onClick = { open }
  //                               icon = "upload"
  //                               className = "editor-media-placeholder__button is-button is-default is-large">
  //                                   Background Image
  //                           </IconButton>
  //                       }   }
  //                   /> */}
  //                   <div className="media">
  //                       <MediaUpload 
  //                           onSelect={onSelectImage}
  //                           render={ ({open}) => {
  //                               return <img 
  //                                   src={backgroundImage}
  //                                   onClick={open}
  //                                   />;
  //                           }}
  //                       />
  //                   </div>
  //               </PanelBody>
  //           </InspectorControls>,
  //           <div class="cta-container" style={{
  //               backgroundImage: `url(${backgroundImage})`,
  //               backgroundSize:'cover',
  //               backgroundPosition: 'center',
  //               backgroundRepeat : 'no-repeat'
  //           }}>
  //               <RichText
  //               key="editable"
  //               tagName="h2" // The tag here is the element output and editable in the admin
  //               // className={ className }
  //               value={ title } // Any existing content, either from the database or an attribute default
  //               // formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
  //               // onChange={ ( title ) => setAttributes( { title } ) } // Store updated content as a block attribute
  //               onChange = {onChangeTitle}
  //               // placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
  //               placeholder='Heading...' // Display this text before any content has been added by the user
  //           />
  //               <RichText
  //               key="editable"
  //               tagName="p" // The tag here is the element output and editable in the admin
  //               // className={ className }
  //               value={ body } // Any existing content, either from the database or an attribute default
  //               // formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
  //               // onChange={ ( body ) => setAttributes( { body } ) } // Store updated content as a block attribute
  //               onChange = {onChangeBody}
  //               // placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
  //               placeholder='body...' // Display this text before any content has been added by the user
  //           />
  //           </div>
  //       ]);
  
  //   },
  
  //   save({attributes}){
  //       const {title, body, backgroundImage} = attributes
  //       return (
  //           <div class="cta-container"
  //           style={{
  //               backgroundImage: `url(${backgroundImage})`,
  //               backgroundSize:'cover',
  //               backgroundPosition: 'center',
  //               backgroundRepeat : 'no-repeat'
  //           }}>
  //               <h2>{ title }</h2>
  //               <RichText.Content
  //                   tagName="p" // The tag here is the element output and editable in the admin
  //                   // className={ className }
  //                   value={ body }
  //               />
  //           </div>
  //       )
        
  //   }
  // })