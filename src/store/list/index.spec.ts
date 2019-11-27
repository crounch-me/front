import { list, ListState } from '.';

describe('Module', () => {
  it('Should be namespaced.', () => {
    expect(list.namespaced).toBe(true);
  });

  it('Should initialize lists to empty array.', () => {
    expect((list.state as ListState)['lists']).toEqual([]);
  });
});
