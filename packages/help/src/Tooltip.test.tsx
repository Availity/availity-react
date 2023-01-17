import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Tooltip from './Tooltip';

afterEach(cleanup);

describe('Tooltip', () => {
  test('should render', () => {
    const { container } = render(
      <>
        <Tooltip target="tooltip">
          <span>This is a tooltip</span>
        </Tooltip>
        <span id="tooltip">hover me!</span>
      </>
    );

    expect(container).toMatchSnapshot();
  });

  test('should close on esc', () => {
    const baseDom = render(
      <>
        <Tooltip target="tooltip">
          <span>This is a tooltip</span>
        </Tooltip>
        <span id="tooltip" data-test-id="tooltip">
          hover me!
        </span>
      </>
    );
    fireEvent.mouseOver(baseDom.getByTestId('tooltip'));
    expect(baseDom.getByText('This is a tooltip')).toBeDefined();

    fireEvent.keyDown(baseDom.container, { key: 'Escape', code: 'Escape' });
    expect(baseDom.getByText('This is a tooltip')).toBeUndefined();
  });
});
