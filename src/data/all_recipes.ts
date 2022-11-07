import type { Recipe } from "../domain/recipe";

export const all_recipes: Recipe[] = [
  {
    name: 'Pâte brisée',
    ingredients: [
      {
        name: "Farine",
        quantity: 250,
        unit: "g",
      },
      {
        name: "Eau",
        quantity: 6,
        unit: "cl",
      },
      {
        name: "Huile d'olive",
        quantity: 8,
        unit: "cl",
      }
    ]
  }
]
