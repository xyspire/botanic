'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [inputError, setInputError] = useState('');

  // react-intersection-observer for scroll entrance trigger
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.15,
    triggerOnce: false,
  });

  // Framer Motion scroll hook for Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transform layers
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const leafY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const bottomContentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const bottomContentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setInputError('Please enter a valid email address');
      return;
    }
    setInputError('');
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100vh] lg:min-h-[105vh] flex flex-col justify-between items-center overflow-hidden bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Parallax Background Grass / Lawn Mowing Scene */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 w-full h-[125%] -top-[10%] left-0 pointer-events-none z-0 will-change-transform"
      >
        {/* Realistic Lawn Mowing Image + Atmospheric Depth */}
        <div className="relative w-full h-full">
          {/* High quality lawn texture & mowing scene background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop')`,
              backgroundPosition: 'center 40%',
            }}
          />

          {/* SVG Overlay reproducing the rich sunlight rays, stripes, and lawn worker silhouette depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />

          {/* Golden sun rays casting diagonal shadows as in the screenshot */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-950/20 to-yellow-500/10 mix-blend-overlay" />

          {/* Radial vignette spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/90" />
        </div>
      </motion.div>

      {/* Top spacing */}
      <div className="h-6 sm:h-12" />

      {/* Center Stage: Huge BOTANIC Title with 3D Leaf */}
      <div
        ref={inViewRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center my-auto"
      >
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 30 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block select-none"
        >
          {/* Main Display Typography */}
          <h1
            id="hero-main-title"
            className="font-electrolize tracking-tight sm:tracking-normal text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[15.5vw] font-normal leading-[0.85] text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          >
            BOTANIC
          </h1>

          {/* 3D Realistic Glossy Green Leaf perched on the right */}
          <motion.div
            style={{ y: leafY, rotate: leafRotate }}
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 0, rotate: -30 }
            }
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className="absolute -top-[10%] -right-[2%] sm:-top-[14%] sm:-right-[1%] md:-top-[18%] md:right-[0%] w-[18vw] sm:w-[15vw] md:w-[12vw] max-w-[170px] pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)] select-none"
          >
            <Image
              src="/leaf.png"
              alt="Botanic Leaf"
              width={512}
              height={462}
              priority
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Area: Subtitle + Email Subscription + View Services Button */}
      <motion.div
        style={{ y: bottomContentY, opacity: bottomContentOpacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-auto"
      >
        {/* Headline */}
        <h2
          id="hero-subtitle"
          className="font-mulish text-xl sm:text-2xl md:text-3xl font-light text-white tracking-normal max-w-2xl px-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-6 sm:mb-8"
        >
          Turn your backyard into something truly extraordinary
        </h2>

        {/* Input and Buttons Container */}
        <div className="w-full max-w-xl px-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          {/* Email input pill */}
          <form
            onSubmit={handleSubscribe}
            className="w-full sm:w-auto flex-1 relative flex items-center bg-white rounded-full p-1.5 shadow-2xl transition-shadow focus-within:ring-2 focus-within:ring-[#eae8d8]"
          >
            <input
              id="hero-email-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (inputError) setInputError('');
              }}
              placeholder="Enter email address"
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-neutral-800 placeholder-neutral-500 font-mulish text-sm sm:text-base bg-transparent rounded-full focus:outline-none"
              aria-label="Email Address for garden design inquiries"
            />

            {/* Circular submit button with #eae8d8 background */}
            <button
              id="hero-email-submit-btn"
              type="submit"
              disabled={isSubscribed}
              aria-label="Submit email address"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#eae8d8] hover:bg-[#dfdcc8] text-black flex items-center justify-center shrink-0 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-80"
            >
              {isSubscribed ? (
                <Check className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
              ) : (
                <ArrowRight className="w-5 h-5 text-black stroke-[2.2]" />
              )}
            </button>
          </form>

          {/* View Services Button with #eae8d8 background */}
          <a
            id="hero-view-services-btn"
            href="#services"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-[#eae8d8] hover:bg-[#dfdcc8] text-black font-mulish font-medium text-sm sm:text-base text-center shadow-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>View services</span>
          </a>
        </div>

        {/* Input Feedback / Message */}
        {inputError && (
          <p className="text-red-400 text-xs sm:text-sm font-mulish mt-2">
            {inputError}
          </p>
        )}
        {isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-300 text-xs sm:text-sm font-mulish mt-3 bg-black/60 px-4 py-1.5 rounded-full border border-emerald-500/30"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Thank you! We will be in touch shortly.</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
