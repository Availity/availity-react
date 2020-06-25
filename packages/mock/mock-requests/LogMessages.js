module.exports = mock => {
  mock.post(/\/api\/v1\/log-messages.*/, (req, res) => res.status(200));
};
