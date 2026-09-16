'use client';

import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ClientLogos from '@/components/ClientLogos';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import ValuesSection from '@/components/ValuesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import BlogSection from '@/components/BlogSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-black min-h-screen text-white font-mulish overflow-hidden">
        {/* Sticky / Auto-hiding Responsive Navbar */}
        <Navbar />

        {/* Hero Section with Parallax, Black BG, and Custom Typography */}
        <HeroSection />

        {/* Brand Logos Strip */}
        <ClientLogos />

        {/* "WHO WE ARE" & Editorial Landscape Section */}
        <AboutSection />

        {/* "OUR SERVICES" Full-Width Draggable / Scrollable Carousel Section */}
        <ServicesSection />

        {/* Process Bento Grid Section (5 Cards) */}
        <ProcessSection />

        {/* "OUR VALUES" 2x2 Grid Section */}
        <ValuesSection />

        {/* "OUR PROJECTS" Scrollable Projects Carousel Section */}
        <ProjectsSection />

        {/* "CLIENTS TESTIMONIALS" 3-Card Interactive Spring Animation Section */}
        <TestimonialsSection />

        {/* "WHY CHOOSE US" Checklist & Mountain Visual Section */}
        <WhyChooseUsSection />

        {/* "WHO WE ARE" / Blogs 3-Card Bento Section with Spring Animations */}
        <BlogSection />

        {/* CTA "Let's create your dream landscape" Section */}
        <CTASection />

        {/* Brand Footer Section */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
