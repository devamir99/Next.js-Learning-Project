export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    shop: string;
    blog: string;
    about: string;
    contact: string;
    cart: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    comingSoon: string;
  };
  theme: {
    light: string;
    dark: string;
    toggle: string;
  };
  locale: {
    switch: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    rights: string;
  };
  shop: {
    subtitle: string;
    categoriesTitle: string;
    productsTitle: string;
    inStock: string;
    outOfStock: string;
  };
  blog: {
    subtitle: string;
    categoriesTitle: string;
    latestPosts: string;
    minRead: string;
  };
  common: {
    products: string;
    viewAll: string;
  };
};
