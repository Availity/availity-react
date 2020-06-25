const verify = require('../data/verify.json');
const appeals = require('../data/appeals.json');
const routing = require('../data/routing.json');

module.exports = mock => {
  // this path is ridiculously long
  mock.post(
    /\/ms\/api\/availity\/internal\/overpayments-appeals\/cable\/appeals\/v1\/verify\/\d*\/\d*/,
    (req, res) => {
      const claimId = req
        .url()
        .path.split('/')
        .pop();
      const data = verify[claimId];
      return res.status(200).body(window.JSON.stringify(data));
    }
  );

  mock.put(
    /\/ms\/api\/availity\/internal\/overpayments-appeals\/cable\/appeals\/v1\/from\/\d*\/\d*/,
    (req, res) => {
      const partials = req.url().path.split('/');
      const claimId = partials.pop();
      const sessionId = partials.pop();
      const data = appeals[sessionId][claimId];
      return res.status(200).body(window.JSON.stringify(data));
    }
  );

  mock.post(
    /\/ms\/api\/availity\/internal\/overpayments-appeals\/cable\/appeals\/v1\/claim\/route*/,
    (req, res) => {
      const data = routing;
      return res.status(200).body(window.JSON.stringify(data));
    }
  );
};
