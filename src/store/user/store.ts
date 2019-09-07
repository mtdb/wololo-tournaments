export const userStore = {
  background_color: '',
  date_joined: '',
  email: '',
  gold: 0,
  icon: undefined,
  is_active: false,
  last_login: '',
  username: ''
};

export const authStore = {
  token: localStorage.getItem('token') || ''
};

export interface IAuthStore {
  token: string;
}

export interface IUserStore {
  background_color: string;
  date_joined: string;
  email: string;
  gold: number;
  icon?: string;
  is_active: boolean;
  last_login: string;
  username: string;
}
