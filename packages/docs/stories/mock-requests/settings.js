export default mock => {
  // this path is ridiculously long
  mock.get(/\/api\/utils\/v1\/settings/, (req, res) =>
    res.status(200).body(
      window.JSON.stringify({
        settings: [
          {
            favorites: [
              {
                id: '1234',
                pos: 0,
              },
            ],
          },
        ],
      })
    )
  );

  mock.put(/\/api\/utils\/v1\/settings/, (req, res) => {
    const favoritesUpdate = JSON.parse(req._body);
    return res.status(200).body(
      window.JSON.stringify({
        ...favoritesUpdate,
      })
    );
  });
};
