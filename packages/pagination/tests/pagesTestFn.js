import { TestRender } from './utils';

import { defaultButtonText } from '../PaginationControls/Pages';

const testId = 'page-selector';

function testPagesRender({
  Component,
  expectedSuccess = true,
  props,
  withinId,
  controlledProp = 'onPageChange',
}) {
  let mockFn;
  if (controlledProp) {
    beforeEach(() => {
      mockFn = jest.fn();
    });
  }

  function getProps(newProps) {
    const output = { ...props };
    if (controlledProp) {
      Object.assign(output, {
        [controlledProp]: mockFn,
        pageCount: 5,
      });
    }
    if (newProps) {
      Object.assign(output, newProps);
    }
    return output;
  }

  test('renders Pages as expected', () => {
    const { queryByTestId } = TestRender(Component, getProps(), withinId);
    let state = expect(queryByTestId(testId));
    if (!expectedSuccess) {
      state = state.not;
    }
    state.toBeDefined();
  });

  test('renders nav buttons by default', () => {
    const { queryByLabelText } = TestRender(Component, getProps(), withinId);
    [
      { label: 'First', text: defaultButtonText.firstBtn },
      { label: 'Previous', text: defaultButtonText.prevBtn },
      { label: 'Next', text: defaultButtonText.nextBtn },
      { label: 'Last', text: defaultButtonText.lastBtn },
    ].forEach(testCase => {
      const test = expect(queryByLabelText(testCase.label));
      if (!expectedSuccess) {
        test.toBeNull();
      } else {
        test.toHaveTextContent(testCase.text);
      }
    });
  });

  // export const defaultButtonText = {
  //   firstBtn: '«« First',
  //   prevBtn: '« Prev',
  //   nextBtn: 'Next »',
  //   lastBtn: 'Last »»',
  // };

  test('renders nav buttons with expected text', () => {
    const { queryByLabelText, rerender } = TestRender(
      Component,
      getProps(),
      withinId
    );

    [
      {
        label: 'First',
        prop: 'firstBtn',
        testValues: ['hello world', 'First', 'First Page', false],
      },
      {
        label: 'Previous',
        prop: 'prevBtn',
        testValues: ['Previous', 'Previous Page', false],
      },
      {
        label: 'Next',
        prop: 'nextBtn',
        testValues: ['Next', 'Next Page', false],
      },
      {
        label: 'Last',
        prop: 'lastBtn',
        testValues: ['Last', 'Last Page', false],
      },
    ].forEach(testCase => {
      testCase.testValues.forEach(testText => {
        rerender(
          getProps({
            [testCase.prop]: testText,
          })
        );

        const elm = queryByLabelText(testCase.label);

        const test = expect(elm);
        if (!testText || !expectedSuccess) {
          test.toBeNull();
        } else {
          test.toHaveTextContent(testText);
        }
      });
    });
  });
}

// temp for default linter
const otherTest = () => {};

export { testPagesRender, otherTest };
