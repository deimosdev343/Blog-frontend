import { render, screen } from '@testing-library/react';
import Page from './page';
import {describe, expect, it, jest, test} from '@jest/globals';

jest.mock('axios');

test('renders page', async () => {
  const page = await Page({
    params: {
      slug: '12',
    },
  });

  render(page);
  expect(screen.getByTestId('blog-content')).toBeInTheDocument();
});