import { shallowComponent } from './utils/test';
import { createAuthModuleMock } from './store/auth/mockModule';
import App from './App.vue';
import { addUnauthorizedInterceptor } from './api/interceptors';

jest.mock('./api/interceptors');

describe('App', () => {
  it('Should render.', () => {
    expect(shallowComponent(App)).toMatchSnapshot();
  });

  it('Should add interceptor to api when created.', () => {
    const modules = {
      auth: createAuthModuleMock()
    };

    shallowComponent(App, { modules });

    expect(addUnauthorizedInterceptor as jest.Mock).toHaveBeenCalled();
  });
});
