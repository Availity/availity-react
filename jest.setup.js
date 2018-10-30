import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// prop type errors throw actual errors in test
const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};
