import { __ } from "@wordpress/i18n";
import { desktop, tablet, mobile, cog, alignCenter, styles } from '@wordpress/icons';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	PanelRow,
	RangeControl,
	TabPanel,
	ToggleControl,
	SelectControl,
	ColorPicker,
	ColorPalette
} from "@wordpress/components";
import Slider from "react-slick";
import { useState } from 'react';
import { useEffect  } from "@wordpress/element";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
	const {
		brands = [],
		autoplay = true,
		infinite = true,
		autoplaySpeed = 2500, // Default value
		arrows = true,
		dots = false,
		enable_mouse_control = true,
		spaceBetweenDesktop = 30,
		spaceBetweenTablet = 20,
		spaceBetweenMobile = 10,
		sliderDirection = "ltr",
		normalDotColor = "#cccccc",
		activeDotColor = "#000000",
		arrowBgColor = "#ffffff",
		arrowIconColor = "#000000"
	} = attributes;
	const updateBrands = (images) => {
		setAttributes({
			brands: [
				...brands,
				...images.map((img) => ({
					id: img.id || img.name,
					url: img.url || URL.createObjectURL(img),
					alt: img.alt || img.name || "",
				})),
			],
		});
	};

	// Custom file upload (local)
	const openFileDialog = () => {
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.multiple = true;
		fileInput.style.display = "none";

		fileInput.addEventListener("change", (event) => {
			if (event.target.files.length > 0) {
				updateBrands(Array.from(event.target.files));
			}
		});

		document.body.appendChild(fileInput);
		fileInput.click();
		document.body.removeChild(fileInput);
	};

	const setSpacing = (device, value) => {
		setAttributes({
			[device === "desktop"
				? "spaceBetweenDesktop"
				: device === "tablet"
				? "spaceBetweenTablet"
				: "spaceBetweenMobile"]: value,
		});
	};

	const sliderSettings = {
		autoplay,
		infinite,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplaySpeed,
		arrows,
		dots,
		draggable: enable_mouse_control,
		swipe: enable_mouse_control,
		rtl: sliderDirection === "rtl",
		responsive: [
			{ breakpoint: 1024, settings: { slidesToShow: 4 } },
			{ breakpoint: 768, settings: { slidesToShow: 3 } },
			{ breakpoint: 480, settings: { slidesToShow: 2 } },
		],
	};

	// Inline styling for gap between logos
	const brandGalleryStyle = {
		display: "flex",
		gap: `${spaceBetweenDesktop}px`,
	};

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--slider-gap",
			`${spaceBetweenDesktop}px`,
		);
	}, [spaceBetweenDesktop]);

	useEffect(() => {
        document.documentElement.style.setProperty("--normal-dot-color", normalDotColor);
        document.documentElement.style.setProperty("--active-dot-color", activeDotColor);
        document.documentElement.style.setProperty("--arrow-bg-color", arrowBgColor);
        document.documentElement.style.setProperty("--arrow-icon-color", arrowIconColor);
    }, [normalDotColor, activeDotColor, arrowBgColor, arrowIconColor]);

	const colors = [
		{ name: 'White', color: '#ffffff' },
		{ name: 'Black', color: '#000000' },
		{ name: 'Yellow', color: '#ffeb3b' },
		{ name: 'Pink', color: '#e91e63' },
		{ name: 'Blue', color: '#3f51b5' },
		{ name: 'Gray', color: '#9e9e9e' },
		{ name: 'Transparent', color: 'transparent' },
	];

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="settings-tabs"
					activeClass="active-tab"
					tabs={[
						{ 
							name: "carousel", 
							title: __("Carousel", "elite-logo-showcase"), 
							icon: cog, // Icon for the Carousel tab
							className: "carousel-tab"
						},
						{ 
							name: "style", 
							title: __("Style", "elite-logo-showcase"), 
							icon: styles, // Icon for the Style tab
							className: "style-tab"
						},
					]}
				>
					{(tab) => (
						<>
							{tab.name === "carousel" && (
								<>
									<PanelBody
										title={__("Carousel Settings", "elite-logo-showcase")}
										initialOpen={true}
									>
										<ToggleControl
											label={__("Autoplay", "elite-logo-showcase")}
											checked={autoplay}
											onChange={() => setAttributes({ autoplay: !autoplay })}
										/>
										<ToggleControl
											label={__("Infinite Scroll", "elite-logo-showcase")}
											checked={infinite}
											onChange={() => setAttributes({ infinite: !infinite })}
										/>
										<ToggleControl
											label={__("Show Arrows", "elite-logo-showcase")}
											checked={arrows}
											onChange={() => setAttributes({ arrows: !arrows })}
										/>
										<ToggleControl
											label={__("Show Dots", "elite-logo-showcase")}
											checked={dots}
											onChange={() => setAttributes({ dots: !dots })}
										/>
										<ToggleControl
											label={__("Enable Mouse Control", "elite-logo-showcase")}
											checked={enable_mouse_control}
											onChange={() =>
												setAttributes({ enable_mouse_control: !enable_mouse_control })
											}
										/>
										<RangeControl
											beforeIcon="arrow-left-alt2"
											afterIcon="arrow-right-alt2"
											label={__("Autoplay Speed", "elite-logo-showcase")}
											min={100}
											max={10000}
											step={100}
											value={autoplaySpeed}
											onChange={(new_val) => setAttributes({ autoplaySpeed: new_val })}
										/>
										<SelectControl
											label={__("Slider Direction", "elite-logo-showcase")}
											value={sliderDirection}
											options={[
												{ value: "ltr", label: __("Left to Right", "elite-logo-showcase") },
												{ value: "rtl", label: __("Right to Left", "elite-logo-showcase") },
											]}
											onChange={(value) => setAttributes({ sliderDirection: value })}
										/>
									</PanelBody>
									<PanelBody title={__("Logo Spacing", "elite-logo-showcase")} initialOpen={true}>
										<TabPanel
											className="responsive-tabs elite-logo-spacing-tab"
											activeClass="active-tab"
											tabs={[
												{ 
													name: "desktop", 
													title: __("Desktop", "elite-logo-showcase"), 
													icon: desktop, // Icon for Desktop
													className: "desktop-tab"
												},
												{ 
													name: "tablet", 
													title: __("Tablet", "elite-logo-showcase"), 
													icon: tablet, // Icon for Tablet
													className: "tablet-tab"
												},
												{ 
													name: "mobile", 
													title: __("Mobile", "elite-logo-showcase"), 
													icon: mobile, // Icon for Mobile
													className: "mobile-tab"
												},
											]}
										>
											{(tab) => (
												<RangeControl
													label={__("Space Between Logos", "elite-logo-showcase")}
													value={
														tab.name === "desktop"
															? spaceBetweenDesktop
															: tab.name === "tablet"
															? spaceBetweenTablet
															: spaceBetweenMobile
													}
													onChange={(value) => setSpacing(tab.name, value)}
													min={0}
													max={100}
													step={1}
													allowReset
												/>
											)}
										</TabPanel>
									</PanelBody>
								</>
							)}

							{tab.name === "style" && (
								<PanelBody title={__("Color Settings", "elite-logo-showcase")} initialOpen={true}>
									<div className="color-section">
										<h3>{__("Icon Color", "elite-logo-showcase")}</h3>
										<div className="color-picker-group">
											<div className="color-picker-item">
												<label>{__("Normal Dot Color", "elite-logo-showcase")}</label>
												<ColorPalette 
													colors={colors} 
													value={normalDotColor} 
													onChange={(color) => setAttributes({ normalDotColor: color })}
													clearable={true}
												/>
											</div>
											<div className="color-picker-item">
												<label>{__("Active Dot Color", "elite-logo-showcase")}</label>
												<ColorPalette 
													colors={colors} 
													value={activeDotColor} 
													onChange={(color) => setAttributes({ activeDotColor: color })}
													clearable={true}
												/>
											</div>
											<div className="color-picker-item">
												<label>{__("Arrow Icon Color", "elite-logo-showcase")}</label>
												<ColorPalette 
													colors={colors} 
													value={arrowIconColor} 
													onChange={(color) => setAttributes({ arrowIconColor: color })}
													clearable={true}
												/>
											</div>
										</div>
										<div className="color-section">
											<h3>{__("Icon Background", "elite-logo-showcase")}</h3>
											<div className="color-picker-group">
												<div className="color-picker-item">
													<label>{__("Arrow Background Color", "elite-logo-showcase")}</label>
													<ColorPalette 
														colors={colors} 
														value={arrowBgColor} 
														onChange={(color) => setAttributes({ arrowBgColor: color })}
														clearable={true}
													/>
												</div>
											</div>
										</div>
									</div>
								</PanelBody>
							)}
						</>
					)}
				</TabPanel>
			</InspectorControls>

			{/* Block Content */}
			<div {...useBlockProps({ className: "elite-logo-showcase-block brand-logo-block" })}>
				{brands.length === 0 ? (
					<div className="brand-upload-container">
						<p>
							<strong>{__("Add Logos", "elite-logo-showcase")}</strong>
						</p>
						<div className="brand-upload-buttons">
							<Button variant="primary" onClick={openFileDialog}>
								{__("Upload", "elite-logo-showcase")}
							</Button>
							<MediaUpload
								onSelect={updateBrands}
								allowedTypes={["image"]}
								multiple
								gallery
								render={({ open }) => (
									<Button onClick={open} variant="secondary">
										{__("Media Library", "elite-logo-showcase")}
									</Button>
								)}
							/>
						</div>
					</div>
				) : (
					<div className="brand-gallery">
						<Slider {...sliderSettings}>
							{brands.map((brand) => (
								<div
									key={brand.id}
									className="brand-item"
									style={{ marginRight: `${spaceBetweenDesktop}px` }}
								>
									<img src={brand.url} alt={brand.alt} />
								</div>
							))}
						</Slider>
					</div>
				)}
			</div>
		</>
	);
};

export default Edit;
