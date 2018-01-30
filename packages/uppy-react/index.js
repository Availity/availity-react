import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Uppy from 'uppy/lib/core';
import Tus from 'uppy/lib/plugins/Tus';
import { getScanResults } from './scan';

class AvUppy extends Component {
  componentWillMount() {
    this.uppy = Uppy({
      autoProceed: this.props.autoProceed,
      restrictions: this.props.restrictions,
      ...this.props.uppyOptions,
    });
    this.uppy.use(Tus, {
      endpoint: `${this.props.endpoint}/${this.props.bucket}/`,
      headers: this.headers(),
      chunkSize: this.props.chunkSize,
      ...this.props.tusOptions,
    });

    if (this.props.beforeUppyRun) {
      this.props.beforeUppyRun(this.uppy);
    }

    this.uppy.run();

    this.uppy.rawUpload = this.upload;
    this.uppy.upload = this.upload;
    this.uppy.validate = this.validate;

    if (this.props.getUppy) {
      this.props.getUppy(this.uppy);
    }
  }

  upload = () =>
    this.uppy
      .rawUpload()
      .then(result =>
        getScanResults(result.successful, this.headers(), this.uppy)
      );

  validate = () => {
    const { files } = this.uppy.getState();
    if (!files) return true;
    const instance = Object.keys(files).map(fileId => {
      const touched = {};
      const ret = Object.keys(files[fileId].meta.validations)
        .map(field => {
          touched[field] = true;
          return files[fileId].meta.validations[field];
        })
        .every(v => v);
      this.uppy.setFileMeta(fileId, { touched });
      return ret;
    });
    return instance.every(v => v);
  };

  headers() {
    return {
      ...this.props.headers,
      'X-Availity-Customer-ID': this.props.customerId,
      'X-Client-ID': this.props.clientId,
    };
  }

  componentWillUnmount() {
    this.uppy.reset();
    if (this.props.getUppy) {
      this.props.getUppy(null);
    }
  }

  render() {
    const {
      component: Tag,
      bucket,
      customerId,
      clientId,
      uppyOptions,
      getUppy,
      ...props
    } = this.props;
    return <Tag uppy={this.uppy} {...props} />;
  }
}

AvUppy.propTypes = {
  bucket: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  autoProceed: PropTypes.bool,
  restrictions: PropTypes.shape({
    maxFileSize: PropTypes.number,
    maxNumberOfFiles: PropTypes.number,
    minNumberOfFiles: PropTypes.number,
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  }),
  uppyOptions: PropTypes.object,
  tusOptions: PropTypes.object,
  getUppy: PropTypes.func,
  beforeUppyRun: PropTypes.func,
  headers: PropTypes.object,
  endpoint: PropTypes.string,
  chunkSize: PropTypes.number,
};

AvUppy.defaultProps = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 3e6, // ~3MB
};

export default AvUppy;
