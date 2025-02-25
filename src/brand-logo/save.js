/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

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
	const { brands, spaceBetweenDesktop = 30 } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="rbt-brand-area bg-color-white rbt-section-gap">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<ul
								className="brand-list brand-style-3 justify-content-center justify-content-lg-between"
								style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: `${spaceBetweenDesktop}px`,
                                }}
							>
								{brands.map((brand, index) => (
									<li key={index} className="brand-item">
										{brand.url ? (
											<a href={brand.url} target="_blank" rel="noopener noreferrer">
												<img src={brand.url} alt={brand.alt} />
											</a>
										) : (
											<img src={brand.url} alt={brand.alt} />
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save;