import patients from '../data/patients.json';
import space1 from '../data/space-73162546201440710195134200002269.json';
import space2 from '../data/space-73162546201441126239486200007187.json';
import availitySpacesResponse from '../data/availity-spaces-response.json';

export default (mock) => {
  mock.post('/ms/api/availity/internal/spc/web/graphql', (req, res) => {
    let resp = {};
    const body = JSON.parse(req._body);

    if (body.query && body.query.indexOf('patientPagination') > -1) {
      resp = patients;
    }

    if (
      body.variables &&
      ((body.variables.filters.ids &&
        body.variables.filters.ids.some((id) => id === 'space1')) ||
        (body.variables.filters.payerIds &&
          body.variables.filters.payerIds.some((id) => id === 'availity1')))
    ) {
      resp = availitySpacesResponse;
    } else if (body.variables && body.variables.filters.payerIds) {
      resp = space1;
    } else if (body.variables && body.variables.filters.ids) {
      resp = space2;
    }

    return res.status(200).body(window.JSON.stringify(resp));
  });
};
