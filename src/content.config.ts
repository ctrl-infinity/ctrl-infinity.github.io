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
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  })
});

const now = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/now" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'exploring', 'paused']),
    tags: z.array(z.string()),
    startDate: z.string().optional(),
    link: z.string().url().optional(),
    order: z.number().default(99),
  })
});

const playground = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/playground" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    type: z.enum(['interactive', 'demo', 'snippet', 'external']),
    link: z.string().url().optional(),
    component: z.string().optional(),
    order: z.number().default(99),
  })
});

export const collections = { work, now, playground };
