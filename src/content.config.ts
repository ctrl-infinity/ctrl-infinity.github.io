import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string().optional(),
    contribution: z.string().optional(),
    outcome: z.string().optional(),
    visual: z.enum(['review', 'workflow', 'orchestration', 'retrieval']).optional(),
    status: z.enum(['production', 'built', 'experiment']).optional(),
    role: z.string(),
    category: z.enum(['professional', 'side-project', 'open-source']),
    tags: z.array(z.string()),
    image: z.string().optional(),
    link: z.string().url().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    problem: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
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
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    link: z.string().refine((value) => value.startsWith('/') && !value.startsWith('//') || URL.canParse(value), 'Expected a site path or URL').optional(),
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
