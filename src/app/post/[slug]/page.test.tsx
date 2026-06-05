import { render, screen } from '@testing-library/react';
import Page from './page';
import {describe, expect, it, test} from '@jest/globals';
import axios from 'axios';

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

it('renders empty page', async () => {
  
  mockedAxios.get.mockResolvedValue({
    data:null
  });
  const page = await Page({
    params: {
      slug: "EmptyPageSlug",
    },

  });

  render(page);
  expect(screen.getByTestId('notFound')).toBeInTheDocument();
})

it('renders page', async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      title: "Test",
      content: "test"
    }
  });
  const page = await Page({
    params: {
      slug: "12",
    },
  });

  render(page);
  expect(screen.getByTestId('blog-content')).toBeInTheDocument();
});

describe('getPost', () => {
  it('calls axios with the correct URL', async () => {
    process.env.BACKEND_API = 'http://localhost:8000';
    
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        title: 'Test Post',
        content: '<p>Hello</p>',
        username: 'john',
        author_id: 42,
        user_avatar: 'https://example.com/avatar.png'
      }
    });
    const page = await Page({
      params: {
        slug: "12",
      },
    });
    
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/posts/12');
  });
});
