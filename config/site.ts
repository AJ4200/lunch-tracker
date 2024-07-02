export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
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
      href: "/docs",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    linkedin: "https://twitter.com/getnextui",
  },
};
