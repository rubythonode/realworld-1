import React from 'react';
import { ArticlePreview } from './article-preview';
import { withRouter } from '../utils/storybook';
import { action } from '@storybook/addon-actions';

export default {
  title: 'ArticlePreview',
  component: ArticlePreview,
  decorators: [withRouter]
};

export const renders = () => (
  <ArticlePreview
    author={{ username: 'lifeiscontent', profile: {} }}
    title="Some cool title"
    description="web stuff"
    createdAt={new Date(2000, 2, 1).toISOString()}
    tags={[{ id: '1', name: 'programming' }]}
    slug="some-cool-title"
    onFavorite={action('onFavorite')}
    onUnfavorite={action('onUnfavorite')}
  />
);

renders.story = {
  parameters: {
    router: {
      pathname: '/'
    }
  }
};

export const canFavorite = () => (
  <ArticlePreview
    author={{
      username: 'lifeiscontent',
      profile: {}
    }}
    title="Some cool title"
    description="web stuff"
    createdAt={new Date(2000, 2, 1).toISOString()}
    tags={[{ id: '1', name: 'programming' }]}
    slug="some-cool-title"
    viewerDidFavorite
    canFavorite={{ value: true }}
    onFavorite={action('onFavorite')}
    onUnfavorite={action('onUnfavorite')}
  />
);

canFavorite.story = {
  parameters: {
    router: {
      pathname: '/'
    }
  }
};

export const canUnfavorite = () => (
  <ArticlePreview
    author={{
      username: 'lifeiscontent',
      profile: {}
    }}
    title="Some cool title"
    description="web stuff"
    createdAt={new Date(2000, 2, 1).toISOString()}
    tags={[{ id: '1', name: 'programming' }]}
    slug="some-cool-title"
    favoritesCount={1}
    canUnfavorite={{ value: true }}
    onFavorite={action('onFavorite')}
    onUnfavorite={action('onUnfavorite')}
  />
);

canUnfavorite.story = {
  parameters: {
    router: {
      pathname: '/'
    }
  }
};

export const withProfileImage = () => (
  <ArticlePreview
    author={{
      username: 'lifeiscontent',
      profile: {
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
    }}
    title="Some cool title"
    description="web stuff"
    createdAt={new Date(2000, 2, 1).toISOString()}
    tags={[{ id: '1', name: 'programming' }]}
    slug="some-cool-title"
    viewerDidFavorite
    onFavorite={action('onFavorite')}
    onUnfavorite={action('onUnfavorite')}
  />
);

withProfileImage.story = {
  parameters: {
    router: {
      pathname: '/'
    }
  }
};
