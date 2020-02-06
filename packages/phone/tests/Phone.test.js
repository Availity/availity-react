import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Phone from '..';

// TODO: tests
describe('Phone', () => {
  afterEach(() => {
    cleanup();
  });

  test('always passes', async () => {
    expect(true).toBe(true);
  });
});
