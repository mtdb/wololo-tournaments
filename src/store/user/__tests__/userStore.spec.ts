import actions from '../actions';
import { IUserStore, userStore } from '../store';
const state: { user: IUserStore } = {
  user: {
    ...userStore,
    likes: 999
  }
};

describe('actions.addresses.create', () => {
  it('should create a new address and return it', async () => {
    const payload = await actions.increment(state);

    expect(payload.user.likes).toBe(1000);
  });
});
