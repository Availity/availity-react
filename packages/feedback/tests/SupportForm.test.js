import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { avOrganizationsApi, avWebQLApi } from '@availity/api-axios';
import nativeForm from '@availity/native-form';
import SupportForm from '../src/SupportForm';

jest.mock('@availity/api-axios');
jest.mock('@availity/native-form');

afterEach(cleanup);

const selectItem = async (container, getByText, name) => {
  const select = container.querySelector('.av__control');
  fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 });

  const selectOption = await waitFor(() => getByText(name));

  expect(selectOption).toBeDefined();

  fireEvent.click(selectOption);

  expect(container.querySelector('.av__option--is-selected')).toBeDefined();
  expect(select.querySelector('.av__placeholder')).toBe(null);
};

describe('SupportForm', () => {
  test('it ssos', async () => {
    const setSupportIsActive = jest.fn();
    const setBlocking = jest.fn();
    const { container, getByText, getByTestId } = render(
      <SupportForm setSupportIsActive={setSupportIsActive} setBlocking={setBlocking} />
    );

    avOrganizationsApi.postGet.mockResolvedValue({
      data: {
        organizations: [
          {
            id: 'org1',
            customerId: 'cid1',
            name: 'Org 1',
          },
          {
            id: 'org2',
            customerId: 'cid2',
            name: 'Org 2',
          },
          {
            id: 'org3',
            customerId: 'cid3',
            name: 'Org 3',
          },
          {
            id: 'org4',
            customerId: 'cid4',
            name: 'Org 4',
          },
          {
            id: 'org5',
            customerId: 'cid5',
            name: 'Org 5',
          },
        ],
      },
    });

    avOrganizationsApi.getOrganizations.mockResolvedValue({
      data: {
        totalCount: 5,
        count: 5,
        offset: 0,
        limit: 50,
        organizations: [
          {
            id: 'org1',
            customerId: 'cid1',
            name: 'Org 1',
          },
          {
            id: 'org2',
            customerId: 'cid2',
            name: 'Org 2',
          },
          {
            id: 'org3',
            customerId: 'cid3',
            name: 'Org 3',
          },
          {
            id: 'org4',
            customerId: 'cid4',
            name: 'Org 4',
          },
          {
            id: 'org5',
            customerId: 'cid5',
            name: 'Org 5',
          },
        ],
      },
    });

    avWebQLApi.create.mockResolvedValue({
      data: {
        data: {
          salesforceUser: {
            id: 'sf1',
            accountId: 'acct1',
            newCommunity: 'newComm',
          },
        },
      },
    });

    await selectItem(container, getByText, 'Org 1');

    await fireEvent.click(getByTestId('submit-btn'));

    await waitFor(() => expect(avOrganizationsApi.getOrganizations).toHaveBeenCalledTimes(1));
    expect(avWebQLApi.create).toHaveBeenCalledTimes(1);
    expect(nativeForm).toHaveBeenCalledTimes(1);

    expect(nativeForm.mock.calls[0][0]).toBe('BJx3fqX3BH');
    expect(nativeForm.mock.calls[0][1].orgGenKey).toBe('cid1');
    expect(nativeForm.mock.calls[0][1].organizationName).toBe('Org 1');
    expect(nativeForm.mock.calls[0][1].partyId).toBe('org1');
    expect(nativeForm.mock.calls[0][1].payerId).toBe('AVAILITY');
    expect(nativeForm.mock.calls[0][1].X_Client_ID).toBe('5430d59f-c5cc-4be7-be5a-34472ec30fe9');
    expect(nativeForm.mock.calls[0][1].X_XSRF_TOKEN).toBeDefined();
    expect(nativeForm.mock.calls[0][2].action).toBe('/ms/api/availity/internal/spc/magneto/sso/v1/saml/E-t_s_JQ0P');
    expect(nativeForm.mock.calls[0][2].target).toBe('_blank');
  });

  test('should render default heading as div with stylings of h5', () => {
    const { getByText } = render(<SupportForm />);

    const header = getByText('Open Support Ticket');

    expect(header.parentElement).toHaveClass('h5');
    expect(header.parentElement).toHaveAttribute('role', 'heading');
    expect(header.parentElement).toHaveAttribute('aria-level', '2');
    expect(header.tagName).toEqual('DIV');
  });
});
