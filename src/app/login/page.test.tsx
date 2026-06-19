import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loginUser, useAppDispatch } from '@/lib/store';


//Mocks

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockPush = jest.fn();
jest.mock(`next/navigation`, () => ({
  useRouter: () => ({push: mockPush})
}));

const mockDispatch = jest.fn();
jest.mock(`@/lib/store`, () => ({
  useAppDispatch: () => mockDispatch,
  loginUser: (payload: unknown) => ({type: 'auth/loginUser', payload})
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

//Helpers
const renderPage = () => render(<LoginPage />);

const fillAndSubmit = async (username: string, password: string) => {
  await userEvent.type(screen.getByRole('textbox', { name: /username/i }), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
};

//Tests
describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the username input', () => {
    renderPage();
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
  });
  it('renders the password input', () => {
    renderPage();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  it('renders the login button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  it('renders a link to the register page', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /register/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/register');
  });
})