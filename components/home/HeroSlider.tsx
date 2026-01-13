'use client';
import { useEffect } from 'react';

const HeroSlider = () => {
    useEffect(() => {
        // Ported from js/main-slider-script.js
        const initSlider = () => {
            const $ = (window as any).jQuery;
            if (!$) return;

            // Check if revolution function exists
            if (!$.fn.revolution) return;

            $("#rev_slider_one").show().revolution({
                sliderType: "standard",
                jsFileLocation: "/assets/plugins/revolution/js/",
                sliderLayout: "fullwidth",
                dottedOverlay: "none",
                delay: 6000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "on",
                    touch: {
                        touchenabled: "on",
                        touchOnDesktop: "off",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    },
                    arrows: {
                        style: "uranus",
                        enable: true,
                        hide_onmobile: false,
                        hide_onleave: true,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0
                        }
                    }
                },
                visibilityLevels: [1240, 1024, 778, 480],
                responsiveLevels: [1200, 1040, 778, 480],
                gridheight: [850, 850, 850, 850],
                gridwidth: [1920, 1920, 1280, 800],
                lazyType: "none",
                shadow: 0,
                spinner: "spinner2",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        };

        // Check if jQuery and Revolution are ready
        const checkReady = setInterval(() => {
            const $ = (window as any).jQuery;
            if ($ && $.fn.revolution) {
                clearInterval(checkReady);
                initSlider();
            }
        }, 100);

        return () => clearInterval(checkReady);
    }, []);

    return (
        <section className="main-slider">
            <div className="slider_wave"></div>
            <div
                className="rev_slider_wrapper fullwidthbanner-container"
                id="rev_slider_one_wrapper"
                data-source="gallery"
                dangerouslySetInnerHTML={{
                    __html: `
            <div class="rev_slider fullwidthabanner" id="rev_slider_one" data-version="5.4.1">
                <ul>
                    <li data-index="rs-4" data-transition="zoomout" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off"  data-easein="default" data-easeout="default" data-masterspeed="850"  data-thumb="/assets/images/main-slider/slide_1.jpg"  data-delay="5999"  data-rotate="0"  data-saveperformance="off"  data-title="Slide" data-param1="" data-param2="" data-param3="" data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9="" data-param10="" data-description="">
                    
                    <!-- MAIN IMAGE -->
                    <img src="/assets/images/main-slider/slide_1.jpg"  alt="" title="Home Cakes"  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
                    <!-- LAYERS -->

                    <!-- LAYER NR. 1 -->
                    <div class="tp-caption tp-shape tp-shapewrapper  tp-resizeme" 
                        id="slide-4-layer-44" 
                        data-x="center" data-hoffset="1" 
                        data-y="center" data-voffset="-3" 
                        data-width="['full','full','full','full']"
                        data-height="['full','full','full','full']"
                        data-type="shape" 
                        data-basealign="slide" 
                        data-responsive_offset="on" 
                        data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                        data-textAlign="['inherit','inherit','inherit','inherit']"
                        data-paddingtop="[0,0,0,0]"
                        data-paddingright="[0,0,0,0]"
                        data-paddingbottom="[0,0,0,0]"
                        data-paddingleft="[0,0,0,0]"
                        style="z-index: 5;background-color:rgba(80,81,92,0.15);"></div>

                    <!-- LAYER NR. 2 -->
                    <div class="tp-caption   tp-resizeme" 
                        id="slide-4-layer-40" 
                        data-x="center" data-hoffset="" 
                        data-y="center" data-voffset="" 
                        data-width="['none','none','none','none']"
                        data-height="['none','none','none','none']"
                        data-type="image" 
                        data-responsive_offset="on"
                        data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                        data-textAlign="['inherit','inherit','inherit','inherit']"
                        data-paddingtop="[0,0,0,0]"
                        data-paddingright="[0,0,0,0]"
                        data-paddingbottom="[0,0,0,0]"
                        data-paddingleft="[0,0,0,0]"
                        style="z-index: 6;"><img src="/assets/images/main-slider/slider_bg_1.png" alt="" data-ww="654px" data-hh="654px" width="654" height="654" data-no-retina> </div>

                    <!-- LAYER NR. 3 -->
                    <div class="tp-caption   tp-resizeme" 
                        id="slide-4-layer-33" 
                        data-x="center" data-hoffset="" 
                        data-y="center" data-voffset="100" 
                        data-width="['auto']"
                        data-height="['auto']"
                        data-visibility="['on','on','off','off']"
                        data-type="text" 
                        data-responsive_offset="on" 
                        data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"nothing"}]'
                        data-textAlign="['center','center','center','center']"
                        data-paddingtop="[0,0,0,0]"
                        data-paddingright="[0,0,0,0]"
                        data-paddingbottom="[0,0,0,0]"
                        data-paddingleft="[0,0,0,0]"
                        style="z-index: 7; white-space: nowrap; font-size: 16px; line-height: 24px; font-weight: 400; color: #4b4342;font-family:ABeeZee;">We offer now a great range of different<br>flavoured bite-size pastries and cakes </div>

                    <!-- LAYER NR. 4 -->
                    <div class="tp-caption   tp-resizeme" 
                        id="slide-4-layer-31" 
                        data-x="center" data-hoffset="" 
                        data-y="center" data-voffset="-18" 
                        data-width="['399']"
                        data-height="['auto']"
                        data-type="text" 
                        data-responsive_offset="on" 
                        data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"nothing"}]'
                        data-textAlign="['center','center','center','center']"
                        data-paddingtop="[0,0,0,0]"
                        data-paddingright="[0,0,0,0]"
                        data-paddingbottom="[0,0,0,0]"
                        data-paddingleft="[0,0,0,0]"
                        style="z-index: 8; min-width: 399px; max-width: 399px; white-space: normal; font-size: 72px; line-height: 72px; font-weight: 400; color: #4b4342;font-family:Leckerli One;">Welcome <br>to Slice of Cake </div>

                    <!-- LAYER NR. 5 -->
                    <div class="tp-caption   tp-resizeme" 
                        id="slide-4-layer-41" 
                        data-x="center" data-hoffset="" 
                        data-y="center" data-voffset="-150" 
                        data-width="['none','none','none','none']"
                        data-height="['none','none','none','none']"
                        data-type="image" 
                        data-responsive_offset="on" 
                        data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                        data-textAlign="['inherit','inherit','inherit','inherit']"
                        data-paddingtop="[0,0,0,0]"
                        data-paddingright="[0,0,0,0]"
                        data-paddingbottom="[0,0,0,0]"
                        data-paddingleft="[0,0,0,0]"
                        style="z-index: 9;"><img src="/assets/images/main-slider/slider_bg_4.png" alt="" data-ww="125px" data-hh="60px" width="125" height="60" data-no-retina> </div>

                    <!-- LAYER NR. 6 -->
                    <div class="tp-caption tp-resizeme hide-sm" 
                        id="slide-4-layer-42" 
                        data-x="398" 
                        data-y="center" data-voffset="" 
                        data-width="['none','none','none','none']"
                        data-height="['none','none','none','none']"
                        data-type="image" 
                        data-responsive_offset="on" 
                        data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                        data-textAlign="['inherit','inherit','inherit','inherit']"
                        data-paddingtop="[0,0,0,0]"
                        data-paddingright="[0,0,0,0]"
                        data-paddingbottom="[0,0,0,0]"
                        data-paddingleft="[0,0,0,0]"
                        style="z-index: 10;"><img src="/assets/images/main-slider/slider_bg_3.png" alt="" data-ww="196px" data-hh="107px" width="196" height="107" data-no-retina> </div>

                        <!-- LAYER NR. 7 -->
                        <div class="tp-caption tp-resizeme hide-sm" 
                            id="slide-4-layer-43" 
                            data-x="1325" 
                            data-y="center" data-voffset="" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 11;"><img src="/assets/images/main-slider/slider_bg_2.png" alt="" data-ww="196px" data-hh="107px" width="196" height="107" data-no-retina></div>
                    </li>

                    <!-- SLIDE  -->
                    <li data-index="rs-5" data-transition="zoomout" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off"  data-easein="default" data-easeout="default" data-masterspeed="850"  data-thumb="/assets/images/main-slider/slide_2.jpg"  data-delay="5999"  data-rotate="0"  data-saveperformance="off"  data-title="Slide" data-param1="" data-param2="" data-param3="" data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9="" data-param10="" data-description="">
                        <!-- MAIN IMAGE -->
                        <img src="/assets/images/main-slider/slide_2.jpg"  alt="" title="Home Cakes"  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
                        <!-- LAYERS -->

                        <!-- LAYER NR. 8 -->
                        <div class="tp-caption tp-shape tp-shapewrapper  tp-resizeme" 
                            id="slide-5-layer-44" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="" 
                            data-width="['full','full','full','full']"
                            data-height="['full','full','full','full']"
                            data-type="shape" 
                            data-basealign="slide" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 5;background-color:rgba(80,81,92,0.15);"> </div>

                        <!-- LAYER NR. 9 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-5-layer-40" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="-1" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 6;"><img src="/assets/images/main-slider/slider_bg_1.png" alt="" data-ww="654px" data-hh="654px" width="654" height="654" data-no-retina> </div>

                        <!-- LAYER NR. 10 -->
                        <div class="tp-caption tp-resizeme" 
                            id="slide-5-layer-33" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="99" 
                            data-width="['auto']"
                            data-height="['auto']"
                            data-visibility="['on','on','off','off']"
                            data-type="text" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"nothing"}]'
                            data-textAlign="['center','center','center','center']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 7; white-space: nowrap; font-size: 16px; line-height: 24px; font-weight: 400; color: #4b4342;font-family:ABeeZee;">We offer now a great range of different<br> flavoured bite-size pastries and cakes </div>

                        <!-- LAYER NR. 11 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-5-layer-31" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="-18" 
                            data-width="['441']"
                            data-height="['auto']"
                            data-type="text" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"nothing"}]'
                            data-textAlign="['center','center','center','center']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 8; min-width: 441px; max-width: 441px; white-space: normal; font-size: 72px; line-height: 72px; font-weight: 400; color: #4b4342; font-family:Leckerli One;">Welcome <br>to Slice of Cake </div>

                        <!-- LAYER NR. 12 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-5-layer-41" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="-150" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 9;"><img src="/assets/images/main-slider/slider_bg_4.png" alt="" data-ww="125px" data-hh="60px" width="125" height="60" data-no-retina> </div>

                        <!-- LAYER NR. 13 -->
                        <div class="tp-caption tp-resizeme hide-sm" 
                            id="slide-5-layer-42" 
                            data-x="398" 
                            data-y="center" data-voffset="" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 10;"><img src="/assets/images/main-slider/slider_bg_3.png" alt="" data-ww="196px" data-hh="107px" width="196" height="107" data-no-retina> </div>

                        <!-- LAYER NR. 14 -->
                        <div class="tp-caption tp-resizeme hide-sm" 
                            id="slide-5-layer-43" 
                            data-x="1325" 
                            data-y="center" data-voffset="" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 11;"><img src="/assets/images/main-slider/slider_bg_2.png" alt="" data-ww="196px" data-hh="107px" width="196" height="107" data-no-retina> </div>
                    </li>
                    <!-- SLIDE  -->
                    <li data-index="rs-6" data-transition="zoomout" data-slotamount="default" data-hideafterloop="0" data-hideslideonmobile="off"  data-easein="default" data-easeout="default" data-masterspeed="850"  data-thumb="/assets/images/main-slider/slide_3.jpg"  data-delay="5999"  data-rotate="0"  data-saveperformance="off"  data-title="Slide" data-param1="" data-param2="" data-param3="" data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9="" data-param10="" data-description="">
                        <!-- MAIN IMAGE -->
                        <img src="/assets/images/main-slider/slide_3.jpg"  alt="" title="Home Cakes"  data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
                        <!-- LAYERS -->

                        <!-- LAYER NR. 15 -->
                        <div class="tp-caption tp-shape tp-shapewrapper  tp-resizeme" 
                            id="slide-6-layer-44" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="" 
                            data-width="['full','full','full','full']"
                            data-height="['full','full','full','full']"
                            data-type="shape" 
                            data-basealign="slide" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 5;background-color:rgba(80,81,92,0.15);"> </div>

                        <!-- LAYER NR. 16 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-6-layer-40" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="-1" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 6;"><img src="/assets/images/main-slider/slider_bg_1.png" alt="" data-ww="654px" data-hh="654px" width="654" height="654" data-no-retina> </div>

                        <!-- LAYER NR. 17 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-6-layer-33" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="100" 
                            data-width="['auto']"
                            data-height="['auto']"
                            data-visibility="['on','on','off','off']"
                            data-type="text" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"nothing"}]'
                            data-textAlign="['center','center','center','center']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 7; white-space: nowrap; font-size: 16px; line-height: 24px; font-weight: 400; color: #4b4342; font-family:ABeeZee;">We offer now a great range of different<br> flavoured bite-size pastries and cakes </div>

                        <!-- LAYER NR. 18 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-6-layer-31" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="-18" 
                            data-width="['394']"
                            data-height="['auto']"
                            data-type="text" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power2.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"nothing"}]'
                            data-textAlign="['center','center','center','center']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 8; min-width: 394px; max-width: 394px; white-space: normal; font-size: 72px; line-height: 72px; font-weight: 400; color: #4b4342;font-family:Leckerli One;">Welcome <br>to Slice of Cake </div>

                        <!-- LAYER NR. 19 -->
                        <div class="tp-caption   tp-resizeme" 
                            id="slide-6-layer-41" 
                            data-x="center" data-hoffset="" 
                            data-y="center" data-voffset="-150" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 9;"><img src="/assets/images/main-slider/slider_bg_4.png" alt="" data-ww="125px" data-hh="60px" width="125" height="60" data-no-retina> </div>

                        <!-- LAYER NR. 20 -->
                        <div class="tp-caption tp-resizeme hide-sm" 
                            id="slide-6-layer-42" 
                            data-x="398" 
                            data-y="center" data-voffset="" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 10;"><img src="/assets/images/main-slider/slider_bg_3.png" alt="" data-ww="196px" data-hh="107px" width="196" height="107" data-no-retina> </div>

                        <!-- LAYER NR. 21 -->
                        <div class="tp-caption tp-resizeme hide-sm" 
                            id="slide-6-layer-43" 
                            data-x="1325" 
                            data-y="center" data-voffset="" 
                            data-width="['none','none','none','none']"
                            data-height="['none','none','none','none']"
                            data-type="image" 
                            data-responsive_offset="on" 
                            data-frames='[{"delay":500,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
                            data-textAlign="['inherit','inherit','inherit','inherit']"
                            data-paddingtop="[0,0,0,0]"
                            data-paddingright="[0,0,0,0]"
                            data-paddingbottom="[0,0,0,0]"
                            data-paddingleft="[0,0,0,0]"
                            style="z-index: 11;"><img src="/assets/images/main-slider/slider_bg_2.png" alt="" data-ww="196px" data-hh="107px" width="196" height="107" data-no-retina> </div>
                    </li>
                </ul>
            </div>
            `}}
            />
        </section>
    );
};
export default HeroSlider;
