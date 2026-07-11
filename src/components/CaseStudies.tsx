import { motion } from 'motion/react';

const caseStudies = [
  {
    client: "Fintech Startup",
    duration: "4 weeks",
    title: "Rewriting the transaction engine.",
    description: "Replaced an aging polling system with a real-time event-sourced architecture using Node.js and Postgres, cutting latency by 90% and enabling instant ledger updates.",
    tags: ["Node.js", "PostgreSQL", "Event Sourcing"],
  },
  {
    client: "E-Commerce Enterprise",
    duration: "3 months",
    title: "Un-blocking a headless migration.",
    description: "The team was stuck on Next.js App Router caching issues. I audited the architecture, fixed the cache invalidation strategy, and shipped the migration 2 weeks ahead of the new schedule.",
    tags: ["Next.js", "React", "Vercel"],
  }
];

export function CaseStudies() {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-32 border-t border-black/10" id="case-studies">
      <div className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Recent Rescues</h2>
        <p className="text-gray-500 mt-4 max-w-[50ch]">Deep dives into recent projects where I was brought in to fix architecture, scale systems, or unblock shipping.</p>
      </div>

      <div className="flex flex-col gap-24">
        {caseStudies.map((study, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 group"
          >
            <div className="lg:col-span-4 flex flex-col gap-2 pt-2">
              <p className="text-sm font-mono tracking-[0.2em] uppercase text-gray-500">{study.client}</p>
              <p className="text-sm text-gray-400">{study.duration}</p>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-500">
                {study.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-[60ch]">
                {study.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {study.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-black/5 text-xs text-foreground/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
