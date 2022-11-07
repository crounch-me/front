import type { Recipe } from "@/core/domain/recipe"

export interface Product {
  code: string
  label: string
  recipe?: Recipe
}
