import { store } from '../store';

export const bindActions = (app: any) => {
  const actions: any = {};
  Object.keys(store.actions).forEach(scope => {
    actions[scope] = {};
    Object.keys((store as any).actions[scope]).forEach(action => {
      actions[scope][action] = async (...args: any[]) => {
        const result = await (store as any).actions[scope][action](app.state, ...args);
        const newState: any = {};
        app.setState((state: any) => {
          Object.keys(result).forEach(key => {
            newState[key] = !Array.isArray(result[key])
              ? { ...state[key], ...result[key] }
              : result[key];
          });
          return newState;
        });
        return newState;
      };
    });
  });
  return actions;
};
