const { delay } = require('xhr-mock');
const qs = require('qs');
const paginationData = require('../data/pagination.json');

module.exports = mock => {
  mock.post(
    /\/api\/v1\/notifications\??.*/,
    delay((req, res) => {
      const query = qs.parse(req.body());
      const offset = parseInt(query.offset, 10) || 0;
      const limit = parseInt(query.limit, 10) || 50;
      const notifications = paginationData.slice(offset, offset + limit);
      return res.status(200).body(
        window.JSON.stringify({
          totalCount: paginationData.length,
          count: notifications.length,
          offset,
          limit,
          notifications,
        })
      );
    }, 1000)
  );
};
