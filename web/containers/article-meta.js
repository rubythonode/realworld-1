import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { format } from '../utils/date';
import gql from 'graphql-tag';
import { FollowButton } from './follow-button';
import { FavoriteButton } from './favorite-button';

export function ArticleMeta(props) {
  const article = useQuery(ArticleMetaQuery, {
    fetchPolicy: 'cache-only',
    variables: {
      slug: props.slug
    },
    skip: typeof props.slug !== 'string'
  });

  return (
    <div className="article-meta">
      <Link
        href="/[username]"
        as={`/${article.data?.article?.author?.profile?.username}`}
        shallow
      >
        <a>
          <img
            src={
              article.data?.article?.author?.profile?.imageUrl ??
              '/images/smiley-cyrus.jpg'
            }
          />
        </a>
      </Link>
      <div className="info">
        <Link
          href="/[username]"
          as={`/${article.data?.article?.author?.profile?.username}`}
          shallow
        >
          <a className="author">
            {article.data?.article?.author?.profile?.username}
          </a>
        </Link>
        <time dateTime={article.data?.article?.createdAt} className="date">
          {article.data?.article?.createdAt
            ? format(new Date(article.data?.article?.createdAt), 'MMMM Qo')
            : null}
        </time>
      </div>
      <FollowButton
        username={article.data?.article?.author?.profile?.username}
      />{' '}
      <FavoriteButton slug={article.data?.article?.slug} />
    </div>
  );
}

ArticleMeta.propTypes = {
  slug: PropTypes.string.isRequired
};

ArticleMeta.fragments = {
  article: gql`
    fragment ArticleMetaArticleFragment on Article {
      slug
      favoritesCount
      createdAt
      ...FavoriteButtonArticleFragment
      author {
        id
        followersCount
        viewerIsFollowing
        profile {
          imageUrl
          username
          ...FollowButtonProfileFragment
        }
      }
    }
    ${FollowButton.fragments.profile}
    ${FavoriteButton.fragments.article}
  `
};

const ArticleMetaQuery = gql`
  query ArticleMetaQuery($slug: String!) {
    article: articleBySlug(slug: $slug) {
      ...ArticleMetaArticleFragment
    }
  }
  ${ArticleMeta.fragments.article}
`;