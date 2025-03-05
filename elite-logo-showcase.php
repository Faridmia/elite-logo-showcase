<?php
/**
 * @package Elite Logo Showcase
 * @version 1.0.0
 * Plugin Name:       Elite Logo Showcase
 * Plugin URI:        http://github.com/faridmia/elite-logo-showcase
 * Description:       Showcase your brand logos in an elegant carousel or grid with Elite Logo Showcase.
 * Version:           1.0.0
 * Requires at least: 4.7
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
* Define Plugins Contants
*/
define('ELITLOSH_VERSION', '1.0.0');
define('ELITLOSH_CORE_URL', plugin_dir_url(__FILE__));
define('ELITLOSH_PLUGIN_ROOT', __FILE__);
define('ELITLOSH_PLUGIN_PATH', plugin_dir_path(ELITLOSH_PLUGIN_ROOT));
define('ELITLOSH_PLUGIN_TITLE', 'Elite Logo Showcase');
define('ELITLOSH_CORE_ASSETS', ELITLOSH_CORE_URL);

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function elitlosh_register_blocks() {
    $blocks = [
        'brand-logo',
        'brand-carousel'
    ];

    foreach ( $blocks as $block ) {
        register_block_type( __DIR__ . "/build/{$block}" );
    }
}
add_action( 'init', 'elitlosh_register_blocks' );

function elitlosh_enqueue_assets() {
    $styles = [
        'elitelosh-bootstrap-css'  => ['src' => 'assets/css/bootstrap.min.css', 'version' => '5.3.2'],
        'elitelosh-brand-carousel'  => ['src' => 'assets/css/logo-carousel.min.css', 'version' => time()],
        'elitelosh-swiper-css'  => ['src' => 'assets/css/swiper-bundle.min.css', 'version' => time()],
        'elitelosh-brand-style'     => ['src' => 'assets/css/brand.css', 'version' => time()],
    ];

    // Enqueue Styles
    foreach ($styles as $handle => $style) {
        wp_enqueue_style($handle, ELITLOSH_CORE_ASSETS . $style['src'], [], $style['version']);
    }

   
}

add_action('enqueue_block_assets', 'elitlosh_enqueue_assets');


function elitelosh_enqueue_carousel_assets() {

    $scripts = [
        'elitelosh-bundle-js' => ['src' => 'assets/js/swiper-bundle.min.js', 'deps' => ['jquery'], 'version' => time(), 'in_footer' => true],
        'elitelosh-brand-carousel-js' => ['src' => 'assets/js/logo-carousel.js', 'deps' => ['jquery'], 'version' => time(), 'in_footer' => true],
    ];

    // Enqueue Scripts
    foreach ($scripts as $handle => $script) {
        wp_enqueue_script($handle, ELITLOSH_CORE_ASSETS . $script['src'], $script['deps'], $script['version'], $script['in_footer']);
    }
}

add_action('wp_enqueue_scripts', 'elitelosh_enqueue_carousel_assets');





