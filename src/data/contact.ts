export type SocialLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const whatsappLink =
  "https://wa.me/5519992381776?text=Olá,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar.";

export const contactLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    href: whatsappLink,
    external: true,
  },
  {
    label: "E-mail",
    href: "mailto:gbensi.dev@gmail.com",
  },
];
