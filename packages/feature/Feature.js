import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import isFeatureEnabled from './isFeatureEnabled';

class Feature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  async checkFeatures() {
    const { loading } = this.state;
    const { features } = this.props;

    if (!loading) this.setState({ loading: true });

    const enabled = await isFeatureEnabled(features);

    this.setState({ enabled, loading: false });
  }

  componentDidMount() {
    this.checkFeatures();
  }

  componentDidUpdate(prevProps) {
    const { features } = this.props;

    if (prevProps.features !== features) {
      if (
        typeof prevProps.features === 'string' ||
        typeof features === 'string'
      ) {
        this.checkFeatures();
      } else {
        const prevFeatures = [].concat(...prevProps.features);
        const currentFeatures = [].concat(...features);
        if (
          prevFeatures.length !== currentFeatures.length ||
          prevFeatures.join() !== currentFeatures.join()
        ) {
          this.checkFeatures();
        }
      }
    }
  }

  render() {
    const { loader, children, whenDisabled, negate } = this.props;
    const { loading, enabled } = this.state;

    if (loading) {
      if (loader) return loader === true ? <BlockUi blocking /> : loader;
      return null;
    }
    const showChildren = enabled ^ negate; // eslint-disable-line no-bitwise
    if (showChildren) {
      return children;
    }

    return whenDisabled;
  }
}

Feature.propTypes = {
  features: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ])
    ),
    PropTypes.string,
  ]).isRequired,
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  whenDisabled: PropTypes.node,
  children: PropTypes.node,
  negate: PropTypes.bool,
};

Feature.defaultProps = {
  whenDisabled: null,
  children: null,
};

export default Feature;
