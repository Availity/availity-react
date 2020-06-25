module.exports = mock => {
  mock.get(/\/api\/sdk\/platform\/v1\/regions.*/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        regions: [
          {
            id: 'FL',
            value: 'Florida',
            currentlySelected: true,
          },
        ],
      })
    )
  );
};
