import * as router from '@reach/router';
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { create, ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

import { Login } from '../Login';

import { AdminClubsActionsMock } from '../../../../store/admin/clubs/Mocks/AdminClubsActions.mock';
import { AuthActionsMock } from '../../../../store/auth/Mocks/AuthActions.mock';
import { NotificationsActionsMock } from '../../../../store/notification/Mocks/NotificationActions.mock';

let renderer: ReactTestRenderer;
let wrapper: ReactTestInstance;

(router as any).navigate = jest.fn();

const actions = {
  adminClubs: AdminClubsActionsMock,
  auth: {
    ...AuthActionsMock,
    login: jest.fn(() => ({
      auth: {
        errors: {},
        isAuthenticated: true,
        token: '',
        user: {
          email: 'string',
          firstName: 'string',
          lastName: 'string'
        }
      }
    }))
  },
  invitation: {
    get: jest.fn(() => ({
      invitation: {
        accepted: true,
        club: {
          backgroundImage: null,
          course: { id: 1, name: 'First Course', address: 'Asturias 110, DTO 206' },
          description: 'Best club ever',
          email: 'dummy@noone.com',
          id: 1,
          managements: [],
          members: [],
          membershipPrice: '29.99',
          name: 'PALO ALTO GOLF CLUB',
          processPayment: false,
          profileImage: null
        },
        code: 'string',
        email: 'string@stringdemo.com',
        event: 1,
        expired: false,
        id: 1,
        match: true,
        sent: 'false'
      }
    }))
  },
  notifications: NotificationsActionsMock
};
describe('Login Scene', () => {
  beforeAll(() => {
    renderer = create(<Login actions={actions} invitationId={'000000'} />);
    wrapper = renderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login actions={actions} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Navigate when user is Authenticate and have an invitation with event', done => {
    const loginButton = wrapper.findByProps({ id: 'login' });
    expect(loginButton).toBeDefined();
    wrapper.instance.onSubmit().then(() => {
      expect(actions.auth.login).toBeCalled();
      expect(actions.invitation.get).toBeCalled();
      expect(router.navigate).toBeCalled();
      done();
    });
  });

  it('Should display error notification if an error occurs', async () => {
    const errorInstance = (mount(
      <Login
        actions={{
          ...actions,
          auth: {
            ...actions.auth,
            login: jest.fn(() =>
              Promise.resolve({
                errors: { login: { msg: 'Err' } }
              })
            ) as jest.Mock
          }
        }}
      />
    ).instance() as unknown) as any;

    await errorInstance.onSubmit();
    // TODO: CHECK THAT NOTIFICATION HAS CALLED
  });
});
