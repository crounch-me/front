import { Api } from '@/common/api/Api'
import { ProductSearchResponse } from './responses'
import { ProductCreateRequest, ProductSearchRequest } from './requests'

export class ProductApi extends Api {
  protected BASE_URL = 'products'

  public createProduct(name: string): Promise<void> {
    const url = ''
    const data: ProductCreateRequest = {
      name
    }

    return this.post(url, data)
  }

  public searchProduct(name: string): Promise<Array<ProductSearchResponse>> {
    const url = 'search'
    const data: ProductSearchRequest = {
      name
    }

    return this.post(url, data)
  }
}
