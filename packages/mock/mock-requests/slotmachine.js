const space1 = require('../data/space-73162546201440710195134200002269.json');
const space2 = require('../data/space-73162546201441126239486200007187.json');
const availitySpacesResponse = require('../data/availity-spaces-response.json');

export default (mock) => {
  mock.post('/ms/api/availity/internal/spc/slotmachine/graphql', (req, res) => {
    let resp;
    const body = JSON.parse(req._body);
    if (
      body.variables &&
      ((body.variables.ids &&
        body.variables.ids.some((id) => id === 'space1')) ||
        (body.variables.payerIDs &&
          body.variables.payerIDs.some((id) => id === 'availity1')))
    ) {
      resp = availitySpacesResponse;
    } else if (body.variables && body.variables.payerIDs) {
      resp = space1;
    } else if (body.variables && body.variables.id) {
      resp = space2;
    }

    return res.status(200).body(window.JSON.stringify(resp));
  });
};
