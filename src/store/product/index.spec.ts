import { product, ProductState } from '.';

describe('Module', () => {
  it('Should be namespaced.', () => {
    expect(product.namespaced).toBe(true);
  });

  it('Should initialize products to empty array.', () => {
    expect((product.state as ProductState)['products']).toEqual([]);
  });
});
