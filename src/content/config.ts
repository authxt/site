import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string(),
      publicationDate: z.coerce.date(),
      image: image()
        .refine((img) => img.width >= 1200, {
          message: "Image should be 1200px × 630px.",
        })
        .optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image()
        .refine((img) => img.width >= 1200, {
          message: "Image should be 1200px × 630px.",
        })
        .optional(),
      imageAlt: z.string().optional(),
      author: z.string().optional(),
      publicationDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      url: z.string(),
    }),
});

const authors = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().url(),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
});

const books = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    cover: z.string().optional(),
    genre: z.string(),
    status: z.enum(["reading", "read", "to-read"]),
    progress: z.number().min(0).max(100).optional(),
    review: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    favoriteQuote: z.string().optional(),
    dateStarted: z.date().optional(),
    dateFinished: z.date().optional(),
    goodreadsUrl: z.string().url().optional(),
  }),
});

export const collections = { blog, projects, authors, books };
