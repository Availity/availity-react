import patients from '../data/patients.json';

export default (mock) => {
  mock.post('/ms/api/availity/internal/spc/web/graphql', (req, res) => {
    let resp = {};
    const body = JSON.parse(req._body);

    if (body.query && body.query.indexOf('patientPagination') > -1) {
      resp = patients;
    }
    return res.status(200).body(window.JSON.stringify(resp));
  });
};
