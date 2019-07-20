import { bindActions } from '../store';

const app = {
  setState: (updateState: any) => updateState(app.state),
  state: {
    user: {
      likes: 999
    }
  }
};

describe('contrib.store.bindStore', () => {
  it('Should update the App state for user likes from 999 to 1000', async () => {
    const actions = bindActions(app);
    actions.user.increment();

    expect(app.state.user.likes).toBe(1000);
  });
});
