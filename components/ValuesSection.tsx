'use client';

import { motion } from 'motion/react';
import { Sprout } from 'lucide-react';

export default function ValuesSection() {
  const values = [
    {
      id: 'expert-craftsmanship',
      title: 'Expert craftsmanship',
      description:
        'We deliver thoughtful landscapes with precision, care, and lasting quality',
      dots: 1,
      renderDots: () => (
        <div className="flex items-center gap-1.5 h-6">
          <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
        </div>
      ),
    },
    {
      id: 'botanic-balance',
      title: 'Botanic balance',
      description:
        'Every outdoor space is designed to feel balanced, beautiful, and inviting',
      dots: 2,
      renderDots: () => (
        <div className="flex items-center gap-1.5 h-6">
          <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
          <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
        </div>
      ),
    },
    {
      id: 'reliable-service',
      title: 'Reliable service',
      description:
        'Count on consistent support from the first consultation to ongoing care',
      dots: 3,
      renderDots: () => (
        <div className="flex flex-col gap-1 h-6 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
          </div>
          <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
        </div>
      ),
    },
    {
      id: 'sustainable-growth',
      title: 'Sustainable growth',
      description:
        'Eco-conscious solutions help your landscape flourish for years to come',
      dots: 4,
      renderDots: () => (
        <div className="flex flex-col gap-1 h-6 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
            <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-neutral-700 bg-transparent" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="values"
      className="w-full bg-[#f4f3ea] text-neutral-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 border-t border-[#dedccf]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Badge and Headline */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            {/* Top Badge: OUR VALUES */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300/90 bg-white/40 backdrop-blur-sm text-neutral-800 text-xs font-mulish font-semibold uppercase tracking-wider mb-6"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-800 stroke-[2.2]" />
              <span>OUR VALUES</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mulish text-3xl sm:text-4xl md:text-[42px] font-normal leading-[1.18] text-neutral-900 tracking-tight"
            >
              Driven by passion and precision, we create beautiful landscapes
            </motion.h2>
          </div>

          {/* Right Column: 2x2 Grid of Values Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {values.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[24px] sm:rounded-[28px] p-7 sm:p-8 shadow-sm border border-neutral-200/50 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-300"
              >
                {/* Top Geometric Ring Counter (1, 2, 3, 4 circular rings) */}
                <div className="mb-8">
                  {item.renderDots()}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-mulish text-lg sm:text-xl font-normal text-neutral-900 mb-2.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-mulish text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                    {item.description}
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
