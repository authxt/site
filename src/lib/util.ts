import { SITE } from "@/consts";
import { type CollectionEntry, getCollection, getEntry } from "astro:content";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export async function parseAuthors(authors: string[]) {
  if (!authors || authors.length === 0) return [];

  const parseAuthor = async (slug: string) => {
    try {
      const author = await getEntry("authors", slug);
      return {
        slug,
        name: author?.data?.name || slug,
        avatar: author?.data?.avatar || "/static/logo.png",
        isRegistered: !!author,
      };
    } catch (error) {
      console.error(`Error fetching author with slug ${slug}:`, error);
      return {
        slug,
        name: slug,
        avatar: "/static/logo.png",
        isRegistered: false,
      };
    }
  };

  return await Promise.all(authors.map(parseAuthor));
}
