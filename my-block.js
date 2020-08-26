const { __ } = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks;
// import { RichText } from '@wordpress/block-editor';
const { 
    RichText,
    InspectorControls,
     ColorPalette,
     MediaUpload

} = wp.blockEditor;
const {PanelBody, IconButton} = wp.components;
const { SelectControl } = wp.components;
const { Component } = wp.element;

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
      return ([
          <InspectorControls>
              <PanelBody title={"Background Image Setting"}>
                  <p><strong>Select a Image</strong></p>
                  {/* <MediaUpload
                      onSelect = {onSelectImage}
                      type="image"
                      value= {backgroundImage}
                      render= { ( { open } ) => {
                          <IconButton
                              onClick = { open }
                              icon = "upload"
                              className = "editor-media-placeholder__button is-button is-default is-large">
                                  Background Image
                          </IconButton>
                      }   }
                  /> */}
                  <div className="media">
                      <MediaUpload 
                          onSelect={onSelectImage}
                          render={ ({open}) => {
                              return <img 
                                  src={backgroundImage}
                                  onClick={open}
                                  />;
                          }}
                      />
                  </div>
              </PanelBody>
          </InspectorControls>,
          <div class="cta-container" style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize:'cover',
              backgroundPosition: 'center',
              backgroundRepeat : 'no-repeat'
          }}>
              <RichText
              key="editable"
              tagName="h2" // The tag here is the element output and editable in the admin
              // className={ className }
              value={ title } // Any existing content, either from the database or an attribute default
              // formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
              // onChange={ ( title ) => setAttributes( { title } ) } // Store updated content as a block attribute
              onChange = {onChangeTitle}
              // placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
              placeholder='Heading...' // Display this text before any content has been added by the user
          />
              <RichText
              key="editable"
              tagName="p" // The tag here is the element output and editable in the admin
              // className={ className }
              value={ body } // Any existing content, either from the database or an attribute default
              // formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
              // onChange={ ( body ) => setAttributes( { body } ) } // Store updated content as a block attribute
              onChange = {onChangeBody}
              // placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
              placeholder='body...' // Display this text before any content has been added by the user
          />
          </div>
      ]);

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
