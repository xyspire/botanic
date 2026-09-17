'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import { Sprout, ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the section to drive fluid sliding, opacity, and scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center 50%'],
  });

  const springConfig = { stiffness: 90, damping: 20, mass: 0.8 };

  // Left card: slides in from the left (x: -160 -> 0), scales from 0.88 -> 1, opacity from 0 -> 1
  const rawLeftX = useTransform(scrollYProgress, [0, 1], [-160, 0]);
  const leftX = useSpring(rawLeftX, springConfig);

  const rawLeftScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const leftScale = useSpring(rawLeftScale, springConfig);

  const rawLeftOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0.85, 1]);
  const leftOpacity = useSpring(rawLeftOpacity, springConfig);

  // Right card 1 (Top): slides in from the right (x: 160 -> 0), scales from 0.88 -> 1, opacity from 0 -> 1
  const rawRight1X = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const right1X = useSpring(rawRight1X, springConfig);

  const rawRight1Scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const right1Scale = useSpring(rawRight1Scale, springConfig);

  const rawRight1Opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0.85, 1]);
  const right1Opacity = useSpring(rawRight1Opacity, springConfig);

  // Right card 2 (Bottom): slides in from the right with a slight offset/delay (x: 190 -> 0)
  const rawRight2X = useTransform(scrollYProgress, [0.08, 1], [190, 0]);
  const right2X = useSpring(rawRight2X, springConfig);

  const rawRight2Scale = useTransform(scrollYProgress, [0.08, 1], [0.88, 1]);
  const right2Scale = useSpring(rawRight2Scale, springConfig);

  const rawRight2Opacity = useTransform(scrollYProgress, [0.08, 0.75, 1], [0, 0.85, 1]);
  const right2Opacity = useSpring(rawRight2Opacity, springConfig);

  return (
    <section
      id="blogs"
      ref={containerRef}
      className="w-full bg-[#f2f1ea] text-neutral-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 border-t border-[#dedccf] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Header Row: Badge & "View all blogs" Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-12">
          {/* Badge: WHO WE ARE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300/90 bg-white/40 backdrop-blur-sm text-neutral-800 text-xs font-mulish font-semibold uppercase tracking-wider w-fit">
            <Sprout className="w-3.5 h-3.5 text-emerald-800 stroke-[2.2]" />
            <span>WHO WE ARE</span>
          </div>

          {/* View all blogs Pill Button */}
          <button
            id="view-all-blogs-btn"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-mulish font-medium transition-all duration-200 w-fit cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
          >
            View all blogs
          </button>
        </div>

        {/* 3-Card Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT LARGE CARD: Slides in from left (x: -160 -> 0), scale: 0.88 -> 1, opacity: 0 -> 1 */}
          <motion.div
            style={{
              x: leftX,
              scale: leftScale,
              opacity: leftOpacity,
            }}
            className="lg:col-span-6 bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 shadow-sm border border-neutral-200/50 flex flex-col justify-between group hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Top Large Image */}
            <div className="w-full aspect-[16/11] sm:aspect-[16/10] relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-900 mb-6 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="Woman relaxing peacefully lying on dense green foliage"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Bottom Content & Meta */}
            <div className="px-2 sm:px-3 pb-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-mulish text-xs sm:text-[13px] text-neutral-500 mb-2 font-medium">
                  Emma Carter &bull; January 22, 2026
                </p>
                <h3 className="font-mulish text-xl sm:text-2xl lg:text-[26px] font-normal leading-snug text-neutral-900 tracking-tight">
                  How to create a beautiful and healthy garden That thrives throughout every season
                </h3>
              </div>

              {/* Arrow Indicator */}
              <div className="mt-6 flex items-center text-neutral-900 group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowRight className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 2 Horizontal / Stacked Cards sliding in from right */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Right Card 1 (Top): Slides in from right (x: 160 -> 0), scale: 0.88 -> 1, opacity: 0 -> 1 */}
            <motion.div
              style={{
                x: right1X,
                scale: right1Scale,
                opacity: right1Opacity,
              }}
              className="bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 shadow-sm border border-neutral-200/50 flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch group hover:shadow-md transition-shadow cursor-pointer flex-1"
            >
              {/* Thumbnail Image */}
              <div className="w-full sm:w-[200px] lg:w-[220px] aspect-[4/3] sm:aspect-square relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-900 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop"
                  alt="Lush green undulating mossy dunes in soft light"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 640px) 100vw, 220px"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-between flex-1 py-1 pr-2">
                <div>
                  <p className="font-mulish text-xs sm:text-[13px] text-neutral-500 mb-2 font-medium">
                    Daniel Harris &bull; February 21, 2026
                  </p>
                  <h4 className="font-mulish text-base sm:text-lg lg:text-[19px] font-normal leading-snug text-neutral-900 tracking-tight">
                    How to care for your garden and keep plants growing strong through every season
                  </h4>
                </div>

                <div className="mt-4 flex items-center text-neutral-900 group-hover:translate-x-1.5 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5 stroke-[2]" />
                </div>
              </div>
            </motion.div>

            {/* Right Card 2 (Bottom): Slides in from right (x: 190 -> 0), scale: 0.88 -> 1, opacity: 0 -> 1 */}
            <motion.div
              style={{
                x: right2X,
                scale: right2Scale,
                opacity: right2Opacity,
              }}
              className="bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 shadow-sm border border-neutral-200/50 flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch group hover:shadow-md transition-shadow cursor-pointer flex-1"
            >
              {/* Thumbnail Image */}
              <div className="w-full sm:w-[200px] lg:w-[220px] aspect-[4/3] sm:aspect-square relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-900 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop"
                  alt="Deep green rain-soaked botanical foliage"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 640px) 100vw, 220px"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-between flex-1 py-1 pr-2">
                <div>
                  <p className="font-mulish text-xs sm:text-[13px] text-neutral-500 mb-2 font-medium">
                    Sophia Mitchell &bull; March 12, 2026
                  </p>
                  <h4 className="font-mulish text-base sm:text-lg lg:text-[19px] font-normal leading-snug text-neutral-900 tracking-tight">
                    Simple gardening tips for growing healthy plants and creating Beautiful outdoor spaces all year
                  </h4>
                </div>

                <div className="mt-4 flex items-center text-neutral-900 group-hover:translate-x-1.5 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5 stroke-[2]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
