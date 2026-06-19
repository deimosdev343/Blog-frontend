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

