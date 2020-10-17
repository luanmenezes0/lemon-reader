import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PostCard from './PostCard';
import { Router } from 'react-router-dom';

describe('<PostCard />', () => {
  test('renders post informations ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PostCard
          gilded={false}
          title="How to test reactjs"
          subreddit_name_prefixed="reactjs"
          score={87}
          over_18={false}
        />
      </Router>
    );
    const title = screen.getByText(/How to test reactjs/i);
    const badge = screen.queryByText(/nsfw/i);

    expect(title).toBeInTheDocument;
    expect(badge).toBeNull;
  });
});
