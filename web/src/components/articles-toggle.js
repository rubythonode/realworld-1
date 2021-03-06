import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export function ArticlesToggle({ username }) {
  const router = useRouter();
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link href="/[username]" as={`/${username}`}>
            <a
              className={clsx('nav-link', {
                active: router.pathname === '/[username]'
              })}
            >
              My Articles
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/[username]/favorites" as={`/${username}/favorites`}>
            <a
              className={clsx('nav-link', {
                active: router.pathname === '/[username]/favorites'
              })}
            >
              Favorited Articles
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

ArticlesToggle.propTypes = {
  username: PropTypes.string.isRequired
};
