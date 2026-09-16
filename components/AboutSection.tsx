'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Image from 'next/image';
import { Sprout, Star, Check, Plus } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  // Scroll animation for Bento Cards with spring physics
  const { scrollYProgress } = useScroll({
    target: bentoRef,
    offset: ['start 90%', 'center center'],
  });

  // Smooth scroll spring motion for the left card coming from the right
  const rawX = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const springConfig = { stiffness: 85, damping: 22, restDelta: 0.001 };
  const cardX = useSpring(rawX, springConfig);
  const cardScale = useSpring(rawScale, springConfig);

  // Client avatars data
  const avatarList = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  ];

  // Ticker items
  const tickerItems = [
    'Seasonal care',
    'Nature inspired',
    'Lasting beauty',
    'Quality service',
    'Sustainable design',
    'Expert craftsmanship',
  ];

  const fullTicker = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-[#f4f3ea] text-neutral-900 pt-20 sm:pt-28 pb-16 overflow-hidden relative z-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Badge: WHO WE ARE */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-300/90 bg-white/40 backdrop-blur-sm text-neutral-800 text-xs font-mulish font-semibold uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-800 stroke-[2.2]" />
            <span>WHO WE ARE</span>
          </div>
        </div>

        {/* Centered Main Paragraph / Statement */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mulish text-2xl sm:text-4xl md:text-[42px] lg:text-[46px] font-normal leading-[1.2] sm:leading-[1.18] text-neutral-900 tracking-tight">
            What begins as an empty lawn can become your favorite place to unwind. We design landscapes that grow with your home and the life you build around it
          </h2>
        </div>

        {/* Client Avatars Bubble Stack + Rating */}
        <div className="flex flex-col items-center justify-center mt-8 mb-14">
          {/* Overlapping Avatar circles */}
          <div className="flex items-center -space-x-3">
            {avatarList.map((src, index) => (
              <div
                key={index}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border-2 border-white overflow-hidden shadow-sm relative bg-neutral-200"
              >
                <Image
                  src={src}
                  alt="Client avatar"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="60px"
                />
              </div>
            ))}

            {/* Plus Button Bubble */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#9ae600] border-2 border-white flex items-center justify-center shadow-sm text-black cursor-pointer hover:scale-105 transition-transform z-10">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>

          {/* Rating Text */}
          <p className="text-xs sm:text-sm font-mulish text-neutral-600 mt-3 font-medium">
            Trusted by 500+ clients (4.9/5)
          </p>
        </div>

        {/* Bento Grid Cards Container (max-w-5xl) */}
        <div
          ref={bentoRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch max-w-5xl mx-auto"
        >
          {/* CARD 1 (Left): Grass Trimming with Lime Gloves - Scroll spring motion from right side */}
          <motion.div
            style={{
              x: cardX,
              scale: cardScale,
            }}
            className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-sm aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-auto min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] bg-neutral-900 group z-10"
          >
            {/* Pruning shears trimming lawn photograph */}
            <Image
              src="/aboutSection.png"
              alt="Gardener tending lush green lawn"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* RIGHT CARD (Unified compound card matching the left card's full height) */}
          <div className="bg-[#eae8d8] rounded-[28px] sm:rounded-[32px] pb-2.5 sm:pb-3 shadow-sm flex flex-col justify-between min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] z-20">
            {/* Top Nested White Card: Emma Richardson Testimonial */}
            <div className="bg-white rounded-t-[28px] sm:rounded-t-[32px] rounded-b-[22px] sm:rounded-b-[28px] p-6 sm:p-8 md:p-9 shadow-sm flex flex-col justify-between flex-1">
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3.5 sm:gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden relative border border-neutral-200 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Emma Richardson"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      sizes="60px"
                    />
                  </div>
                  <div>
                    <h3 className="font-mulish font-bold text-neutral-900 text-base sm:text-lg leading-tight">
                      Emma Richardson
                    </h3>
                    <p className="font-mulish text-xs sm:text-sm text-neutral-500">
                      Homeowner, Portland
                    </p>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-neutral-400 text-neutral-400 stroke-none"
                    />
                  ))}
                </div>

                {/* Review Quote */}
                <p className="font-mulish text-neutral-600 text-sm sm:text-base md:text-[16.5px] leading-relaxed font-normal">
                  &ldquo;They completely transformed our outdoor space while keeping the process simple and stress-free. The attention to detail, communication, and final result exceeded everything we imagined.&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Exposed Beige Section: 15+ Years Metric */}
            <div className="px-5 sm:px-7 py-5 sm:py-6 flex items-center gap-4 sm:gap-5">
              <span className="font-mulish text-4xl sm:text-5xl text-neutral-900 tracking-tight shrink-0 flex items-baseline">
                <CountUp
                  from={0}
                  to={15}
                  direction="up"
                  duration={2}
                  className="font-mulish font-bold inline-block"
                />
                <span className="font-mulish font-bold">+</span>
              </span>
              <span className="font-mulish text-xs sm:text-sm md:text-base font-medium text-neutral-700 leading-snug">
                Years of Landscape Craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Features Ticker Bar - Contained strictly to the Bento Grid Width (max-w-5xl) */}
        <div className="max-w-5xl mx-auto mt-16 sm:mt-20 pt-8 pb-4 border-t border-[#dedccf] overflow-hidden select-none">
          <div className="flex animate-ticker-infinite">
            {fullTicker.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 sm:px-8 shrink-0 text-sm sm:text-base font-mulish font-medium text-neutral-700"
              >
                <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
