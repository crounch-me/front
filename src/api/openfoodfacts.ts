import axios from 'axios';
import { ProductApi } from '@/models/product';

export function search(name: string): Promise<ProductApi[]> {
  return axios
    .get(`https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${name}&json=true`)
    .then(res => res.data);
}
