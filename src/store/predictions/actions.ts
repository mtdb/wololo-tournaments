import api from '../../contrib/api';
import { IActionGroup, IStore } from '../index';
import { IPrediction } from './store';

const actions: IActionGroup = {
  post: async (_state: IStore, data: any) => {
    const prediction: IPrediction = await (await api.predictionsCreate(data)()).json();
    return prediction;
  }
};

export default actions;
