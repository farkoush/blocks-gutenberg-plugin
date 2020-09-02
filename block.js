var el = wp.element.createElement;

wp.blocks.registerBlockType('shaiful-gutenberg/notice-block', {

   title: 'Notice', // Block name visible to user

   icon: 'lightbulb', // Toolbar icon can be either using WP Dashicons or custom SVG

   category: 'common', // Under which category the block would appear

   attributes: { // The data this block will be storing

      type: { type: 'string', default: 'default' }, // Notice box type for loading the appropriate CSS class. Default class is 'default'.

      title: { type: 'string' }, // Notice box title in h4 tag

      content: { type: 'array', source: 'children', selector: 'p' } /// Notice box content in p tag

   },

   edit: function(props) {
      // How our block renders in the editor in edit mode
      return null;
   },

   save: function(props) {
      // How our block renders on the frontend
      return null;
   }
});

