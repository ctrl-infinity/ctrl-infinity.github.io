import { motion } from 'motion/react';

const services = [
  {
    title: "Architecture Rescues",
    description: "When your app is unmaintainable, I untangle the mess, introduce strict boundaries, and migrate you to a clean architecture—without stopping product development."
  },
  {
    title: "Performance Audits",
    description: "Diagnosing and fixing slow load times, layout shifts, and heavy bundles in Next.js, React, and Astro applications."
  },
  {
    title: "Zero-to-One Builds",
    description: "Taking your validated idea and building the absolute minimum required to prove it, with a foundation that won't require a rewrite in 6 months."
  }
];

export function Services() {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-32 border-t border-black/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">How I Help</h2>
            <p className="text-gray-500 mt-4 max-w-[30ch]">Specialized engagements for software teams that need to move faster and break fewer things.</p>
          </div>
        </div>
        
        <div className="lg:col-span-8 flex flex-col gap-16 lg:pt-0 pt-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-medium tracking-tight text-foreground">{service.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-[50ch]">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
