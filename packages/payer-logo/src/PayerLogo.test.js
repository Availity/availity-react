import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';

import PayerLogo, { getLogo } from '..';

jest.mock('@availity/api-axios');

describe('PayerLogo', () => {
  test('should not render when no space or payer id', () => {
    render(<PayerLogo clientId="my-client-id" />);

    expect(() => screen.getByAltText()).toThrow();
  });

  test('should render with payer id', async () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            items: [
              {
                images: {
                  logo: '/static/spaces/73162546201440710195134200002269/banner.png',
                },
              },
            ],
          },
        },
      },
    });

    render(<PayerLogo payerId="BCBSF" clientId="my-client-id" />);

    await waitFor(() => {
      const element = screen.getByAltText('Payer logo');
      expect(element.src).toContain('/static/spaces/73162546201440710195134200002269/banner.png');
    });
  });

  test('should render with default when payer id returns no results', async () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationPagination: {
            items: [],
          },
        },
      },
    });

    render(<PayerLogo payerId="00681" clientId="my-client-id" />);

    await waitFor(() => {
      const element = screen.getByAltText('Payer logo');
      expect(element.src).toContain('/public/apps/eligibility/images/value-add-logos/00681.gif');
    });
  });

  test('should render with space id', async () => {
    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          configurationFindOne: {
            images: {
              logo: '/static/spaces/73162546201441126239486200007187/banner.png',
            },
          },
        },
      },
    });

    render(<PayerLogo spaceId="73162546201441126239486200007187" clientId="my-client-id" />);

    await waitFor(() => {
      const element = screen.getByAltText('Payer logo');
      expect(element.src).toContain('/static/spaces/73162546201441126239486200007187/banner.png');
    });
  });

  test('should throw error on missing clientId', async () => {
    let message;
    try {
      await getLogo();
    } catch (error) {
      const { message: mess } = error;
      message = mess;
    }

    expect(message).toBe('clientId is required');
  });

  test('should return error on rejected promise', async () => {
    avWebQLApi.create.mockRejectedValue('This field was rejected');

    const response = await getLogo(null, '3', 'test-client-id');

    expect(response).toBe('This field was rejected');
  });
});
