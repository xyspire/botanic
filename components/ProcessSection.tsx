'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      id: 'site-assessment',
      title: 'Site assessment',
      description:
        'We assess your property, understand your goals, and plan the best approach for your landscape',
      icon: () => (
        <svg
          className="w-7 h-7 text-neutral-800 stroke-[1.8]"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="7" width="14" height="15" rx="2" />
          <path d="M5 3 H19" />
          <path d="M23 7 V22" />
          <path d="M21 9 L23 7 L25 9" />
          <path d="M21 20 L23 22 L25 20" />
        </svg>
      ),
    },
    {
      id: 'landscape-design',
      title: 'Landscape design',
      description:
        'We create a custom design that blends natural beauty with practical outdoor living',
      icon: () => (
        <svg
          className="w-7 h-7 text-neutral-800 stroke-[1.8]"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 4 L24 9 L14 14 L4 9 Z" />
          <path d="M4 14 L14 19 L24 14" />
          <path d="M4 19 L14 24 L24 19" />
        </svg>
      ),
    },
    {
      id: 'expert-installation',
      title: 'Expert installation',
      description:
        'We build your landscape with quality craftsmanship, attention to detail, and lasting care',
      icon: () => (
        <svg
          className="w-7 h-7 text-neutral-800 stroke-[1.8]"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="10" width="8" height="8" rx="1.5" />
          <rect x="14" y="10" width="8" height="8" rx="1.5" />
          <rect x="4" y="19" width="8" height="6" rx="1.5" />
          <rect x="14" y="19" width="8" height="6" rx="1.5" />
          <path d="M14 4 L19 9" />
          <path d="M19 4 L14 9" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="process"
      className="w-full bg-[#eae8d8] text-neutral-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 border-t border-[#dedccf]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Centered Badge: WHO WE ARE */}
        <div className="flex justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300/90 bg-white/40 backdrop-blur-sm text-neutral-800 text-xs font-mulish font-semibold uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-800 stroke-[2.2]" />
            <span>WHO WE ARE</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <h2 className="font-mulish text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal leading-[1.18] text-neutral-900 tracking-tight">
            We turn your vision into a beautiful outdoor space through a clear and thoughtful process
          </h2>
        </div>

        {/* 5-Card Bento Grid */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* TOP ROW: 2 Image Cards (Left spans a little less than 2 cards, Right covers a little more than 1 card) */}
          <div className="process-images-layout gap-5 sm:gap-6">
            {/* Card 1 (Bigger Card): whoweare1 video */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-neutral-900 aspect-[4/3] sm:aspect-[16/11] md:aspect-auto md:h-[380px] lg:h-[420px] shadow-sm group"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              >
                <source src="/whoweare1.mp4" type="video/mp4" />
                <source src="/whoeweare1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Card 2 (Smaller Card): whoweare2 image */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-neutral-900 aspect-[4/3] sm:aspect-[16/11] md:aspect-auto md:h-[380px] lg:h-[420px] shadow-sm group"
            >
              <Image
                src="/whoweare2.png"
                alt="Landscape design and outdoor living"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 34vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* BOTTOM ROW: 3 Step Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="bg-[#eae7db] rounded-[24px] sm:rounded-[28px] p-7 sm:p-8 border border-dashed border-neutral-300/80 shadow-sm flex flex-col justify-between min-h-[220px] hover:border-neutral-400 transition-colors"
              >
                {/* Top Icon */}
                <div className="mb-8">
                  {step.icon()}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-mulish text-xl sm:text-[22px] font-normal text-neutral-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-mulish text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
