'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      id="contact"
      className="w-full relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 lg:px-8 overflow-hidden z-20 flex items-center justify-center min-h-[460px] sm:min-h-[540px] md:min-h-[620px]"
    >
      {/* Background Image: Macro dewdrops on deep green foliage with shears */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop"
          alt="Raindrops on deep green leaves with pruning shears"
          fill
          className="object-cover object-center brightness-[0.45] contrast-[1.1]"
          priority
          referrerPolicy="no-referrer"
          sizes="100vw"
        />
        {/* Subtle Dark Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      </div>

      {/* Center Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge: GET STARTED */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dashed border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-mulish font-semibold uppercase tracking-wider mb-6 sm:mb-8"
        >
          <Sprout className="w-3.5 h-3.5 text-[#9ae600] stroke-[2.4]" />
          <span>GET STARTED</span>
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mulish text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.08] text-white tracking-tight max-w-3xl mb-8 sm:mb-10"
        >
          Let&rsquo;s create your dream landscape
        </motion.h2>

        {/* CTA Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            id="cta-contact-us-btn"
            className="inline-flex items-center justify-center px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#3d4233] hover:bg-[#4d5341] text-white text-sm sm:text-base font-mulish font-medium transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
          >
            Contact us today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
