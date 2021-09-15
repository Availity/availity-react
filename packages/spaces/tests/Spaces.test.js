/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';
import { getAllSpaces } from '../src/Spaces';
import { sanitizeSpaces } from '../src/helpers';
import Spaces, { useSpaces, useSpacesContext, SpacesLogo } from '..';

jest.mock('@availity/api-axios');

describe('Spaces', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('provides correct spaces from props and from avWebQL', async () => {
    avWebQLApi.create
      .mockResolvedValueOnce({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 1,
                currentPage: 1,
                perPage: 1,
              },
              items: [{ id: '1' }],
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 1,
                currentPage: 1,
                perPage: 1,
              },
              items: [{ id: '2' }],
            },
          },
        },
      });

    // Create a space component that renders "Space <id-here> is in provider" if the space is in the provider and "Space <id-here> is not in provider" if it is not the provider
    const SpaceComponent = ({ spaceId }) => {
      const [space] = useSpaces(spaceId);

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
          >
            Add
          </button>
        </Spaces>
      );
    };

    const { getByTestId } = render(<MyComponent />);

    // Check that space 1 (fetched from avWebQL) is accessible by spaces provider
    let space1 = await waitFor(() => getByTestId('space-for-1'));
    expect(space1.textContent).toBe('Space 1 is in provider');

    // Check that space 2 (not provided) is not accessible by spaces provider
    let space2 = await waitFor(() => getByTestId('space-for-2'));
    expect(space2.textContent).toBe('Space 2 is not in provider');

    // Check that space 3 (provided by props) is accessible by spaces provider
    let space3 = await waitFor(() => getByTestId('space-for-3'));
    expect(space3.textContent).toBe('Space 3 is in provider');

    // Check that avWebQL was only queried for space 1 because space 3 was provided by props
    expect(avWebQLApi.create.mock.calls[0][0].variables.ids).toEqual(['1']);

    // Click button that adds another space id, "2", to the provider
    fireEvent.click(getByTestId('add-spaceid-btn'));

    // Check that space 1 (fetched from avWebQL) is still accessible by spaces provider
    space1 = await waitFor(() => getByTestId('space-for-1'));
    expect(space1.textContent).toBe('Space 1 is in provider');

    // Check that space 2 (now fetched from avWebQL) is now accessible by spaces provider
    space2 = await waitFor(() => getByTestId('space-for-2'));
    expect(space2.textContent).toBe('Space 2 is in provider');

    // Check that space 3 (provided by props) is still accessible by spaces provider
    space3 = await waitFor(() => getByTestId('space-for-3'));
    expect(space3.textContent).toBe('Space 3 is in provider');

    // Check that avWebQL was only queried for space 2 because the spaces provider already had space 1 (from previous query) and space 3 (from props)
    expect(avWebQLApi.create.mock.calls[1][0].variables.ids).toEqual(['2']);
  });

  it('toggles whether the spaces provider is loading', async () => {
    avWebQLApi.create
      .mockResolvedValueOnce({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 1,
                currentPage: 1,
                perPage: 1,
              },
              items: [{ id: '1' }],
            },
          },
        },
      })
      .mockResolvedValue({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 1,
                currentPage: 1,
                perPage: 1,
              },
              items: [{ id: '2' }],
            },
          },
        },
      });

    const fn = jest.fn(() => {});
    // Create component to call mock function
    const SpaceComponent = ({ spaceId }) => {
      const [space] = useSpaces(spaceId);
      const { loading, error } = useSpacesContext(spaceId);

      // Should be called when async effect to fetch spaces from avWebQL gets executed
      if (space && !loading) fn(space, error);
      return loading ? null : (
        <span data-testid={`space-for-${spaceId}`}>
          {space ? `Space ${space.id}` : 'No Space '}
        </span>
      );
    };

    // Create component that renders a SpaceComponent for the current space id
    const MyComponent = () => {
      const [spaceId, setSpaceId] = useState('1');

      return (
        <Spaces spaceIds={[spaceId]} clientId="my-client-id">
          <SpaceComponent spaceId={spaceId} />

          <button
            type="button"
            data-testid="add-spaceid-btn"
            onClick={() => setSpaceId('2')}
          >
            Add
          </button>
        </Spaces>
      );
    };

    const { getByTestId } = render(<MyComponent />);

    await waitFor(() => getByTestId('space-for-1'));

    // Check func was called when loading space 1
    expect(fn).toHaveBeenCalledTimes(1);

    // Add a space id
    fireEvent.click(getByTestId('add-spaceid-btn'));

    await waitFor(() => getByTestId('space-for-2'));

    // Check func was called when loading space 2
    expect(fn).toHaveBeenCalledTimes(2);
  });

  describe('getAllSpaces', () => {
    it('gets all spaces', async () => {
      avWebQLApi.create
        .mockResolvedValueOnce({
          data: {
            data: {
              configurationPagination: {
                pageInfo: {
                  pageCount: 2,
                  itemCount: 10,
                  currentPage: 1,
                  perPage: 5,
                },
                items: [{ id: '1' }, {}, {}, {}, {}],
              },
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            data: {
              configurationPagination: {
                pageInfo: {
                  pageCount: 2,
                  itemCount: 10,
                  currentPage: 2,
                  perPage: 5,
                },
                items: [{}, {}, {}, {}, { id: '10' }],
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

      // Check correct avWebQLApi calls were made
      expect(avWebQLApi.create).toHaveBeenCalledTimes(2);
      expect(avWebQLApi.create.mock.calls[1][0].variables.page).toBe(2);
    });

    it('should throw error when missing clientId', async () => {
      let message = false;
      try {
        await getAllSpaces('query');
      } catch (error) {
        const { message: mess } = error;
        message = mess;
      }
      expect(message).toBe('clientId is required');
    });
  });

  describe('sanitizeSpaces', () => {
    it('normalizes space pairs', async () => {
      const spaces = [{ metadata: [{ name: 'a', value: '1' }] }];

      const sanitized = sanitizeSpaces(spaces);

      expect(sanitized[0].metadata).toEqual({ a: '1' });
    });
  });

  it('returns error when missing clientId', async () => {
    // Create component that renders a SpaceComponent for the current space id
    const fn = jest.fn(() => {});
    // Create component to call mock function
    const SpaceComponent = ({ spaceId }) => {
      const [space] = useSpaces(spaceId);
      const { loading, error } = useSpacesContext(spaceId);

      // Should be called when async effect to fetch spaces from avWebQL gets executed
      if (!loading) fn(space, error);
      return loading ? null : (
        <span data-testid={`space-for-${spaceId}`}>
          {space ? `Space ${space.id}` : 'No Space '}
        </span>
      );
    };

    const { getByText } = render(
      <Spaces spaceIds={['1']}>
        <SpaceComponent />
      </Spaces>
    );

    await waitFor(() => getByText('No Space'));

    expect(fn.mock.calls[0][1]).toBe('clientId is required');
  });

  test('works with render props', async () => {
    avWebQLApi.create.mockResolvedValueOnce({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              pageCount: 2,
              currentPage: 1,
              perPage: 2,
            },
            items: [{ id: '1' }, { id: '2' }],
          },
        },
      },
    });

    console.warn = jest.fn();

    const { getByText } = render(
      <Spaces spaceIds={['1', '2']} clientId="test-client-id">
        {({ spaces = [] }) => <div>{spaces.map((space) => space.id)}</div>}
      </Spaces>
    );

    const spc = await waitFor(() => getByText('12'));
    expect(spc).toBeDefined();
  });

  describe('useSpaces', () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              pageCount: 3,
              currentPage: 1,
              perPage: 3,
            },
            items: [
              { id: '1', configurationId: '11', payerIDs: ['a', 'b', 'c'] },
              { id: '2', configurationId: '22', payerIDs: ['b', 'c'] },
              { id: '3', configurationId: '33', payerIDs: ['d', 'c'] },
            ],
          },
        },
      },
    });

    // Create a spaces component that renders ids passed in
    const SpacesComponent = ({ ids = [] }) => {
      const spaces = useSpaces(...ids);

      const dataTestIdSuffix =
        ids && ids.length > 0 ? ids.join('-') : 'all-spaces';
      return (
        <div>
          <span data-testid={`spaces-for-${dataTestIdSuffix}`}>
            {spaces.map((spc) => `Id: ${spc && spc.id} `)}
          </span>
        </div>
      );
    };

    it('returns spaces by id', async () => {
      avWebQLApi.create.mockResolvedValue({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 3,
                currentPage: 1,
                perPage: 3,
              },
              items: [
                { id: '1', configurationId: '11', payerIDs: ['a', 'b', 'c'] },
                { id: '2', configurationId: '22', payerIDs: ['b', 'c'] },
                { id: '3', configurationId: '33', payerIDs: ['d', 'c'] },
              ],
            },
          },
        },
      });

      const testById = render(
        <Spaces spaceIds={['1', '2', '3']} clientId="test-client-id">
          <SpacesComponent />
          <SpacesComponent ids={['2', '3']} />
        </Spaces>
      );

      expect(avWebQLApi.create.mock.calls[0][0].variables.ids).toEqual([
        '1',
        '2',
        '3',
      ]);

      // Check that all spaces get returned when no ids get passed to useSpaces hook
      const allSpaces = await waitFor(() =>
        testById.getByTestId('spaces-for-all-spaces')
      );
      expect(allSpaces.textContent).toBe('Id: 1 Id: 2 Id: 3 ');

      // Check that spaces for ids get returned when ids passed to useSpaces hook
      const specificSpaces = await waitFor(() =>
        testById.getByTestId('spaces-for-2-3')
      );
      expect(specificSpaces.textContent).toBe('Id: 2 Id: 3 ');
    });

    it('returns spaces by configurationId', async () => {
      avWebQLApi.create.mockResolvedValue({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 3,
                currentPage: 1,
                perPage: 3,
              },
              items: [
                { id: '1', configurationId: '11', payerIDs: ['a', 'b', 'c'] },
                { id: '2', configurationId: '22', payerIDs: ['b', 'c'] },
                { id: '3', configurationId: '33', payerIDs: ['d', 'c'] },
              ],
            },
          },
        },
      });

      const testByConfigurationId = render(
        <Spaces spaceIds={['11', '22', '33']} clientId="test-client-id">
          <SpacesComponent />
          <SpacesComponent ids={['22', '33']} />
        </Spaces>
      );
      //
      // Check that all spaces get returned when no configurationIds get passed to useSpaces hook
      const allSpacesByConfigurationIds = await waitFor(() =>
        testByConfigurationId.getByTestId('spaces-for-all-spaces')
      );
      expect(allSpacesByConfigurationIds.textContent).toBe(
        'Id: 1 Id: 2 Id: 3 '
      );

      // Check that spaces for configurationIds get returned when configurationIds passed to useSpaces hook
      const specificSpacesByConfigurationIds = await waitFor(() =>
        testByConfigurationId.getByTestId('spaces-for-22-33')
      );
      expect(specificSpacesByConfigurationIds.textContent).toBe('Id: 2 Id: 3 ');
    });

    it('returns spaces by payerId', async () => {
      avWebQLApi.create.mockResolvedValue({
        data: {
          data: {
            configurationPagination: {
              pageInfo: {
                pageCount: 3,
                currentPage: 1,
                perPage: 3,
              },
              items: [
                { id: '1', configurationId: '11', payerIDs: ['a', 'b', 'c'] },
                { id: '2', configurationId: '22', payerIDs: ['b', 'c'] },
                { id: '3', configurationId: '33', payerIDs: ['d', 'c'] },
              ],
            },
          },
        },
      });

      const testByPayerId = render(
        <Spaces payerIds={['a', 'b', 'c']} clientId="test-client-id">
          <SpacesComponent ids={['b']} />
          <SpacesComponent ids={['c']} />
        </Spaces>
      );

      // Check that spaces for payer ids get returned when ids passed to useSpaces hook
      const payerSpecificSpaces = await waitFor(() =>
        testByPayerId.getByTestId('spaces-for-b')
      );
      expect(payerSpecificSpaces.textContent).toBe('Id: 2 ');
      const payerSpecificSpaces2 = await waitFor(() =>
        testByPayerId.getByTestId('spaces-for-c')
      );
      expect(payerSpecificSpaces2.textContent).toBe('Id: 1 ');
    });
  });

  it('returns first payer space with when no spaceId passed', async () => {
    avWebQLApi.create.mockResolvedValueOnce({
      data: {
        data: {
          configurationPagination: {
            pageInfo: {
              pageCount: 1,
              currentPage: 1,
              perPage: 1,
            },
            items: [{ id: '1', name: 'hello world' }],
          },
        },
      },
    });

    // Create component that renders a SpaceComponent for the current space id
    const SpaceComponent = () => {
      const [space = {}] = useSpaces();

      return (
        <div data-testid={`space-${space.id}`}>
          <span>{space.name}</span>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <Spaces spaceIds={['1']} clientId="my-client-id">
        <SpaceComponent />
      </Spaces>
    );

    const spc1 = await waitFor(() => getByTestId('space-1'));
    const spc2 = await waitFor(() => getByText('hello world'));

    expect(spc1).toBeDefined();
    expect(spc2).toBeDefined();
  });
});

test('renders with warning', async () => {
  avWebQLApi.create.mockResolvedValueOnce({
    data: {
      data: {
        configurationPagination: {
          pageInfo: {
            pageCount: 2,
            currentPage: 1,
            perPage: 2,
          },
          items: [{ id: '1' }, { id: '2' }],
        },
      },
    },
  });

  console.warn = jest.fn();

  const { getByTestId } = render(
    <Spaces spaceIds={['1', '2']} clientId="test-client-id">
      <SpacesLogo data-testid="spaces-logo-1" />
    </Spaces>
  );

  await waitFor(() => getByTestId('spaces-logo-1'));

  expect(console.warn.mock.calls[0][0]).toBe(
    'You did not pass an ID in to find a space, and there is more than 1 space in the space array. Returning all.'
  );
});
