export type SocialLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const contactLinks: SocialLink[] = [
  {
    label: "E-mail",
    href: "mailto:gbensi.dev@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/gustavobensi",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luiz-gustavo-bensi-b25911287/",
    external: true,
  },
];
