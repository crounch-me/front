interface ProductCategory {
  id: string
  name: string
}

interface ProductSearchResponse {
  id: string,
  name: string
  category: ProductCategory
}

export { ProductSearchResponse }
