const { proxy } = require('xhr-mock');
const mock = require('xhr-mock').default;
const features = require('./features');
const regions = require('./regions');
const notifications = require('./notifications');
const axiUserPermissions = require('./axi-user-permissions');
const appeals = require('./appeals');
const slotmachine = require('./slotmachine');
const me = require('./me');
const settings = require('./settings');
const disclaimers = require('./disclaimers');
const webQL = require('./webQL');
const resourceSelect = require('./resource-select');
const logMessages = require('./LogMessages');
const organizations = require('./organizations');
const providers = require('./providers');

module.exports = () => {
  mock.setup();

  features(mock);

  notifications(mock);

  axiUserPermissions(mock);

  regions(mock);

  appeals(mock);

  slotmachine(mock);

  me(mock);

  settings(mock);

  disclaimers(mock);

  webQL(mock);

  resourceSelect(mock);

  logMessages(mock);

  organizations(mock);

  providers(mock);

  // keep this last
  mock.use(proxy);
};
