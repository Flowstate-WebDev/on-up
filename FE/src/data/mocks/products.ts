export type Product = {
  id: string,
  title: string,
  slug: string,
  description: string,
  price: number,
  imageUrl: string,
  stock: number,
  professions: { profession: { name: string } }[],
  qualifications: { qualification: { code: string } }[],
}

export const products: Product[] = [
  {
    id: "1",
    title: "Obsługa magazynów",
    slug: "obslugamagazynow",
    description: "Zbiór zadań związanych z obsługą magazynu obejmuje kompleksowe działania związane z przyjmowaniem, składowaniem i wydawaniem towarów. Istotnym obszarem w zbiorze zadań jest bieżące aktualizowanie stanów magazynowych, obsługa zamówień takie jak kompletacja, pakowanie i przygotowanie towarów do wysyłki wraz z prowadzeniem dokumentacji wewnątrz magazynowej PZ, WZ, MM, RW, PW, a także wystawianie faktur. W zbiorze zadań uwzględniono zadania magazynu przyprodukcyjnego oraz dystrybucyjnego. Magazyn przyprodukcyjny różni się od typowego magazynu dystrybucyjnego, bo jego głównym zadaniem jest zapewnienie ciągłości procesu produkcji. Zadania magazynu przyprodukcyjnego obejmują przyjmowanie materiałów, półproduktów i komponentów niezbędnych do realizacji procesów produkcyjnych, a następnie ich odpowiednie składowanie w wyznaczonych strefach. Istotnym elementem pracy jest terminowe i dokładne wydawanie materiałów zgodnie z zapotrzebowaniem zgłaszanym przez produkcję. Magazyn przyprodukcyjny odpowiada także za ewidencjonowanie przepływu surowców i komponentów w systemie magazynowym, kontrolę stanów oraz zapewnienie właściwej rotacji (FIFO/LIFO). Do zadań należy również odbiór półproduktów i wyrobów z produkcji oraz ich przekazywanie do magazynu wyrobów gotowych lub do sprzedaży (zadania 1,2,3,7,8,9,10,12,15,16,18). Magazyn e-commerce ma trochę inne zadania. Kluczowe jest tu obsługa zwrotów od klientów oraz aktualizacja i wprowadzenie ponownie do stanów magazynowych (zadanie 4). Zadania z magazynu dystrybucyjnego obejmują kompletacje zamówienia (zadania 6,11,13,17,19) oraz prognozowanie sprzedaży (zadania 22,24,25). W książce są też zadnia ogólne obejmujące i przyjęcie towarów oraz ich sprzedaż (zadanie 14,20,21,22,24,26). Ważnym elementem w obsłudze magazynu jest także przeprowadzanie inwentaryzacji (zad.23).",
    price: 43.0,
    imageUrl: "ObslugaMagazynow.webp",
    stock: 10,
    professions: [
      {
        profession: {
          name: "Technik logistyk"
        }
      },
      {
        profession: {
          name: "Technik handlowiec"
        }
      }
    ],
    qualifications: [
      {
        qualification: {
          code: "SPL.01"
        }
      },
      {
        qualification: {
          code: "HAN.02"
        }
      }
    ],
  },
  {
    id: "2",
    title: "Eksploatacja środków transportu drogowego",
    slug: "eksploatacjasrodkow",
    description: "Ćwiczenia przygotowujące do egzaminu praktycznego w zakresie kwalifikacji zawodowej TDR.01 oraz pokrewnych SPL.03, SPL.04, SPL.05.",
    price: 42.00,
    imageUrl: "EksploatacjaSrodkow.webp",
    stock: 7,
    professions: [
      {
        profession: {
          name: "Technik eksploatacji portów i terminali"
        }
      },
      {
        profession: {
          name: "Technik logistyk"
        }
      }
    ],
    qualifications: [
      {
        qualification: {
          code: "TDR.01"
        }
      },
      {
        qualification: {
          code: "SPL.03"
        }
      },
      {
        qualification: {
          code: "SPL.04"
        }
      },
      {
        qualification: {
          code: "SPL.05"
        }
      }
    ],
  },
  {
    id: "3",
    title: "Organizacja transportu.",
    slug: "organizacjatransportu",
    description: "Zeszyt ćwiczeń przygotowujących do części praktycznej egzaminu potwierdzającego kwalifikacje w zawodzie.",
    price: 35.00,
    imageUrl: "OrganizacjaTransportu.webp",
    stock: 3,
    professions: [
      {
        profession: {
          name: "Technik logistyk"
        }
      },
      {
        profession: {
          name: "Technik eksploatacji portów i terminali"
        }
      }
    ],
    qualifications: [],
  },
  {
    id: "4",
    title: "Repetytorium +testy ze słownikiem zawodowym",
    slug: "repetytoriumtesty",
    description: "Publikacja przeznaczona do nauki i sprawdzenia wiedzy przygotowania do egzaminów zawodowych, do wykorzystania na lekcji lub samodzielnej nauki.",
    price: 44.00,
    imageUrl: "RepetytoriumTesty.webp",
    stock: 12,
    professions: [
      {
        profession: {
          name: "Technik eksploatacji portów i terminali"
        }
      },
      {
        profession: {
          name: "Technik logistyk"
        }
      }
    ],
    qualifications: [
      {
        qualification: {
          code: "SPL.03"
        }
      },
      {
        qualification: {
          code: "SPL.04"
        }
      },
      {
        qualification: {
          code: "SPL.05"
        }
      }
    ],
  },
]