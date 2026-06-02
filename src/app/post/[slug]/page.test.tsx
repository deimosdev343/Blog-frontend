import { render, screen } from '@testing-library/react';
import Page from './page';
import {describe, expect, it, test} from '@jest/globals';
import axios from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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