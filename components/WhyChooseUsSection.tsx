'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Sprout, Check } from 'lucide-react';

export default function WhyChooseUsSection() {
  const points = [
    {
      id: 'expert-craftsmanship',
      title: 'Expert craftsmanship',
      description:
        'Skilled professionals delivering beautiful landscapes with lasting quality and precision',
    },
    {
      id: 'tailored-solutions',
      title: 'Tailored solutions',
      description:
        'Every outdoor space is thoughtfully designed to match your lifestyle and vision',
    },
    {
      id: 'quality-service',
      title: 'Quality service',
      description:
        'Skilled professionals delivering beautiful landscapes with lasting quality and precision',
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="w-full bg-[#1a1a17] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Badge, Headline & Feature Checklist */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Badge: WHY CHOOSE US */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white text-xs font-mulish font-semibold uppercase tracking-wider mb-6"
            >
              <Sprout className="w-3.5 h-3.5 text-[#9ae600] stroke-[2.4]" />
              <span>WHY CHOOSE US</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mulish text-3xl sm:text-5xl md:text-[54px] font-normal leading-[1.12] text-white tracking-tight mb-12 sm:mb-14"
            >
              Why homeowners <br className="hidden sm:inline" />
              choose Botanic
            </motion.h2>

            {/* Feature List with lime checkmarks and dotted horizontal dividers */}
            <div className="w-full flex flex-col">
              {points.map((point, index) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="w-full"
                >
                  <div className="py-5 sm:py-6 flex items-start gap-4">
                    {/* Lime Green Checkmark */}
                    <div className="mt-1 text-[#9ae600] shrink-0">
                      <Check className="w-5 h-5 stroke-[2.8]" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-mulish text-xl sm:text-[22px] font-normal text-white mb-2 tracking-tight">
                        {point.title}
                      </h3>
                      <p className="font-mulish text-xs sm:text-sm text-neutral-300/80 leading-relaxed font-normal max-w-lg">
                        {point.description}
                      </p>
                    </div>
                  </div>

                  {/* Dotted horizontal border divider */}
                  <div className="w-full border-b border-dashed border-white/15" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Mountain / Tea Plantation Landscape Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative w-full aspect-square max-w-[540px] mx-auto lg:max-w-none rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-900 shadow-2xl group"
          >
            <Image
              src="/whychooseus.png"
              alt="Lush green tea leaves with rolling sunlit mountain hills in background"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
