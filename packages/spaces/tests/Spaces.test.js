import { avSlotMachineApi } from '@availity/api-axios';
import { getAllSpaces } from '../src/Spaces';

jest.mock('@availity/api-axios');

describe('Spaces', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
});
