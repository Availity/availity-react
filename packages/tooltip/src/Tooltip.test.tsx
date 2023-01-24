import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Tooltip from './Tooltip';

afterEach(cleanup);

const example = (
  <>
    <Tooltip data-testid="tooltip" target="tooltip">
      <span>This is a tooltip</span>
    </Tooltip>
    <span data-testid="tooltip-target" id="tooltip">
      hover me!
    </span>
  </>
);

describe('Tooltip', () => {
  test('should render', async () => {
    const baseDom = render(example);

    fireEvent.mouseOver(baseDom.getByTestId('tooltip-target'));
    await waitFor(() => baseDom.getByTestId('tooltip'));
    expect(baseDom.getByText('This is a tooltip')).toBeInTheDocument();
  });

  test('should close on esc', async () => {
    const baseDom = render(example);
    fireEvent.mouseOver(baseDom.getByTestId('tooltip-target'));

    await waitFor(() => baseDom.getByTestId('tooltip'));
    fireEvent.keyDown(baseDom.container, { key: 'Escape', code: 'Escape' });
    await waitFor(() => fireEvent.mouseOver(baseDom.getByTestId('tooltip-target')));
    expect(await baseDom.getByText('This is a tooltip')).toBeInTheDocument();
  });
});
