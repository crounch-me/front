import { ProductInSelectedList } from '@/models/product';

export interface SetArchivationDatePayload {
  listID: string
  archivationDate: string
}

export interface SetBuyedProductActionPayload {
  product: ProductInSelectedList
  buyed: boolean
}
