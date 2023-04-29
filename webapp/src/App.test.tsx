import React from 'react';
import {act} from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import App from './App';

test('renders learn react link', async() => {
  await act(async () => { render(<App />); });
  const linkElement = screen.getByText("Log In");
  expect(linkElement).toBeInTheDocument()
});