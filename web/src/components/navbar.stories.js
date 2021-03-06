import React from 'react';
import { Navbar } from './navbar';
import { withRouter } from '../utils/storybook';

export default {
  title: 'Navbar',
  component: Navbar,
  decorators: [withRouter]
};

export const renders = () => <Navbar />;

export const loggedIn = () => <Navbar userUsername="lifeiscontent" />;

renders.story = {
  parameters: {
    router: {
      pathname: '/'
    }
  }
};
