import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders RxCP Admin link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/RxCP Admin/i);
  expect(linkElement).toBeInTheDocument();
});
