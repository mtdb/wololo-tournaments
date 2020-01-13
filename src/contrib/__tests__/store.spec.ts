import { bindActions } from '../store';
import { authApi } from '../../contrib/api';

jest.mock('../../contrib/api', () => {
  const json = new Promise(resolve => resolve({ key: 'authtoken' }));
  const loginResponse = new Promise(resolve => resolve({ json: () => json }));
  const loginCreate = () => () => new Promise(resolve => resolve(loginResponse));
  return { authApi: { loginCreate } };
});

const app = {
  setState: jest.fn(),
  state: {
    auth: {
      token: 'mock'
    }
  }
};

describe('contrib.store.bindStore', () => {
  it('Should call setState after execute login action', async () => {
    const actions = bindActions(app);
    expect(app.setState).not.toBeCalled();
    await actions.user.login('username', 'password');
    expect(app.setState).toBeCalled();
  });
});
