import { search } from './openfoodfacts';

describe('OpenFoodFacts', () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn(() => Promise.resolve({
      json: () => 'response'
    }));
  });

  afterEach(() => {
    ((global as any).fetch as jest.Mock).mockRestore();
  });

  it('Should call openfoodfacts endpoint with name search parameters.', () => {
    const name = 'Saucisse';

    search(name);

    expect(fetch).toHaveBeenCalledWith(
      'https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=Saucisse&json=true'
    );
  });
});
