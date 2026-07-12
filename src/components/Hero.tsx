import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-8">
          Software Engineer · Builder
        </p>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-foreground">
          I take vague projects and ship them.
        </h1>
        
        <p className="text-lg text-gray-600 max-w-[50ch] mb-12 leading-relaxed">
          You have a prototype, or a product that's stuck. I find what's blocking it and ship the fix — building with React, Tailwind, and Astro.
        </p>
        
        <a 
          href="#contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-base text-white hover:bg-accent transition-colors duration-300"
        >
          Book a call
        </a>
      </motion.div>
    </section>
  );
}
