import { render, screen } from '@testing-library/react';
import Page from './page';
import {describe, expect, it, test} from '@jest/globals';
import axios from 'axios';
import FullPostComponent from '@/components/posts/FullPostComponent';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('@/components/comments/CommentBox', () => ({
  __esModule: true,
  default: ({post_id} : {post_id: number}) => <div data-testid="comment-box" data-post-id={post_id}/>
}))


jest.mock('@/components/posts/PostVoteRatio', () => ({
  __esModule: true,
  default: () => <div data-testid="vote-ratio" />
}));

const defaultProps = {
  id: 1,
  title: 'My Test Post',
  content: '<p>Hello World</p>',
  username: 'johndoe',
  avatarUrl: 'https://example.com/avatar.png',
  user_id: 42
};

beforeEach(() => {
  mockedAxios.get.mockResolvedValue({
    data: { upvotes: 5, downvotes: 2, user_votes: 0 }
  });
});

describe('FullPostComponent rendering', () => {
  it('renders the post title', async () => {
    render(<FullPostComponent {...defaultProps} />);
    expect(screen.getByText('My Test Post')).toBeInTheDocument();
  });

  it('renders the username', async () => {
    render(<FullPostComponent {...defaultProps} />);
    expect(screen.getByText("johndoe")).toBeInTheDocument();
  })
  it('renders post HTML content', async () => {
    render(<FullPostComponent {...defaultProps} />);
    const contentDiv = screen.getByText("Hello World");
    expect(contentDiv).toContainHTML('<p>Hello World</p>');
  });
  it('renders the avatar with the provided URL', async () => {
    render(<FullPostComponent {...defaultProps} />);

    const avatar = screen.getByAltText('avatar');
    expect(avatar).toHaveAttribute('src', expect.stringContaining('example.com'));
  });
  it('renders the default avatar when avatarUrl is invalid', async () => {
    render(<FullPostComponent {...defaultProps} avatarUrl="not-a-valid-url" />);
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
  });
})
