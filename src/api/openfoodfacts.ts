import axios from 'axios';
import { ProductApi, ProductResponse } from '@/models/product';

export function search(name: string): Promise<ProductApi[]> {
  return axios
    .get<ProductResponse>(`https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${name}&json=true`)
    .then(res => res.data.products);
}
