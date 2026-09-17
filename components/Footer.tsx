'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sprout, ArrowUpRight, Facebook, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <footer className="w-full bg-[#141612] text-white pt-16 sm:pt-24 pb-0 px-4 sm:px-6 lg:px-8 relative z-20 border-t border-white/5 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Logo & Newsletter (Left) + 3 Navigation Columns (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 items-start">
          {/* Left Column (Brand + Newsletter) */}
          <div className="lg:col-span-6 flex flex-col items-start max-w-lg">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <Sprout className="w-7 h-7 text-[#9ae600] stroke-[2.4]" />
              <span className="font-mulish font-bold text-2xl sm:text-[28px] tracking-tight text-white">
                Botanic
              </span>
            </div>

            {/* Tagline */}
            <p className="font-mulish text-neutral-300/80 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-md font-normal">
              Creating beautiful outdoor spaces with expert craftsmanship, thoughtful design, and lasting care
            </p>

            {/* Newsletter Form */}
            <div className="w-full max-w-md">
              <label htmlFor="newsletter-email-input" className="block font-mulish text-xs sm:text-sm text-neutral-400 font-medium mb-2.5">
                Newsletter
              </label>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full bg-[#252822] text-white text-sm placeholder:text-neutral-500 rounded-full py-3.5 pl-5 pr-14 outline-none border border-white/10 focus:border-white/30 transition-all font-mulish"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
              {subscribed && (
                <p className="font-mulish text-xs text-[#9ae600] mt-2 font-medium">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Right Columns (3 Nav Columns with Dotted Borders) */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Column 1: Main pages */}
            <div className="lg:border-l lg:border-dashed lg:border-white/15 lg:pl-6">
              <h4 className="font-mulish text-xs sm:text-sm text-neutral-400 font-medium mb-4 sm:mb-5">
                Main pages
              </h4>
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[14px]">
                {['Home', 'About', 'Services', 'Service details', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white hover:text-[#9ae600] transition-colors font-normal"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: More pages */}
            <div className="border-l border-dashed border-white/15 pl-4 sm:pl-6">
              <h4 className="font-mulish text-xs sm:text-sm text-neutral-400 font-medium mb-4 sm:mb-5">
                More pages
              </h4>
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[14px]">
                {['Blogs', 'Blog details', 'Projects', 'Project details', 'Shops'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white hover:text-[#9ae600] transition-colors font-normal"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Utility pages */}
            <div className="border-l border-dashed border-white/15 pl-4 sm:pl-6">
              <h4 className="font-mulish text-xs sm:text-sm text-neutral-400 font-medium mb-4 sm:mb-5">
                Utility pages
              </h4>
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[14px]">
                {['Shop details', 'Teams', '404'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white hover:text-[#9ae600] transition-colors font-normal"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Dotted Horizontal Divider */}
        <div className="w-full border-t border-dashed border-white/15 my-6 sm:my-8" />

        {/* Social Icons & Copyright Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-2">
          {/* Social Circles */}
          <div className="flex items-center gap-2.5">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#9ae600] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <Facebook className="w-4 h-4 fill-black stroke-none" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#9ae600] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#9ae600] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <Linkedin className="w-4 h-4 fill-black stroke-none" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#9ae600] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <Youtube className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>

          {/* Copyright Line */}
          <p className="font-mulish text-xs sm:text-sm text-neutral-400 font-normal">
            Crafted by <a href="https://xyspire.co.uk" target="_blank" rel="noreferrer" className="hover:underline ">Xyspire</a>
          </p>
        </div>

        {/* Big Giant "BOTANIC" Wordmark with Realistic Green Leaf Overlay */}
        <div className="relative w-full pt-6 sm:pt-10 pb-0 flex justify-center items-center select-none">
          <svg
            className="w-full h-auto pointer-events-none select-none block"
            viewBox="0 0 1000 165"
            preserveAspectRatio="none"
          >
            <text
              x="0"
              y="135"
              fill="#292c24"
              fontSize="175"
              fontWeight="400"
              fontFamily="Electrolize, sans-serif"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
            >
              BOTANIC
            </text>
          </svg>

          {/* Realistic Green Leaf Graphic overlaying the letters of BOTANIC */}
          <div className="absolute right-[2%] sm:right-[3%] bottom-0 sm:bottom-2 w-20 sm:w-32 lg:w-44 pointer-events-none select-none drop-shadow-2xl">
            <Image
              src="/leaf.png"
              alt="Botanic Leaf"
              width={512}
              height={462}
              className="w-full h-auto object-contain -rotate-12"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
