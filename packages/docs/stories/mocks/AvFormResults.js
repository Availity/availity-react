import React, { Component } from 'react';
import { AvForm } from 'availity-reactstrap-validation';

class AvFormResult extends Component {
  state = {};

  onSubmit = (event, errors, values) => {
    this.setState({
      submitted: new Date().toJSON(),
      errors: errors.join(', '),
      values: window.JSON.stringify(values, null, 2),
    });
  };

  render() {
    return (
      <React.Fragment>
        <AvForm
          {...this.props}
          onSubmit={this.onSubmit}
          /* eslint-disable-next-line no-console */
          onInvalidSubmit={() => console.log('invalid')}
        />
        <hr />
        {this.state.submitted && (
          <div>
            <p>Results (submitted {this.state.submitted}):</p>
            <p>Errors: {this.state.errors}</p>
            <div>
              Values: <pre>{this.state.values}</pre>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AvFormResult;
