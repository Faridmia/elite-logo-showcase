/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
const Save = (props) => {
	const { attributes } = props;
	const { 
		brands = [], 
		autoplay, 
		infinite, 
		autoplaySpeed, 
		dots, 
		arrows, 
		spaceBetweenDesktop,
		sliderDirection,
		enable_mouse_control,
		normalDotColor,
        activeDotColor,
        arrowBgColor,
        arrowIconColor,
	} = attributes;

	const changedAtts = {
		infinite: infinite,
		autoplay: autoplay,
		autoplaySpeed: autoplaySpeed,
		dots: dots,
		arrows: arrows,
		item_gap: spaceBetweenDesktop,
		rtl: sliderDirection === 'rtl', 
		enable_mouse_control: enable_mouse_control
	};

	let brandsData = JSON.stringify(brands, null, 2); 
	// Log the brands and check the data
	const parsedBrands = JSON.parse(brandsData); 
	let dotextra_class = changedAtts.dots ? "elitelosh-dot" : "";


	return (
		<div {...useBlockProps.save()}>
			<div className={`elitelosh-testimonial-company-slider ${dotextra_class}`}>
			<div class="swiper" data-logoone={JSON.stringify(changedAtts)}>
				<div class="swiper-wrapper" style={{
                    "--arrow-bg": arrowBgColor, // CSS variable use korlam
                    "--arrow-color": arrowIconColor,
                    "--active-dot-color": activeDotColor,
                    "--normal-dot-color": normalDotColor,
                }}>
					
				{parsedBrands && parsedBrands.length > 0 ? (
							parsedBrands.map((brand, index) => (
					<div class="swiper-slide" key={index}>
						<div class="elitelosh-company-logo">
							<img
								src={brand.url || 'path_to_default_image.jpg'} // Ensure URL is used as image source
								alt={brand.alt || 'Brand Logo'}
							/>
						</div>
					</div>
						))
					) : (
						<p>{__("No brands available", "elite-logo-showcase")}</p>

					)}
				</div>
				
				<div class="swiper-pagination"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</div>
		</div>
		</div>

		
	);
};

export default Save;
