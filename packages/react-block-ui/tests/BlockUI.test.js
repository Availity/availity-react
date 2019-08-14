import React from 'react';
import { render } from '@testing-library/react';
import BlockUI from '..';

describe("BlockUI", () => {
    test('renders', () => {
        render(<BlockUI />);
    });
});