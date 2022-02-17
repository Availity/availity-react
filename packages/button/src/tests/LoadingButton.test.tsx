import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import LoadingButton from '../LoadingButton';

describe('Loading Button', () => {
  test('should render when not loading', async () => {
    const buttonText = 'Text';
    const { container, getByTestId } = render(<LoadingButton isLoading={false}>{buttonText}</LoadingButton>);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const buttonElement = await waitFor(() => getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.textContent?.trim()).toBe(buttonText);
  });

  test('is clickable when not loading', async () => {
    const onClick = jest.fn();

    const buttonText = 'Text';
    const { container, getByTestId } = render(
      <LoadingButton isLoading={false} onClick={onClick}>
        {buttonText}
      </LoadingButton>
    );

    expect(container).toBeDefined();

    const buttonElement = await waitFor(() => getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  test('should render when loading', async () => {
    const buttonText = 'Text';
    const { container, getByTestId } = render(<LoadingButton isLoading={true}>{buttonText}</LoadingButton>);

    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();

    const buttonElement = await waitFor(() => getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.textContent?.trim()).not.toBe(buttonText);
  });

  test('is disabled when loading', async () => {
    const onClick = jest.fn();

    const buttonText = 'Text';
    const { container, getByTestId } = render(
      <LoadingButton isLoading={true} onClick={onClick}>
        {buttonText}
      </LoadingButton>
    );

    expect(container).toBeDefined();

    const buttonElement = await waitFor(() => getByTestId('loading_button'));
    expect(buttonElement).not.toBeNull();

    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(onClick).not.toBeCalled();
    });
  });
});
