import { render, screen } from '@testing-library/react';
import axios from 'axios';
import page from './page';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('@/components/User/UserNotFound', () => ({
  __esModule: true,
  default: ({ showBackButton }: { showBackButton: boolean }) => (
    <div data-testid="user-not-found" />
  )
}));

jest.mock('@/components/User/UserProfileComponent', () => ({
  __esModule: true,
  default: ({ username }: { username: string }) => (
    <div data-testid="user-profile">{username}</div>
  )
}));

jest.mock('@/components/UserPosts/UserPosts', () => ({
  __esModule: true,
  default: ({ user_id }: { user_id: string }) => (
    <div data-testid="user-posts" data-user-id={user_id} />
  )
}));

const renderPage = async (slug: string) => {
  const ui = await page({ params: { slug } });
  return render(ui);
};


describe('profile page', () => {
  beforeEach(() => {
    process.env.BACKEND_API = 'http://localhost:8000';
  });
  it('renders UserProfileComponent when user is found', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        username: 'johndoe',
        descrption: 'Hello',
        avatar_url: 'https://example.com/avatar.png'
      }
    });

    await renderPage('123');

    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
  });
})