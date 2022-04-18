import React from 'react';
import { render } from '@testing-library/react';
import JsonViewer from '..';

const setup = (data: Record<string, unknown>, expandAll?: boolean, listClassNames?: string | string[]) => render(<JsonViewer data={data} expandAll={!!expandAll} listClassNames={listClassNames} />);


describe('JsonViewer', () => {
  test('does not render keys with null or undefined values without throwing error', () => {
    const { getByText, queryByText } = setup({foo: 'bar', baz: null, somethingElse: undefined})
    const el = getByText(/bar/i);
    expect(el).toBeInTheDocument();
    const ghost = queryByText('baz')
    expect(ghost).not.toBeInTheDocument()
  });
  test('renders deeply nested objects into the dom so they can be read by screenreaders even if parent elements are not open', () => {
    const {getByText} = setup({foo: {bar: {baz: ['stuff', 'things', 'etc.']}}})
    expect(getByText('stuff')).toBeInTheDocument()
  })
  test('expandAll expands all details elements', () => {
    const {getAllByRole} = setup({foo: {bar: {baz: ['stuff', 'things', 'etc.']}}}, true)
    const details = getAllByRole('group')
    details.forEach(detail => {
      expect(detail).toHaveAttribute('open')
    })
  })
  test('expandAll false does not have open attribute on details elements', () => {
    const {getAllByRole} = setup({foo: {bar: {baz: ['stuff', 'things', 'etc.']}}}, false)
    const details = getAllByRole('group')
    details.forEach(detail => {
      expect(detail).not.toHaveAttribute('open')
    })
  })
  test('listClassNames get applied to parent ul element', () => {
    const {getByTestId} = setup({foo: {bar: {baz: ['stuff', 'things', 'etc.']}}}, false, 'text-uppercase')
    const parent = getByTestId('topLevelUl')
    expect(parent).toHaveClass('text-uppercase')
    // and it doesnt override the default
    expect(parent).toHaveClass('p-2')
  })
});