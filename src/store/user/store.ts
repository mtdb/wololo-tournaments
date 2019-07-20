export const userStore = {
  email: '',
  id: 0,
  lastName: '',
  likes: 0,
  name: '',
}

export interface IUserStore {
  id: number;
  email: string;
  lastName: string;
  likes: number;
  name: string;
}
