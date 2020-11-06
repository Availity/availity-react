import axiUserPermissions from '../data/legacy-permissions.json';

export default (mock) => {
  mock.get(/\/api\/internal\/v1\/axi-user-permissions.*/, (req, res) => {
    const { query } = req.url();
    const offset = Number.parseInt(query.offset, 10) || 0;
    const limit = Number.parseInt(query.limit, 10) || 50;
    return res.status(200).body(
      window.JSON.stringify({
        totalCount: axiUserPermissions.length,
        count: axiUserPermissions.length,
        offset,
        limit,
        axiUserPermissions,
      })
    );
  });
};
