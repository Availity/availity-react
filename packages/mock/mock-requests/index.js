import mock, { proxy } from 'xhr-mock';

import appeals from './appeals';
import axiUserPermissions from './axi-user-permissions';
import disclaimers from './disclaimers';
import features from './features';
import logMessages from './LogMessages';
import me from './me';
import notifications from './notifications';
import organizations from './organizations';
import permissions from './permissions';
import providers from './providers';
import regions from './regions';
import resourceSelect from './resource-select';
import settings from './settings';
import slotmachine from './slotmachine';
import webQL from './webQL';

export default () => {
  mock.setup();

  appeals(mock);
  axiUserPermissions(mock);
  disclaimers(mock);
  features(mock);
  logMessages(mock);
  me(mock);
  notifications(mock);
  organizations(mock);
  permissions(mock);
  providers(mock);
  regions(mock);
  resourceSelect(mock);
  settings(mock);
  slotmachine(mock);
  webQL(mock);

  // keep this last
  mock.use(proxy);
};
