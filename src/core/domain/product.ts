import type { Recipe } from "./recipe"

export interface Product {
  code: string
  label: string
  recipe?: Recipe
}
