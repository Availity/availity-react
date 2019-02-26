import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { avSlotMachineApi } from '@availity/api-axios';

import PayerLogo from '../PayerLogo';

jest.mock('@availity/api-axios');

describe('PayerLogo', () => {
  test('should not render when no space or payer id', async () => {
    const { container } = render(<PayerLogo />);

    expect(container).toMatchSnapshot();
  });

  test('should render with payer id', async () => {
    avSlotMachineApi.create.mockResolvedValue({
      data: {
        data: {
          spaces: {
            spaces: [
              {
                images: [
                  {
                    name: 'logo',
                    value:
                      '/static/spaces/73162546201440710195134200002269/banner.png',
                  },
                ],
              },
            ],
          },
        },
      },
    });

    const { container } = render(<PayerLogo payerId="BCBSF" />);

    await waitForElement(() =>
      container.querySelector(
        'img[src="/static/spaces/73162546201440710195134200002269/banner.png"]'
      )
    );

    expect(container).toMatchSnapshot();
  });

  test('should render with default when payer id returns no results', async () => {
    avSlotMachineApi.create.mockResolvedValue({
      data: {
        data: {
          spaces: {
            spaces: [],
          },
        },
      },
    });

    const { container } = render(<PayerLogo payerId="00681" />);

    await waitForElement(() =>
      container.querySelector(
        'img[src="/public/apps/eligibility/images/value-add-logos/00681.gif"]'
      )
    );

    expect(container).toMatchSnapshot();
  });

  test('should render with space id', async () => {
    avSlotMachineApi.create.mockResolvedValue({
      data: {
        data: {
          space: {
            images: [
              {
                name: 'logo',
                value:
                  '/static/spaces/73162546201441126239486200007187/banner.png',
              },
            ],
          },
        },
      },
    });

    const { container } = render(
      <PayerLogo spaceId="73162546201441126239486200007187" />
    );

    await waitForElement(() =>
      container.querySelector(
        'img[src="/static/spaces/73162546201441126239486200007187/banner.png"]'
      )
    );

    expect(container).toMatchSnapshot();
  });
});
