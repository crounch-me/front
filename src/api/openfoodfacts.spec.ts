import axios from 'axios';

import { search } from './openfoodfacts';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('OpenFoodFacts', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockClear();
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: {} }));
  });

  it('Should call openfoodfacts endpoint with name search parameters.', () => {
    const name = 'Saucisse';
    search(name);

    expect(axios.get).toHaveBeenCalledWith(
      'https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=Saucisse&json=true'
    );
  });
});
