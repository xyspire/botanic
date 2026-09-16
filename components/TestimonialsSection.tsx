'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the 3 cards spring animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'center center'],
  });

  // Spring physics setup
  const springConfig = { stiffness: 85, damping: 22, restDelta: 0.001 };

  // Left card comes out from middle towards the left (starts with offset to the right, moves to 0)
  const rawLeftX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const leftX = useSpring(rawLeftX, springConfig);

  // Right card comes out from middle towards the right (starts with offset to the left, moves to 0)
  const rawRightX = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const rightX = useSpring(rawRightX, springConfig);

  return (
    <section
      id="testimonials"
      className="w-full bg-[#f4f3ea] text-neutral-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 border-t border-[#dedccf] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Centered Badge: CLIENTS TESTIMONIALS */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300/90 bg-white/40 backdrop-blur-sm text-neutral-800 text-xs font-mulish font-semibold uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-800 stroke-[2.2]" />
            <span>CLIENTS TESTIMONIALS</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-4xl mx-auto text-center mb-14 sm:mb-20">
          <h2 className="font-mulish text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.14] text-neutral-900 tracking-tight">
            Landscapes that <br className="hidden sm:inline" />
            leave impressions
          </h2>
        </div>

        {/* 3-Card Interactive Testimonials Container */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch max-w-5xl mx-auto relative"
        >
          {/* CARD 1 (Left): Lowest z-index (z-10), comes out from middle to left */}
          <motion.div
            style={{ x: leftX }}
            className="relative z-10 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-md aspect-[4/4.5] sm:aspect-[4/4.5] lg:aspect-auto min-h-[420px] lg:min-h-[460px] bg-neutral-900 group"
          >
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
              alt="Portrait of satisfied client in natural sunlight"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* CARD 2 (Middle): Medium z-index (z-20), static anchor center card */}
          <div className="relative z-20 bg-[#eae7db] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 shadow-md flex flex-col justify-between min-h-[420px] lg:min-h-[460px] border border-neutral-300/40">
            {/* Top Review Quote */}
            <p className="font-mulish text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
              &ldquo;Botanic completely transformed our backyard into a peaceful retreat. The team was attentive, and every detail exceeded our expectations. We couldn&rsquo;t be happier with the beautiful results and outstanding service.&rdquo;
            </p>

            {/* Bottom Author Row with photo on the right */}
            <div className="flex items-end justify-between pt-6 border-t border-neutral-300/30">
              <div>
                <h4 className="font-mulish font-bold text-neutral-900 text-base">
                  Emma Richardson
                </h4>
                <p className="font-mulish text-xs sm:text-sm text-neutral-500">
                  Homeowner, Portland
                </p>
              </div>

              {/* Author Photo */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden relative border border-white/80 shrink-0 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Emma Richardson"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="60px"
                />
              </div>
            </div>
          </div>

          {/* CARD 3 (Right): Highest z-index (z-30), comes out from middle to right */}
          <motion.div
            style={{ x: rightX }}
            className="relative z-30 bg-[#2b2e24] text-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 shadow-lg flex flex-col justify-between min-h-[420px] lg:min-h-[460px] overflow-hidden"
          >
            {/* Background Leaf Silhouette Graphic in Right Card */}
            <div className="absolute right-2 bottom-6 opacity-15 pointer-events-none select-none">
              <svg
                className="w-48 h-48 text-white"
                viewBox="0 0 200 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M100 180 C100 100, 160 40, 190 20 C140 30, 80 80, 70 140" />
                <path d="M100 180 C80 120, 20 80, 10 70 C30 90, 70 140, 100 180" />
                <path d="M135 75 C160 85, 175 105, 170 120 C150 110, 130 95, 135 75" />
                <path d="M70 110 C50 100, 30 115, 35 130 C50 125, 65 115, 70 110" />
              </svg>
            </div>

            {/* Top Review Quote */}
            <p className="font-mulish text-neutral-300/90 text-sm sm:text-base leading-relaxed font-normal relative z-10">
              &ldquo;From the first consultation to the final installation, everything was handled with exceptional care. Our landscape looks stunning year-round, and we&rsquo;ve received countless compliments from friends, neighbors, and visiting family alike.&rdquo;
            </p>

            {/* Bottom Author Row with photo on the right */}
            <div className="flex items-end justify-between pt-6 border-t border-white/10 relative z-10">
              <div>
                <h4 className="font-mulish font-bold text-white text-base">
                  Olivia Walker
                </h4>
                <p className="font-mulish text-xs sm:text-sm text-neutral-400">
                  Homeowner, Portland
                </p>
              </div>

              {/* Author Photo */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden relative border border-white/20 shrink-0 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                  alt="Olivia Walker"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="60px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
