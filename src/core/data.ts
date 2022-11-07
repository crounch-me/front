import type { Product } from "@/core/domain/product"

export const farine: Product = {
  code: 'farine',
  label: 'Farine',
}

export const eau: Product = {
  code: 'eau',
  label: 'Eau',
}

export const huile_olive: Product = {
  code: 'huile_olive',
  label: "Huile d'olive",
}

export const pomme: Product = {
  code: 'pomme',
  label: 'Pomme',
}

export const pate_brisee: Product = {
  code: 'pate_brisee',
  label: 'Pâte brisée',
  recipe: {
    ingredients: [
      {
        product: farine,
        quantity: 250,
        unit: "g",
      },
      {
        product: eau,
        quantity: 6,
        unit: "cl",
      },
      {
        product: huile_olive,
        quantity: 8,
        unit: "cl",
      }
    ]
  },
}

export const compote: Product = {
  code: 'compote',
  label: 'Compote',
  recipe: {
    ingredients: [
      {
        product: pomme,
        quantity: 3
      }
    ]
  },
}

export const tarte_aux_pommes: Product = {
  code: 'tarte_aux_pommes',
  label: 'Tarte aux pommes',
  recipe: {
    ingredients: [
      {
        product: pate_brisee,
        quantity: 1
      },
      {
        product: compote,
        quantity: 1
      },
      {
        product: pomme,
        quantity: 2
      }
    ]
  }
}

export const all_products = [
  farine,
  eau,
  pomme,
  pate_brisee,
  huile_olive,
  compote,
  tarte_aux_pommes
]

export const edible_products = [
  compote,
  tarte_aux_pommes
]
