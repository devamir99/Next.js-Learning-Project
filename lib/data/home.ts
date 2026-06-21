import type { Locale } from "@/lib/i18n/config";
import homeQuickAccessData from "@/data/home-quick-access.json";
import homeSlidesData from "@/data/home-slides.json";
import homeStoriesData from "@/data/home-stories.json";
import { pickLocalized } from "./pick-localized";
import type {
  HomeSlide,
  HomeStory,
  LocalizedHomeSlide,
  LocalizedHomeStory,
  LocalizedQuickAccessItem,
  QuickAccessItem,
} from "./types";

const stories = homeStoriesData as HomeStory[];
const slides = homeSlidesData as HomeSlide[];
const quickAccessItems = homeQuickAccessData as QuickAccessItem[];

function withLocalePath(locale: Locale, href: string): string {
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function getHomeStories(locale: Locale): LocalizedHomeStory[] {
  return stories.map((story) => ({
    id: story.id,
    label: pickLocalized(story.label, locale),
    href: withLocalePath(locale, story.href),
    image: story.image,
    ringColor: story.ringColor,
  }));
}

export function getHomeSlides(locale: Locale): LocalizedHomeSlide[] {
  return slides.map((slide) => ({
    id: slide.id,
    title: pickLocalized(slide.title, locale),
    subtitle: pickLocalized(slide.subtitle, locale),
    cta: pickLocalized(slide.cta, locale),
    href: withLocalePath(locale, slide.href),
    image: slide.image,
    badge: slide.badge ? pickLocalized(slide.badge, locale) : undefined,
  }));
}

export function getQuickAccessItems(locale: Locale): LocalizedQuickAccessItem[] {
  return quickAccessItems.map((item) => ({
    id: item.id,
    label: pickLocalized(item.label, locale),
    href: withLocalePath(locale, item.href),
    icon: item.icon,
    bgColor: item.bgColor,
    iconColor: item.iconColor,
  }));
}
