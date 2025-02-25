import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl, TabPanel } from '@wordpress/components';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const { brands = [], spaceBetweenDesktop = 30, spaceBetweenTablet = 20, spaceBetweenMobile = 10 } = attributes;

    const updateBrands = (images) => {
        setAttributes({
            brands: images.map((img) => ({
                id: img.id,
                url: img.url,
                alt: img.alt || '',
            })),
        });
    };

    // Direct file upload function
    const openFileDialog = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files.length > 0) {
                const newImages = Array.from(files).map(file => ({
                    id: file.name,
                    url: URL.createObjectURL(file),
                    alt: file.name,
                }));
                updateBrands([...brands, ...newImages]);
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    };

    const setSpacing = (device, value) => {
        if (device === 'desktop') {
            setAttributes({ spaceBetweenDesktop: value });
        } else if (device === 'tablet') {
            setAttributes({ spaceBetweenTablet: value });
        } else {
            setAttributes({ spaceBetweenMobile: value });
        }
    };

    return (
        <>
            {/* Inspector Controls (Settings Panel Right Side) */}
            <InspectorControls>
                <PanelBody title={__('Logo Spacing', 'elite-logo-showcase')} initialOpen={true}>
                    <TabPanel
                        className="responsive-tabs"
                        activeClass="active-tab"
                        tabs={[
                            { name: 'desktop', title: '🖥️', className: 'desktop-tab' },
                            { name: 'tablet', title: '📱', className: 'tablet-tab' },
                            { name: 'mobile', title: '📴', className: 'mobile-tab' },
                        ]}
                    >
                        {(tab) => {
                            let currentValue, setValue;

                            if (tab.name === 'desktop') {
                                currentValue = spaceBetweenDesktop;
                                setValue = (value) => setAttributes({ spaceBetweenDesktop: value });
                            } else if (tab.name === 'tablet') {
                                currentValue = spaceBetweenTablet;
                                setValue = (value) => setAttributes({ spaceBetweenTablet: value });
                            } else {
                                currentValue = spaceBetweenMobile;
                                setValue = (value) => setAttributes({ spaceBetweenMobile: value });
                            }

                            return (
                                <RangeControl
                                label={__('Space Between Logos', 'elite-logo-showcase')}
                                value={
                                    tab.name === 'desktop'
                                        ? spaceBetweenDesktop
                                        : tab.name === 'tablet'
                                        ? spaceBetweenTablet
                                        : spaceBetweenMobile
                                }
                                onChange={(value) => setSpacing(tab.name, value)}
                                min={0}
                                max={100}
                                step={1}
                                allowReset
                            />
                            );
                        }}
                    </TabPanel>
                </PanelBody>
            </InspectorControls>

            {/* Block Content */}
            <div {...useBlockProps({ className: 'brand-logo-block' })}>
                {brands.length === 0 && (
                    <>
                        <p><strong>{ __('Add Logos', 'elite-logo-showcase') }</strong></p>
                        <p>{ __('Upload an image from your desktop or select from Media Library.', 'elite-logo-showcase') }</p>

                        <div className="brand-upload-buttons">
                            {/* Custom file upload button */}
                            <Button variant="primary" onClick={openFileDialog}>{ __('Upload', 'elite-logo-showcase') }</Button>

                            {/* WordPress Media Library */}
                            <MediaUpload
                                onSelect={updateBrands}
                                allowedTypes={['image']}
                                multiple
                                gallery
                                render={({ open }) => (
                                    <Button onClick={open} variant="secondary">{ __('Media Library', 'elite-logo-showcase') }</Button>
                                )}
                            />
                        </div>
                    </>
                )}

                <div className="brand-gallery"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: `${spaceBetweenDesktop}px`,
                    }}>
                    {brands.map((brand, index) => (
                        <div key={index} className="brand-item">
                            <img src={brand.url} alt={brand.alt} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default Edit;
