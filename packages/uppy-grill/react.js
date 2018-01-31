import React from 'react';
import PropTypes from 'prop-types';
import { Uppy as UppyCore } from 'uppy/lib/core/Core';
import GrillPlugin from './index';

// most of this code was taken from https://github.com/transloadit/uppy
// MIT licence, https://github.com/transloadit/uppy/blob/master/LICENSE
// Copyright (c) 2018 Transloadit

class Grill extends React.Component {
  componentDidMount() {
    const { uppy, inline } = this.props;
    const options = Object.assign({}, this.props, {
      inline,
      target: this.container,
    });
    delete options.uppy;
    uppy.use(GrillPlugin, options);

    this.plugin = uppy.getPlugin('Grill');
  }

  componentWillUnmount() {
    const { uppy } = this.props;

    uppy.removePlugin(this.plugin);
  }

  render() {
    return (
      <div
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}

Grill.propTypes = {
  uppy: PropTypes.instanceOf(UppyCore).isRequired,
  inline: PropTypes.bool,
};
Grill.defaultProps = {
  inline: true,
};

export default Grill;
