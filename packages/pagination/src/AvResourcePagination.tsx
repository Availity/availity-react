import React from 'react';

import Pagination from './Pagination';

type Resource<TData> = {
  postGet: (
    request: { limit: number; offset: number } & Record<string, unknown>,
    config: Record<string, unknown>
  ) => Promise<{ data: TData & { totalCount: number } }>;
  getResult: string | ((result: TData) => unknown[]);
};

export type AvResourcePaginationProps<TData> = {
  getResult: string | ((result: TData) => unknown[]);
  children: React.ReactNode;
  itemsPerPage?: number;
  parameters?: { params?: Record<string, unknown> } & Record<string, unknown>;
  resource: Resource<TData>;
};

const AvResourcePagination = <TData,>({
  parameters = {},
  resource,
  getResult,
  children,
  ...paginationProps
}: AvResourcePaginationProps<TData>): JSX.Element => {
  const loadPage = async (page: number, itemsPerPage: number) => {
    const params = {
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      ...(parameters.params || {}),
    };

    const resp = await resource.postGet(params, parameters || {});

    const useGetResult = getResult || resource.getResult;

    const items =
      (typeof useGetResult === 'function'
        ? useGetResult.call(resource, resp.data)
        : (resp.data as Record<string, unknown>)[useGetResult]) || resp.data;

    if (!Array.isArray(items)) {
      throw new TypeError(
        `Expected data to be an array but got \`${typeof items}\`. Use the \`getResult\` prop to specify how to get the data from the API response.`
      );
    }

    return {
      items,
      totalCount: resp.data.totalCount,
    };
  };

  return (
    <Pagination {...paginationProps} items={(page, itemsPerPage) => loadPage(page, itemsPerPage)}>
      {children}
    </Pagination>
  );
};

export default AvResourcePagination;
