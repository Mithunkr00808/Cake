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
        <section className="main-slider relative h-[850px] overflow-hidden bg-gray-900 group hero-slider-section">
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
                        <div className="absolute inset-0 animate-slow-zoom">
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
                                <div className="absolute z-0 animate-fade-in-up top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 smooth-layer">
                                    <Image 
                                        src="/assets/images/main-slider/slider_bg_1.png" 
                                        alt="Decoration" 
                                        width={654} 
                                        height={654}
                                        className="opacity-100 w-[280px] h-[280px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] object-contain"
                                    />
                                </div>

                                {/* Text: Welcome */}
                                <div className="relative z-20 text-center mb-4 md:mb-10 animate-fade-in-down delay-200">
                                    <h2 
                                        className="hero-title text-[#4b4342] leading-[1.1] font-normal drop-shadow-md"
                                        style={{ fontFamily: '"Leckerli One", cursive' }}
                                    >
                                        Welcome <br />To <br />Slice of Cake
                                    </h2>
                                </div>

                                {/* Text: Layered in Love */}
                                <div className="relative z-20 text-center mt-16 md:mt-32 lg:mt-36 animate-fade-in-up delay-500">
                                    <p 
                                        className="hero-subtitle text-[#4b4342] font-normal tracking-wide"
                                        style={{ fontFamily: '"ABeeZee", sans-serif' }}
                                    >
                                        Layered in Love
                                    </p>
                                </div>
                                {/* Decorative Side Images (Hidden on Mobile) - Integrated into composition for better alignment */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block z-30 animate-fade-in-left delay-700">
                                    <Image 
                                        src="/assets/images/main-slider/slider_bg_3.png" 
                                        alt="Left Decoration" 
                                        width={196} 
                                        height={107} 
                                    />
                                </div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block z-30 animate-fade-in-right delay-700">
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
            
            <style jsx global>{`
                /* Hero Section Specific Styles */
                .hero-slider-section .hero-title {
                    font-size: 35px !important;
                }
                @media (min-width: 768px) {
                    .hero-slider-section .hero-title {
                        font-size: 50px !important;
                    }
                }
                @media (min-width: 1024px) {
                    .hero-slider-section .hero-title {
                        font-size: 60px !important;
                    }
                }

                .hero-slider-section .hero-subtitle {
                    font-size: 14px !important;
                }
                @media (min-width: 768px) {
                    .hero-slider-section .hero-subtitle {
                        font-size: 18px !important;
                    }
                }

                /* Hardware Accelerated Smoothness */
                .hero-slider-section {
                    perspective: 1000px;
                    overflow: hidden; /* Ensure no scrollbars */
                }

                .smooth-layer,
                .animate-fade-in-up,
                .animate-fade-in-down,
                .animate-fade-in-left,
                .animate-fade-in-right,
                .animate-slow-zoom {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    -moz-backface-visibility: hidden;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    transform-style: preserve-3d;
                    will-change: transform, opacity;
                }

                @keyframes fade-in-up {
                    from { opacity: 0; transform: translate3d(0, 60px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translate3d(0, -60px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translate3d(-60px, 0, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translate3d(60px, 0, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes slow-zoom {
                    from { transform: scale(1.0) translateZ(0); }
                    to { transform: scale(1.08) translateZ(0); }
                }

                /* Ultra-smooth Easing (Custom Ease Out) */
                .animate-fade-in-up {
                    animation: fade-in-up 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                .animate-fade-in-left {
                    animation: fade-in-left 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                .animate-fade-in-right {
                    animation: fade-in-right 1.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                .animate-slow-zoom {
                    animation: slow-zoom 25s linear infinite;
                }

                .delay-200 { animation-delay: 0.3s; }
                .delay-500 { animation-delay: 0.6s; }
                .delay-700 { animation-delay: 0.8s; }
            `}</style>
        </section>
    );
};

export default HeroSlider;
