import { render, screen } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import LoginPage from './LoginPage';

test('check log in redirects to map', async() => {
    render(<LoginPage />);
    const linkElement = await screen.findByText("Log In");
    expect(linkElement).toBeInTheDocument();
  });