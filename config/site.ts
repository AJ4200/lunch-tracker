export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TM Lunch Tracker",
  description: "This is a tiny WebApp i built so that its easier to track lunch meals at my KFC job",
  navItems: [
    {
      label: "Submit Lunch",
      href: "/",
    },
    {
      label: "Access Submissions",
      href: "/submissions",
    },
  ],
  navMenuItems: [
    {
      label: "Submit Lunch",
      href: "/",
    },
    {
      label: "Access Submissions",
      href: "/submissions",
    },
  ],
  links: {
    github: "https://github.com/aj4200",
    linkedin: "https://twitter.com/getnextui",
  },
};
