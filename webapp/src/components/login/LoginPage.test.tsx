import { render, screen } from '@testing-library/react';
import "@inrupt/jest-jsdom-polyfills";
import LoginPage from './LoginPage';

test('check log in redirects to map', () => {
    render(<LoginPage />);
    const linkElement = screen.getByText("Log In");
    expect(linkElement).toBeInTheDocument();
  });