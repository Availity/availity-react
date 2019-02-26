import space1 from '../data/space-73162546201440710195134200002269.json';
import space2 from '../data/space-73162546201441126239486200007187.json';

export default mock => {
  mock.post(
    '/ms/api/availity/internal/platform/slotmachine/graphql',
    (req, res) => {
      let space;
      const body = JSON.parse(req._body);
      if (body.variables && body.variables.payerIDs) {
        space = space1;
      } else if (body.variables && body.variables.id) {
        space = space2;
      }

      return res.status(200).body(window.JSON.stringify(space));
    }
  );
};
