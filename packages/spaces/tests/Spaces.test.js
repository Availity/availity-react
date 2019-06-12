/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  render,
  waitForElement,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { avSlotMachineApi } from '@availity/api-axios';
import { getAllSpaces, sanitizeSpaces } from '../src/Spaces';
import Spaces, { useSpace } from '..';

jest.mock('@availity/api-axios');

describe('Spaces', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('provides correct spaces from props and from slotmachine', async () => {
    avSlotMachineApi.create
      .mockResolvedValueOnce({
        data: {
          data: {
            spaces: {
              totalCount: 1,
              page: 1,
              perPage: 1,
              spaces: [{ id: '1' }],
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            spaces: {
              totalCount: 1,
              page: 1,
              perPage: 1,
              spaces: [{ id: '2' }],
            },
          },
        },
      });

    // Create a space component that renders "Space <id-here> is in provider" if the space is in the provider and "Space <id-here> is not in provider" if it is not the provider
    const SpaceComponent = ({ spaceId }) => {
      const { space } = useSpace(spaceId);

      return (
        <div>
          <span data-testid={`space-for-${spaceId}`}>
            {space
              ? `Space ${spaceId} is in provider`
              : `Space ${spaceId} is not in provider`}
          </span>
        </div>
      );
    };

    // Create component that renders a SpaceComponent for ids 1, 2, and 3
    const MyComponent = () => {
      const [spaceIds, setSpaceIds] = useState(['1', '3']);

      return (
        <Spaces
          spaceIds={spaceIds}
          spaces={[{ id: '3' }]}
          clientId="my-client-id"
        >
          <SpaceComponent spaceId="1" />
          <SpaceComponent spaceId="2" />
          <SpaceComponent spaceId="3" />

          <button
            type="button"
            data-testid="add-spaceid-btn"
            onClick={() => setSpaceIds(['1', '2', '3'])}
          />
        </Spaces>
      );
    };

    const { getByTestId } = render(<MyComponent />);

    // Check that space 1 (fetched from slotmachine) is accessible by spaces provider
    let space1 = await waitForElement(() => getByTestId('space-for-1'));
    expect(space1.textContent).toBe('Space 1 is in provider');

    // Check that space 2 (not provided) is not accessible by spaces provider
    let space2 = await waitForElement(() => getByTestId('space-for-2'));
    expect(space2.textContent).toBe('Space 2 is not in provider');

    // Check that space 3 (provided by props) is accessible by spaces provider
    let space3 = await waitForElement(() => getByTestId('space-for-3'));
    expect(space3.textContent).toBe('Space 3 is in provider');

    // Check that slotmachine was only queried for space 1 because space 3 was provided by props
    expect(avSlotMachineApi.create.mock.calls[0][0].variables.ids).toEqual([
      '1',
    ]);

    // Click button that adds another space id, "2", to the provider
    fireEvent.click(getByTestId('add-spaceid-btn'));

    // Check that space 1 (fetched from slotmachine) is still accessible by spaces provider
    space1 = await waitForElement(() => getByTestId('space-for-1'));
    expect(space1.textContent).toBe('Space 1 is in provider');

    // Check that space 2 (now fetched from slotmachine) is now accessible by spaces provider
    space2 = await waitForElement(() => getByTestId('space-for-2'));
    expect(space2.textContent).toBe('Space 2 is in provider');

    // Check that space 3 (provided by props) is still accessible by spaces provider
    space3 = await waitForElement(() => getByTestId('space-for-3'));
    expect(space3.textContent).toBe('Space 3 is in provider');

    // Check that slotmachine was only queried for space 2 because the spaces provider already had space 1 (from previous query) and space 3 (from props)
    expect(avSlotMachineApi.create.mock.calls[1][0].variables.ids).toEqual([
      '2',
    ]);
  });

  describe('getAllSpaces', () => {
    it('gets all spaces', async () => {
      avSlotMachineApi.create
        .mockResolvedValueOnce({
          data: {
            data: {
              spaces: {
                totalCount: 10,
                page: 1,
                perPage: 5,
                spaces: [{ id: '1' }, {}, {}, {}, {}],
              },
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            data: {
              spaces: {
                totalCount: 10,
                page: 2,
                perPage: 5,
                spaces: [{}, {}, {}, {}, { id: '10' }],
              },
            },
          },
        });

      const spaces = await getAllSpaces('query', 'clientId', {
        types: ['space'],
      });

      // Check correct spaces get returned
      expect(spaces.length).toBe(10);
      expect(spaces[0].id).toBe('1');
      expect(spaces[spaces.length - 1].id).toBe('10');

      // Check correct slotmachine calls were made
      expect(avSlotMachineApi.create).toHaveBeenCalledTimes(2);
      expect(avSlotMachineApi.create.mock.calls[1][0].variables.page).toBe(2);
    });
  });

  describe('sanitizeSpaces', () => {
    it('normalizes space pairs', async () => {
      const spaces = [{ metadata: [{ name: 'a', value: '1' }] }];

      const sanitized = sanitizeSpaces(spaces);

      expect(sanitized[0].metadata).toEqual({ a: '1' });
    });
  });
});
