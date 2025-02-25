/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

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


	return (
		<div {...useBlockProps.save()}>
			<div
				className="elitelogo-logoCarousel-wrapper-871"
				id="logo-sliderone"
				data-logoone={JSON.stringify(changedAtts)} 
			>
				<div className="elitelogo-logoCarousel-box-871">
					<div className="owl-carousel owl-theme" style={{
                    "--arrow-bg": arrowBgColor, // CSS variable use korlam
                    "--arrow-color": arrowIconColor,
                    "--active-dot-color": activeDotColor,
                    "--normal-dot-color": normalDotColor,
                }}>
						{parsedBrands && parsedBrands.length > 0 ? (
							parsedBrands.map((brand, index) => (
								<div key={index} className="elitelogo-logoCarousel-item">
									<a href={brand.url} target="_blank" rel="noopener noreferrer">
										<img
											src={brand.url || 'path_to_default_image.jpg'} // Ensure URL is used as image source
											alt={brand.alt || 'Brand Logo'}
										/>
									</a>
								</div>
							))
						) : (
							<p>No brands available</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save;
