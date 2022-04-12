import { Basket } from '@/internal/basket/entity'

export interface BasketRepository {
  save (basket: Basket): void
}
