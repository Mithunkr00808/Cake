'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const HeroSlider = () => {
    const slides = [
        {
            id: 1,
            bg: "/assets/images/main-slider/slide_1.jpg",
        },
        {
            id: 2,
            bg: "/assets/images/main-slider/slide_2.jpg",
        },
        {
            id: 3,
            bg: "/assets/images/main-slider/slide_3.jpg",
        }
    ];

    return (
        <section className="main-slider relative h-[850px] bg-gray-900 group hero-slider-section hero-perspective">
            <Swiper
                modules={[Autoplay, Navigation, EffectFade]}
                effect="fade"
                speed={1200}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative h-full w-full">
                        {/* Background Image - with subtle zoom effect */}
                        <div className="absolute inset-0 animate-hero-slow-zoom smooth-layer">
                            <Image
                                src={slide.bg}
                                alt="Slide Background"
                                fill
                                className="object-cover"
                                priority={slide.id === 1}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#50515c] opacity-20"></div>
                        </div>

                        {/* Content Layer */}
                        <div className="relative z-10 h-full w-full flex items-center justify-center">
                            
                            {/* Central Composition */}
                            <div className="relative flex flex-col items-center justify-center w-full max-w-[1240px] px-4">
                                
                                {/* Central Image (Logo/Badge) */}
                                <div className="absolute z-0 animate-hero-fade-in-up top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 smooth-layer">
                                    <Image 
                                        src="/assets/images/main-slider/slider_bg_1.png" 
                                        alt="Decoration" 
                                        width={654} 
                                        height={654}
                                        className="opacity-100 w-[280px] h-[280px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] object-contain"
                                    />
                                </div>

                                {/* Text: Welcome */}
                                <div className="relative z-20 text-center mb-4 md:mb-10 animate-hero-fade-in-down delay-200 smooth-layer">
                                    <h2 className="text-[#4b4342] leading-[1.1] font-bold drop-shadow-md text-shadow-bold font-leckerli text-[35px] md:text-[50px] lg:text-[60px]">
                                        Welcome <br />To <br />Slice of Cake
                                    </h2>
                                </div>

                                {/* Text: Layered in Love */}
                                <div className="relative z-20 text-center mt-16 md:mt-32 lg:mt-36 animate-hero-fade-in-up delay-500 smooth-layer">
                                    <p className="text-[#4b4342] font-normal tracking-wide font-abeezee text-[14px] md:text-[18px]">
                                        Layered in Love
                                    </p>
                                </div>

                                {/* Decorative Side Images (Hidden on Mobile) - Integrated into composition for better alignment */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block z-30 animate-hero-fade-in-left delay-700 smooth-layer">
                                    <Image 
                                        src="/assets/images/main-slider/slider_bg_3.png" 
                                        alt="Left Decoration" 
                                        width={196} 
                                        height={107} 
                                    />
                                </div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block z-30 animate-hero-fade-in-right delay-700 smooth-layer">
                                    <Image 
                                        src="/assets/images/main-slider/slider_bg_2.png" 
                                        alt="Right Decoration" 
                                        width={196} 
                                        height={107} 
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Custom Navigation Arrows */}
            <div className="swiper-button-prev-custom absolute left-4 top-1/2 z-50 cursor-pointer hidden md:flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full transition-all -translate-y-1/2 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100"><span className="fa fa-angle-left text-2xl"></span></div>
            <div className="swiper-button-next-custom absolute right-4 top-1/2 z-50 cursor-pointer hidden md:flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full transition-all -translate-y-1/2 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100"><span className="fa fa-angle-right text-2xl"></span></div>
            
            <div className="slider_wave"></div>
        </section>
    );
};

export default HeroSlider;
