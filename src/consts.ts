import { Github, Mail, Rss } from "lucide-astro";
import BlueskyIcon from "@/components/icons/BlueskyIcon";

import type {
  SiteConfiguration,
  NavigationLinks,
  SocialLinks,
} from "@/types.ts";

export const SITE: SiteConfiguration = {
  title: "AuthX",
  description: "personal site.",
  url: "https://sijanthapa.vercel.app",
  author: "authxth",
  locale: "en-US",
};

export const NAV_LINKS: NavigationLinks = {
  blog: {
    path: "/blog",
    label: "blog",
  },
  projects: {
    path: "/projects",
    label: "projects",
  },
  Images: {
    path: "/image",
    label: "Images",
  },
};

export const SOCIAL_LINKS: SocialLinks = {
  email: {
    label: "Email",
    url: "mailto:authxth@gmail.com",
    icon: Mail,
  },
  github: {
    label: "GitHub",
    url: "https://github.com/authxth",
    icon: Github,
  },
  rss: {
    label: "Rss",
    url: "/rss.xml",
    icon: Rss,
  },
};
