import type { Product } from "@/core/domain/product"

export interface Ingredient {
  product: Product
  quantity: number
  unit?: string
}
