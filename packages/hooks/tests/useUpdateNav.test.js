import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate, Routes, Route } from 'react-router-dom';
import avMessageMock from '@availity/message-core';

import useUpdateNav from '../src/useUpdateNav';

jest.mock('@availity/message-core');

const Component = () => {
  const navigate = useNavigate();

  useUpdateNav();

  return (
    <button
      type="button"
      onClick={() => {
        navigate('/test');
      }}
    >
      Click
    </button>
  );
};

describe('useUpdateNav', () => {
  test('calls avMessage on location change', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/test" element={<div>Example</div>} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByText('Click');

    fireEvent.click(button);

    expect(avMessageMock.send).toHaveBeenCalledWith({
      event: 'navChange',
      url: 'http://localhost/',
    });
  });
});
