import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import LoadingButton from './LoadingButton';

describe('Loading Button', () => {
  test('should render when not loading', async () => {
    const buttonText = 'Text';
    render(
      <LoadingButton data-testid="loading_button" isLoading={false}>
        {buttonText}
      </LoadingButton>
    );

    const buttonElement = await waitFor(() => screen.getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.textContent?.trim()).toBe(buttonText);
  });

  test('is clickable when not loading', async () => {
    const onClick = jest.fn();

    const buttonText = 'Text';
    render(
      <LoadingButton isLoading={false} onClick={onClick} data-testid="loading_button">
        {buttonText}
      </LoadingButton>
    );

    const buttonElement = await waitFor(() => screen.getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should render when loading', async () => {
    const buttonText = 'Text';
    render(
      <LoadingButton isLoading data-testid="loading_button">
        {buttonText}
      </LoadingButton>
    );

    const buttonElement = await waitFor(() => screen.getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.textContent?.trim()).not.toBe(buttonText);
  });

  test('is disabled when loading', async () => {
    const onClick = jest.fn();
    const buttonText = 'Text';

    render(
      <LoadingButton isLoading onClick={onClick} data-testid="loading_button">
        {buttonText}
      </LoadingButton>
    );

    const buttonElement = await waitFor(() => screen.getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();

    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(onClick).not.toBeCalled();
    });
  });
});
