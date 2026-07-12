import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    category: z.enum(['professional', 'side-project', 'open-source']),
    tags: z.array(z.string()),
    image: z.string().optional(),
    link: z.string().url().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  })
});

export const collections = { work };
