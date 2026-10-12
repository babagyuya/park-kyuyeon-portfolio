export const contact = {
  nameKo: "박규연",
  nameEn: "Park Kyuyeon",
  email: "rose3518@naver.com",
  instagram: "@gyuyuya",
} as const;

export const contactLinks: Array<{
  label: string;
  value: string;
  href: string | null;
}> = [
  { label: "EMAIL", value: contact.email, href: `mailto:${contact.email}` },
  { label: "INSTAGRAM", value: contact.instagram, href: "https://instagram.com/gyuyuya" },
  { label: "GITHUB", value: "UPDATE SOON", href: null },
  { label: "LINKEDIN", value: "UPDATE SOON", href: null },
];
