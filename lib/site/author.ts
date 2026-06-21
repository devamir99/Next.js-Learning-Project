export const author = {
  name: "DevAmir",
  email: "devamir99@gmail.com",
  website: "https://devamir.com",
  linkedin: "https://www.linkedin.com/in/devamir",
  github: "https://github.com/devamirr",
  telegram: "https://t.me/devamir99",
  phone: "09205007494",
  phoneTel: "+989205007494",
  phoneDisplay: "+98 920 500 7494",
  location: {
    fa: "تهران، ایران",
    en: "Tehran, Iran",
  },
} as const;

export type AuthorLink = {
  id: "website" | "email" | "linkedin" | "github" | "telegram" | "phone";
  href: string;
  label: string;
  external?: boolean;
};

export function getAuthorLinks(labels: {
  website: string;
  email: string;
  linkedin: string;
  github: string;
  telegram: string;
  phone: string;
}): AuthorLink[] {
  return [
    { id: "website", href: author.website, label: labels.website, external: true },
    { id: "email", href: `mailto:${author.email}`, label: labels.email },
    { id: "linkedin", href: author.linkedin, label: labels.linkedin, external: true },
    { id: "github", href: author.github, label: labels.github, external: true },
    { id: "telegram", href: author.telegram, label: labels.telegram, external: true },
    { id: "phone", href: `tel:${author.phoneTel}`, label: labels.phone },
  ];
}
