import { motion } from 'motion/react';

export interface Project {
  title: string;
  role: string;
  image: string;
  tags: string[];
}

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-32 border-t border-black/10">
      <div className="mb-16 flex items-baseline justify-between">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Selected Work</h2>
        <a href="#all-projects" className="text-sm font-medium text-gray-500 hover:text-accent transition-colors">View All</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {projects.map((project, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col gap-6 cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                src={project.image} 
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-500">{project.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
