export interface ProductResponse {
  products: ProductApi[];
}

export interface ProductApi {
  product_name: string;
  categories: string;
  code: string;
}

export interface Product {
  barCode: string;
  name: string;
  categories: string[];
}
