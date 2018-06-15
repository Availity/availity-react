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
        <AvForm {...this.props} onSubmit={this.onSubmit} />
        <hr />
        {this.state.submitted && (
          <div>
            <p>Results (submitted {this.state.submitted}):</p>
            <p>Errors: {this.state.errors}</p>
            <p>
              Values: <pre>{this.state.values}</pre>
            </p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AvFormResult;
