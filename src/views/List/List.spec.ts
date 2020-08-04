import { Wrapper } from '@vue/test-utils';

import { shallowComponent } from '@/utils/test';
import ListPage from './List.vue';
import { List } from '@/models/list';
import { readList, addProductToList } from '@/api/list';
import SearchProduct from '@/components/SearchProduct/SearchProduct.vue'
import { Events } from '@/utils/events';

jest.mock('@/api/list')

describe('List', () => {
  let wrapper: Wrapper<ListPage>;
  const listID = 'list ID'
  const productID = 'productID'
  const list: List = {
    id: listID,
    name: 'list name',
    products: [
      {
        id: 'product id',
        name: 'product name',
      }
    ]
  };

  beforeEach(() => {
    (readList as jest.Mock).mockResolvedValue(list);
    (addProductToList as jest.Mock).mockResolvedValue({})

    shallowListComponent();
  });

  it('Should render when list is found.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render when list is not found.', done => {
    (readList as jest.Mock).mockRejectedValue({ error: 'list-not-found-error' })

    shallowListComponent()

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot()
      done()
    })
  })

  it('Should fetch list when component is mounted.', () => {
    expect(readList).toHaveBeenCalledWith(listID);
  })

  it('Should add product to list when search product emits an addProductToList event.', () => {
    wrapper.find(SearchProduct).vm.$emit(Events.ADD_PRODUCT, { id: productID })

    expect(addProductToList).toHaveBeenCalledWith(productID, listID)
  })

  function shallowListComponent() {
    const values = {
      id: list.id,
    };

    wrapper = shallowComponent(ListPage, { values });
  }
});
