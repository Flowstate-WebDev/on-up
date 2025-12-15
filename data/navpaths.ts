export type NavPathName = typeof navpaths[number]['name']
export type NavPathRedirect = typeof navpaths[number]['redirect']

export const navpaths = [
  {
    name: "Nauczyciel",
    redirect: "/nauczyciel",
    hasIcon: false
  },
  {
    name: "Konto",
    redirect: "/konto",
    hasIcon: true
  },
  {
    name: "Koszyk",
    redirect: "/koszyk",
    hasIcon: true
  }
] as const