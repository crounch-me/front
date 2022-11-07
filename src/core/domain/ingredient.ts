import type { Product } from "./product"

export interface Ingredient {
  product: Product
  quantity: number
  unit?: string
}
