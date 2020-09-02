<?php

/**
 * Plugin Name: Simple Block Gutenberg
 * Author: hananeh
 * Version: 1.0.0
 */

function loadMyBlockFiles() {
  wp_enqueue_script(
    'my-super-unique-handle',
    plugin_dir_url(__FILE__) . 'my-block.js',
    array('wp-blocks', 'wp-i18n', 'wp-editor'),
    true
  );
}
 
add_action('enqueue_block_editor_assets', 'loadMyBlockFiles');


// function shaiful_gutenberg_notice_block_admin() {
//    wp_enqueue_script(
//       'gutenberg-notice-block-editor',
//       plugins_url( 'block.js', __FILE__ ),
//       array( 'wp-blocks', 'wp-element' )
//    );

//    wp_enqueue_style(
//       'gutenberg-notice-block-editor',
//       plugins_url( 'block.css', __FILE__ ),
//       array()
//    );
// }

// add_action( 'enqueue_block_editor_assets', 'shaiful_gutenberg_notice_block_admin' );

// // Load assets for frontend
// function shaiful_gutenberg_notice_block_frontend() {

//    wp_enqueue_style(
//       'gutenberg-notice-block-editor',
//       plugins_url( 'block.css', __FILE__ ),
//       array()
//    );
// }
// add_action( 'wp_enqueue_scripts', 'shaiful_gutenberg_notice_block_frontend' );