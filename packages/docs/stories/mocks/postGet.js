import mock from 'xhr-mock';
import search from './search';
mock.setup();

export default (url, key, fields, data) => {
  const find = search(fields, data);

  mock.post(url, (req, res) => {
    const params = req
      .body()
      .split('&')
      .reduce((prev, cur) => {
        const [key, value] = cur.split('=');
        prev[key] = value;
        return prev;
      }, {});
    const offset = parseInt(params.offset) || 0;
    const limit = parseInt(params.limit) || 50;
    const list = find(params.q).slice(offset, offset + limit);
    return res.status(200).body(
      JSON.stringify({
        totalCount: data.length,
        count: list.length,
        offset,
        limit,
        [key]: list,
      })
    );
  });
};
