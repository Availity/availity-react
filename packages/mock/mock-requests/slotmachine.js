import space1 from '../data/space-73162546201440710195134200002269.json';
import space2 from '../data/space-73162546201441126239486200007187.json';
import availitySpacesResponse from '../data/availity-spaces-response.json';
import spaceWithDisclaimer from '../data/space-disclaimer.json';
import disclaimerSpace from '../data/slot-disclaimer.json';
import spaceMultiPayer from '../data/space-multi-payer.json';
import spaceSso from '../data/space-sso.json';

export default mock => {
  mock.post('/ms/api/availity/internal/spc/slotmachine/graphql', (req, res) => {
    let resp;
    const body = JSON.parse(req._body);

    if (body.variables && body.variables.id === 'test-disclaimer') {
      resp = disclaimerSpace;
    }

    if (body.variables && body.variables.ids) {
      if (body.variables.ids.some(id => id === 'ssoSpace')) {
        resp = spaceSso;
      } else if (body.variables.ids.some(id => id === 'disclaimerSpace')) {
        resp = spaceWithDisclaimer;
      } else if (body.variables.ids.some(id => id === 'multiPayerApp')) {
        resp = spaceMultiPayer;
      }
    }

    if (
      body.variables &&
      ((body.variables.ids && body.variables.ids.some(id => id === 'space1')) ||
        (body.variables.payerIDs &&
          body.variables.payerIDs.some(id => id === 'availity1')))
    ) {
      resp = availitySpacesResponse;
    } else if (body.variables && body.variables.payerIDs) {
      resp = space1;
    } else if (
      body.variables &&
      body.variables.id === '73162546201441126239486200007187'
    ) {
      resp = space2;
    }

    return res.status(200).body(window.JSON.stringify(resp));
  });
};
