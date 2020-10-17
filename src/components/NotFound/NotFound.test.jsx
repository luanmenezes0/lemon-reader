import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('renders front page link ', () => {
    render(<NotFound />);
    const linkElement = screen.getByText(/Take me back to the front page!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
