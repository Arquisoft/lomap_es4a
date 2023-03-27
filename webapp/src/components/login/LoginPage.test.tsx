import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('check log in redirects to map', () => {
    render(<LoginPage />);
    //const linkElement = screen.getByText("Log In");
    //expect(linkElement).toBeInTheDocument();
  });