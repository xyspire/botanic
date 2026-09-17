'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ChevronDown, Menu, X, Sprout } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user scrolled down from very top
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
          // Scrolling down - hide
          setIsVisible(false);
          setIsDropdownOpen(false);
        } else if (lastScrollY - currentScrollY > 5) {
          // Scrolling up - show
          setIsVisible(true);
        }
      } else {
        // Near top - always show
        setIsVisible(true);
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const allPagesList = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Teams', href: '#team' },
    { name: 'Services', href: '#services' },
    { name: 'Service details', href: '#service-details' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Blog details', href: '#blog-details' },
    { name: 'Projects', href: '#projects' },
    { name: 'Project details', href: '#project-details' },
    { name: 'Shops', href: '#shop' },
    { name: 'Shop details', href: '#shop-details' },
    { name: 'Contact', href: '#contact' },
    { name: '404', href: '#404' },
  ];

  return (
    <>
      <motion.header
        id="main-navbar"
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="nav-brand-logo"
            href="#"
            className="flex items-center gap-2.5 text-white group cursor-pointer"
          >
            <div className="flex items-center justify-center text-emerald-400 group-hover:rotate-12 transition-transform duration-300">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-josefin text-2xl font-bold tracking-tight text-white">
              Botanic
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav-links"
            className="hidden md:flex items-center gap-8 text-sm font-mulish font-medium text-white/90"
          >
            <a
              id="nav-link-home"
              href="#hero"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <a
              id="nav-link-about"
              href="#about"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              id="nav-link-contact"
              href="#contact"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <a
              id="nav-link-services"
              href="#services"
              className="hover:text-white transition-colors duration-200"
            >
              Services
            </a>

            {/* All Pages Dropdown */}
            <div className="relative">
              <button
                id="nav-dropdown-allpages"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer py-2"
              >
                <span>All Pages</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-52 py-2 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {allPagesList.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-mulish text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {page.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              id="nav-phone-cta"
              href="tel:+12125550184"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-mulish transition-all duration-200 backdrop-blur-sm"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <span>+44 7717645851</span>
            </a>

            <a
              id="nav-book-now-cta"
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-[#2a452a] hover:bg-[#345834] text-white text-xs font-mulish font-medium border border-white/10 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Book now
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="w-10 h-10 rounded-lg bg-[#eae8d8] text-black flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Fullscreen Overlay Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-white">
                <Sprout className="w-6 h-6 text-emerald-400 stroke-[2.2]" />
                <span className="font-josefin text-2xl font-bold tracking-tight text-white">
                  Botanic
                </span>
              </div>

              <button
                id="mobile-menu-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="w-10 h-10 rounded-lg bg-[#eae8d8] text-black flex items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <X className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* Menu Items List */}
            <div className="py-6 flex flex-col space-y-3.5">
              {allPagesList.map((item, idx) => (
                <motion.a
                  key={item.name}
                  id={`mobile-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.25 }}
                  className={`text-lg font-mulish tracking-wide transition-colors ${
                    item.name === '404'
                      ? 'font-bold text-white pt-2'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions & Footer Info */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <a
                href="tel:+12125550184"
                className="flex items-center justify-center gap-2.5 py-3 rounded-full bg-white/10 text-white text-sm font-mulish border border-white/10"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+44 7717645851</span>
              </a>

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-[#eae8d8] text-black font-josefin font-semibold text-center text-sm shadow-md active:scale-[0.98] transition-transform"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
