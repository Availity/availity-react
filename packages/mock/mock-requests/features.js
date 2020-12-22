const features = require('../data/features.json');

export default (mock) => {
  mock.get('features.json', (req, res) =>
    res.status(200).body(window.JSON.stringify(features))
  );
};
