import { ProductInSelectedList } from '@/models/product';

export interface SetArchivationDatePayload {
  listID: string
  archivationDate: string
}

export interface SetBoughtProductActionPayload {
  product: ProductInSelectedList
  bought: boolean
}
