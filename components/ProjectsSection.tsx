'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import Image from 'next/image';
import { Sprout, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 'outdoor-living-spaces',
    title: 'Creating inviting outdoor living spaces',
    description:
      'Designed a functional outdoor retreat featuring lush planting beds, ambient lighting, and comfortable gathering spaces',
    image:
      '/projects1.png',
    alt: 'Lush green privacy hedge and modern lawn architecture',
  },
  {
    id: 'backyard-transformation',
    title: 'The peaceful backyard garden transformation',
    description:
      'Transformed a plain backyard into a peaceful garden with native plants, stone pathways, and cozy outdoor living spaces',
    image:
      '/projects2.png',
    alt: 'Homeowner tending clean modern backyard lawn and patio',
  },
  {
    id: 'modern-stone-courtyard',
    title: 'Modern stone courtyard & natural greenery',
    description:
      'Crafted geometric stonework combined with architectural grasses and curated foliage for an elegant contemporary outdoor setting',
    image:
      '/projects3.png',
    alt: 'Curated outdoor park estate with manicured trees and landscape',
  },
];

const REPEAT_SETS = 6;
const extendedProjects = Array.from({ length: REPEAT_SETS }).flatMap((_, setIndex) =>
  projectsData.map((project, index) => ({
    ...project,
    uniqueKey: `${project.id}-set-${setIndex}-${index}`,
  }))
);

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [oneSetWidth, setOneSetWidth] = useState(0);
  const [cardStep, setCardStep] = useState(564);
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
        const setWidth = step * projectsData.length;

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
        const speed = 30; // gentle pixels per second drift
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
      id="projects"
      className="w-full bg-[#1a1a17] text-white pt-20 sm:pt-28 pb-20 sm:pb-28 relative overflow-hidden z-20 select-none"
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
        {/* Badge: OUR PROJECTS */}
        <div className="flex items-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white text-xs font-mulish font-semibold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-[#9ae600] stroke-[2.4]" />
            <span>OUR PROJECTS</span>
          </div>
        </div>

        {/* Title & Navigation Arrow Controls in Header on Desktop */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <h2 className="font-mulish text-3xl sm:text-5xl md:text-[56px] font-normal leading-[1.12] text-white tracking-tight max-w-2xl">
            Crafted with care <br />
            and purpose
          </h2>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="prev-project-card-desktop"
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#272922] hover:bg-[#35382e] border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>
            <button
              id="next-project-card-desktop"
              onClick={handleNext}
              aria-label="Next project"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#272922] hover:bg-[#35382e] border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Cards Carousel Container */}
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
        className={`w-full relative z-10 overflow-hidden select-none pl-4 sm:pl-6 lg:pl-8 touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 sm:gap-6 w-max py-2 will-change-transform"
        >
          {extendedProjects.map((project, index) => (
            <div
              key={project.uniqueKey}
              ref={index === 0 ? firstCardRef : undefined}
              className="w-[320px] sm:w-[580px] md:w-[680px] lg:w-[740px] bg-[#272922] rounded-[30px] sm:rounded-[36px] p-5 sm:p-6 lg:p-7 flex flex-col md:flex-row gap-6 sm:gap-7 lg:gap-8 shrink-0 shadow-xl border border-white/5 transition-all duration-300"
            >
              {/* Left/Top: Image */}
              <div className="w-full md:w-[300px] lg:w-[330px] aspect-[4/3] md:aspect-auto md:h-full min-h-[240px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[380px] relative rounded-[22px] sm:rounded-[26px] overflow-hidden shrink-0 bg-neutral-900 pointer-events-none">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 300px, 330px"
                  draggable={false}
                />
              </div>

              {/* Right/Bottom: Content Details & View Details Button */}
              <div className="flex flex-col justify-between flex-1 py-1 sm:py-2 md:py-3 pr-1 sm:pr-2">
                <div>
                  <h3 className="font-mulish text-2xl sm:text-[26px] lg:text-[28px] font-normal text-white mb-3 sm:mb-4 tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-mulish text-xs sm:text-[14px] md:text-[14.5px] text-neutral-300/80 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8">
                  <button
                    id={`view-details-${project.uniqueKey}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#353730] hover:bg-[#43463e] text-white text-xs sm:text-sm font-mulish font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Arrow Controls (Below Cards on Mobile) */}
      <div className="sm:hidden px-4 mt-8 flex items-center gap-3">
        <button
          id="prev-project-card-mobile"
          onClick={handlePrev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full bg-[#272922] hover:bg-[#35382e] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </button>
        <button
          id="next-project-card-mobile"
          onClick={handleNext}
          aria-label="Next project"
          className="w-11 h-11 rounded-full bg-[#272922] hover:bg-[#35382e] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}
