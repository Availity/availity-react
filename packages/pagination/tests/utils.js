import React from 'react';
import { render, within } from 'react-testing-library';

/* 
Component: Component to render
props: new props
defaultProps: default values to test against
withinId: testId to grab by and search within, or a function that takes the top level and returns the element to call within on
*/
function TestRender(Component, props, withinId) {
  let output = render(<Component {...props} />);
  const { rerender } = output;
  if (withinId) {
    const topSection =
      typeof withinId === 'string'
        ? output.getByTestId(withinId)
        : withinId(output);
    output = within(topSection);
  }

  output.rerender = newProps => rerender(<Component {...newProps} />);

  return output;
}
// temp for default export
const otherUtil = () => {};
export { TestRender, otherUtil };
