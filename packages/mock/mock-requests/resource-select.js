module.exports = mock => {
  // this path is ridiculously long
  mock.post(/\/api\/v1\/my-custom-resource/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        totalCount: 3,
        count: 3,
        offset: 0,
        limit: 50,
        resources: [
          {
            id: 1,
            name: 'Option 1',
            value: 'resource1',
          },
          {
            id: 2,
            name: 'Option 2',
            value: 'resource2',
          },
          {
            id: 3,
            name: 'Option 3',
            value: 'resource3',
          },
        ],
      })
    )
  );

  mock.post(/\/api\/v1\/my-graphql-resource/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        regionPagination: {
          count: 57,
          pageInfo: {
            hasNextPage: true,
          },
          items: [
            {
              id: 1,
              value: 'New York',
            },
            {
              id: 2,
              value: 'Florida',
            },
            {
              id: 3,
              value: 'Georgia',
            },
          ],
        },
      })
    )
  );
};
