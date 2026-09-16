'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import Image from 'next/image';
import { Sprout, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: () => React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 'lawn-care',
    title: 'Lawn care & mowing',
    description:
      'Professional mowing, edging, and soil treatments that keep your outdoor living area lush, resilient, and vibrant throughout every season of the year.',
    icon: () => (
      <svg
        className="w-10 h-10 text-white/90"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 32 C12 22, 18 16, 24 16 C30 16, 32 24, 34 32" />
        <path d="M14 32 C18 20, 24 12, 30 8 C34 14, 32 24, 30 32" />
        <path d="M4 34 H36" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'garden-design',
    title: 'Garden design solutions',
    description:
      'Bring your vision to life with custom garden layouts, carefully selected plants, and thoughtfully crafted landscapes that enhance your property’s beauty, functionality, character, and overall outdoor appeal.',
    icon: () => (
      <svg
        className="w-11 h-11 text-white/90"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 28 C10 14, 22 8, 30 8 C30 20, 20 28, 10 28 Z" />
        <path d="M10 28 C14 20, 22 14, 30 8" />
        <path d="M16 32 C16 26, 24 22, 28 22 C28 28, 22 32, 16 32 Z" />
      </svg>
    ),
  },
  {
    id: 'topiary-shaping',
    title: 'Topiary tree shaping',
    description:
      'Add elegance to your landscape with expertly sculpted trees and shrubs, creating distinctive shapes that enhance curb appeal while preserving plant health, beauty, structure, and balance year-round.',
    icon: () => (
      <svg
        className="w-10 h-10 text-white/90"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 8 L24 24 L28 32 L22 34 L18 26 L10 8 Z" />
        <path d="M30 8 L16 24 L12 32 L18 34 L22 26 L30 8 Z" />
        <circle cx="20" cy="22" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'landscape-maintenance',
    title: 'Landscape maintenance',
    description:
      'Enjoy a consistently beautiful outdoor space with routine weeding, debris removal, plant health monitoring, and seasonal care designed to keep your yard thriving effortlessly in any climate.',
    icon: () => (
      <svg
        className="w-10 h-10 text-white/90"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="8" y="10" width="18" height="22" rx="4" />
        <rect x="16" y="6" width="16" height="20" rx="4" />
      </svg>
    ),
  },
  {
    id: 'irrigation-systems',
    title: 'Irrigation & water systems',
    description:
      'Smart, water-efficient drip irrigation and sprinkler systems installed and calibrated to deliver ideal hydration for each plant bed and lawn zone without waste.',
    icon: () => (
      <svg
        className="w-10 h-10 text-white/90"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 C20 6, 10 18, 10 25 C10 30.5, 14.5 35, 20 35 C25.5 35, 30 30.5, 30 25 C30 18, 20 6, 20 6 Z" />
        <path d="M16 26 C16 28.5, 17.8 30.5, 20 30.5" />
      </svg>
    ),
  },
  {
    id: 'hardscaping-stonework',
    title: 'Hardscaping & stonework',
    description:
      'Custom stone pathways, retaining walls, patios, and outdoor living features designed with natural earth materials that blend seamlessly into surrounding greenery.',
    icon: () => (
      <svg
        className="w-10 h-10 text-white/90"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 20 L20 8 L32 20 L20 32 Z" />
        <path d="M14 26 L26 14" />
        <path d="M14 14 L26 26" />
      </svg>
    ),
  },
];

const REPEAT_SETS = 5;
const extendedServices = Array.from({ length: REPEAT_SETS }).flatMap((_, setIndex) =>
  servicesData.map((service, index) => ({
    ...service,
    uniqueKey: `${service.id}-set-${setIndex}-${index}`,
  }))
);

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [oneSetWidth, setOneSetWidth] = useState(0);
  const [cardStep, setCardStep] = useState(434);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const isInitializedRef = useRef(false);
  const isAnimatingBtnRef = useRef(false);
  const activeAnimationRef = useRef<{ stop: () => void } | null>(null);

  const dragRef = useRef<{
    startX: number;
    startPos: number;
    isDragging: boolean;
    hasMoved: boolean;
  }>({
    startX: 0,
    startPos: 0,
    isDragging: false,
    hasMoved: false,
  });

  // Calculate card width, gap, and single set width dynamically
  useEffect(() => {
    const updateMetrics = () => {
      if (firstCardRef.current && trackRef.current) {
        const cardRect = firstCardRef.current.getBoundingClientRect();
        const computed = window.getComputedStyle(trackRef.current);
        const gap = parseFloat(computed.gap) || 24;
        const step = cardRect.width + gap;
        const setWidth = step * servicesData.length;

        setCardStep(step);
        setOneSetWidth(setWidth);

        if (!isInitializedRef.current && setWidth > 0) {
          x.set(-2 * setWidth);
          isInitializedRef.current = true;
        }
      }
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [x]);

  // Gentle infinite auto-scroll when not hovering or dragging
  useEffect(() => {
    if (oneSetWidth <= 0) return;

    let animationId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isHovered && !isDragging && !isAnimatingBtnRef.current) {
        const speed = 32; // gentle pixels per second drift
        let currentX = x.get() - speed * deltaTime;

        if (currentX <= -3 * oneSetWidth) {
          currentX += oneSetWidth;
        }
        x.set(currentX);
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [oneSetWidth, isHovered, isDragging, x]);

  const handleNext = () => {
    if (oneSetWidth <= 0 || cardStep <= 0) return;
    activeAnimationRef.current?.stop();
    isAnimatingBtnRef.current = true;

    let currentX = x.get();
    let targetX = currentX - cardStep;

    if (targetX <= -3 * oneSetWidth) {
      currentX += oneSetWidth;
      x.set(currentX);
      targetX += oneSetWidth;
    }

    activeAnimationRef.current = animate(x, targetX, {
      duration: 0.55,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        isAnimatingBtnRef.current = false;
      },
    });
  };

  const handlePrev = () => {
    if (oneSetWidth <= 0 || cardStep <= 0) return;
    activeAnimationRef.current?.stop();
    isAnimatingBtnRef.current = true;

    let currentX = x.get();
    let targetX = currentX + cardStep;

    if (targetX >= -1 * oneSetWidth) {
      currentX -= oneSetWidth;
      x.set(currentX);
      targetX -= oneSetWidth;
    }

    activeAnimationRef.current = animate(x, targetX, {
      duration: 0.55,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        isAnimatingBtnRef.current = false;
      },
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    activeAnimationRef.current?.stop();
    isAnimatingBtnRef.current = false;
    setIsDragging(true);

    dragRef.current = {
      startX: e.clientX,
      startPos: x.get(),
      isDragging: true,
      hasMoved: false,
    };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    if (Math.abs(deltaX) > 5) {
      dragRef.current.hasMoved = true;
    }
    let newX = dragRef.current.startPos + deltaX;

    if (oneSetWidth > 0) {
      while (newX <= -3 * oneSetWidth) {
        newX += oneSetWidth;
        dragRef.current.startPos += oneSetWidth;
      }
      while (newX >= -1 * oneSetWidth) {
        newX -= oneSetWidth;
        dragRef.current.startPos -= oneSetWidth;
      }
    }

    x.set(newX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    let currentX = x.get();
    if (oneSetWidth > 0) {
      while (currentX <= -3 * oneSetWidth) {
        currentX += oneSetWidth;
      }
      while (currentX >= -1 * oneSetWidth) {
        currentX -= oneSetWidth;
      }
      x.set(currentX);
    }
  };

  return (
    <section
      id="services"
      className="w-full min-h-screen bg-[#1a1a17] text-white relative pt-20 sm:pt-28 pb-28 sm:pb-36 overflow-hidden flex flex-col justify-between z-20 select-none"
    >
      {/* Background Decorative Botanical Leaf Outline (Top-Right Watermark) */}
      <div className="absolute top-4 right-2 sm:right-8 opacity-10 pointer-events-none select-none z-0">
        <svg
          className="w-72 h-72 sm:w-96 sm:h-96 text-white"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M100 180 C100 100, 160 40, 190 20 C140 30, 80 80, 70 140" />
          <path d="M100 180 C80 120, 20 80, 10 70 C30 90, 70 140, 100 180" />
          <path d="M135 75 C160 85, 175 105, 170 120 C150 110, 130 95, 135 75" />
          <path d="M70 110 C50 100, 30 115, 35 130 C50 125, 65 115, 70 110" />
        </svg>
      </div>

      {/* Top Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Badge: OUR SERVICES */}
        <div className="flex items-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white text-xs font-mulish font-semibold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-[#9ae600] stroke-[2.4]" />
            <span>OUR SERVICES</span>
          </div>
        </div>

        {/* Title & View All Services Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <h2 className="font-mulish text-3xl sm:text-5xl md:text-[56px] font-normal leading-[1.12] text-white tracking-tight max-w-2xl">
            Bringing nature <br />
            closer to home
          </h2>

          <div>
            <button
              id="view-all-services-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#353730] hover:bg-[#43463e] text-white text-sm font-mulish font-medium transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <span>View all services</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Infinite Loop Carousel Cards Container */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClickCapture={(e) => {
          if (dragRef.current.hasMoved) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        className={`w-full relative z-10 overflow-hidden select-none pl-4 sm:pl-8 lg:pl-16 touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 sm:gap-6 w-max py-4 will-change-transform"
        >
          {extendedServices.map((service, index) => (
            <motion.div
              key={service.uniqueKey}
              ref={index === 0 ? firstCardRef : undefined}
              whileHover={isDragging ? undefined : { y: -6, transition: { duration: 0.25 } }}
              className="w-[320px] sm:w-[440px] md:w-[500px] lg:w-[540px] min-h-[290px] sm:min-h-[310px] md:min-h-[330px] bg-[#272922] hover:bg-[#2e3128] rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 lg:p-9 flex flex-col justify-between shrink-0 shadow-xl border border-white/5 transition-colors duration-300 relative group overflow-hidden"
            >
              {/* Top-Left Icon */}
              <div className="w-fit text-white/90">
                {service.icon()}
              </div>

              {/* Bottom Details */}
              <div className="mt-8 sm:mt-10">
                <h3 className="font-mulish text-2xl sm:text-[26px] md:text-[28px] font-normal text-white mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="font-mulish text-xs sm:text-sm md:text-[14px] text-neutral-300/80 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons (Left & Right Arrows) & Overlapping Rockery/Bush Garden Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative mt-8 sm:mt-10 flex items-center justify-between z-20">
        {/* Left / Right Arrow buttons */}
        <div className="flex items-center gap-3 z-30">
          <button
            id="prev-service-card"
            onClick={handlePrev}
            aria-label="Previous service"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#272922] hover:bg-[#35382e] border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            id="next-service-card"
            onClick={handleNext}
            aria-label="Next service"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#272922] hover:bg-[#35382e] border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Overlapping Plant/Rock/Grass Garden Cutout Foreground Image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] sm:w-[540px] md:w-[700px] lg:w-[840px] xl:w-[920px] pointer-events-none z-20 select-none">
        <div className="relative w-full h-[215px] sm:h-[300px] md:h-[390px] lg:h-[460px] xl:h-[500px]">
          <Image
            src="/grass.png"
            alt="Lush green botanical shrubs and rocks foreground accent"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
