import React from 'react';
import { SettingsForm } from './settings-form';
import { action } from '@storybook/addon-actions';

export default {
  title: 'SettingsForm',
  component: SettingsForm
};

const handleSubmit = action('onSubmit');

const initialValues = {
  username: '',
  input: {
    email: '',
    password: '',
    username: '',
    profile: {
      bio: '',
      imageUrl: ''
    }
  }
};

export const renders = () => (
  <SettingsForm initialValues={initialValues} onSubmit={handleSubmit} />
);
