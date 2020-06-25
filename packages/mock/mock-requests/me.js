module.exports = mock => {
  // this path is ridiculously long
  mock.get(/\/api\/sdk\/platform\/v1\/users\/me/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        id: '1234',
      })
    )
  );
};
