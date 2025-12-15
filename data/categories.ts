export type CategoryName = typeof categories[number]['name'];
export type CategoryText = typeof categories[number]['text'];

export const categories = [
  {
    name: "logistyk",
    text: "Technik logistyk"
  },
  {
    name: "eksploatacja",
    text: "Technik eksploatacji portów i terminali"
  },
  {
    name: "handlowiec",
    text: "Technik handlowiec (sprzedawca)"
  }
] as const