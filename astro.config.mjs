import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import expressiveCode from "astro-expressive-code";
import {
  pluginFrames,
  pluginTextMarkers,
  pluginShiki,
} from "astro-expressive-code";

import react from "@astrojs/react";

export default defineConfig({
  site: "http://sijanthapa.vercel.app",
  integrations: [tailwind(), sitemap(), expressiveCode(), mdx(), react()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypeKatex, rehypeHeadingIds],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
});
