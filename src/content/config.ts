import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  })
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    duration: z.string().optional(),
    tags: z.array(z.string()),
    link: z.string().url().optional(),
    order: z.number().default(99),
  })
});

export const collections = {
  projects,
  'case-studies': caseStudies,
};
