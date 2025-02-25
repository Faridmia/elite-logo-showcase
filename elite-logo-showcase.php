<?php
/**
 * @package Elite Logo Showcase
 * @version 1.0.0
 * Plugin Name:       Elite Logo Showcase
 * Plugin URI:        http://github.com/faridmia/elite-logo-showcase
 * Description:       Showcase your brand logos in an elegant carousel or grid with Elite Logo Showcase.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            zamzamcoders
 * Author URI:        https://profiles.wordpress.org/zamzamcoders/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       elite-logo-showcase
 * Domain Path:       /i18n/languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function elite_logo_register_blocks() {
    $blocks = [
        'brand-logo',
        'brand-carousel'
    ];

    foreach ( $blocks as $block ) {
        register_block_type( __DIR__ . "/build/{$block}" );
    }
}
add_action( 'init', 'elite_logo_register_blocks' );

function elite_logo_enqueue_assets() {
    $styles = [
        'elite-logo-bootstrap-css'  => ['src' => 'assets/css/bootstrap.min.css', 'version' => '5.3.2'],
        'elite-logo-brand-carousel'  => ['src' => 'assets/css/logo-carousel.min.css', 'version' => time()],
        'elite-logo-owl-carousel'  => ['src' => 'assets/css/owl-carousel.min.css', 'version' => time()],
        'elite-logo-owl-theme'  => ['src' => 'assets/css/owl-theme-default.min.css', 'version' => time()],
        'elite-logo-brand-style'     => ['src' => 'assets/css/brand2.css', 'version' => time()],
    ];

    // Enqueue Styles
    foreach ($styles as $handle => $style) {
        wp_enqueue_style($handle, plugin_dir_url(__FILE__) . $style['src'], [], $style['version']);
    }

   
}

add_action('enqueue_block_assets', 'elite_logo_enqueue_assets');


function enqueue_carousel_assets() {

    $scripts = [
        'elite-owl-carousel-js' => ['src' => 'assets/js/owl.carousel.min.js', 'deps' => ['jquery'], 'version' => time(), 'in_footer' => true],
        'elite-logo-brand-carousel-js' => ['src' => 'assets/js/logo-carousel2.js', 'deps' => ['jquery'], 'version' => time(), 'in_footer' => true],
    ];

    // Enqueue Scripts
    foreach ($scripts as $handle => $script) {
        wp_enqueue_script($handle, plugin_dir_url(__FILE__) . $script['src'], $script['deps'], $script['version'], $script['in_footer']);
    }
}

add_action('wp_enqueue_scripts', 'enqueue_carousel_assets');





