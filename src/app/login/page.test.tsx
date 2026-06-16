import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Page from './page';
import { useAppDispatch } from '@/lib/store';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/lib/store', () => ({
  useAppDispatch: jest.fn(),
  loginUser: jest.fn((payload) => ({ type: 'auth/loginUser', payload })),
}));