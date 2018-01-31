import { h as React, Component } from 'preact';
import PropTypes from 'prop-types';
import { getETA, getSpeed, prettyETA } from 'uppy/lib/core/Utils';
import { iconRetry } from 'uppy/lib/plugins/Dashboard/icons';
import FileItemProgress from 'uppy/lib/plugins/Dashboard/FileItemProgress';
import getFileTypeIcon from 'uppy/lib/plugins/Dashboard/getFileTypeIcon';
import prettyBytes from 'prettier-bytes';
import classNames from 'classnames';

const validationsFns = {
  required: value => !!value,
  date: value => /\d\d\/\d\d\/\d\d\d\d/.test(value),
};

React.createElement = React;

// most of this code was taken from https://github.com/transloadit/uppy
// MIT licence, https://github.com/transloadit/uppy/blob/master/LICENSE
// Copyright (c) 2018 Transloadit

class FileItem extends Component {
  constructor(props) {
    super(props);
    const [year, month, day] = new Date(props.file.data.lastModified)
      .toJSON()
      .split('T')[0]
      .split('-');
    this.meta = {
      lastModified: `${month}/${day}/${year}`,
      validations: {},
      touched: {},
    };

    if (this.props.metaFields) {
      this.props.metaFields.forEach(field => {
        if (field.defaultValue) {
          this.meta[field.id] =
            this.meta[field.defaultValue] || field.defaultValue;
        }
        this.meta.validations[field.id] = this.validate(
          this.meta[field.id],
          field.validation
        );
      });
    }

    this.tempStoreMetaOrSubmit = this.tempStoreMetaOrSubmit.bind(this);
    this.tempStoreMetaOnBlur = this.tempStoreMetaOnBlur.bind(this);
    this.renderMetaFields = this.renderMetaFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fileCardDone(this.meta, this.props.file.id);
  }

  componentWillReceiveProps(nextProps) {
    this.meta = nextProps.file.meta;
  }

  tempStoreMetaOrSubmit(ev) {
    const { value } = ev.target;
    const { name, index } = ev.target.dataset;
    this.meta[name] = value;
    this.props.fileCardDone(this.meta, this.props.file.id);
    this.meta.validations[name] = this.validate(
      value,
      this.props.metaFields && this.props.metaFields[index].validation
    );
    this.setState({
      [`${name}Valid`]: this.meta.validations[name],
    });
  }

  tempStoreMetaOnBlur(ev) {
    const { name } = ev.target.dataset;
    this.meta.touched[name] = true;
    this.tempStoreMetaOrSubmit(ev);
    this.setState({ [`${name}Touched`]: true });
  }

  validate(value, validations) {
    if (!validations) return true;
    const keys = Object.keys(validations);
    return (
      keys.length === 0 ||
      Object.keys(validations).every(key => {
        if (validations[key] && validationsFns[key]) {
          return validationsFns[key](value);
        }
        return true;
      })
    );
  }

  renderMetaFields(file) {
    const metaFields = this.props.metaFields || [];
    return metaFields.map((field, i) => {
      const groupClass = classNames(
        'form-group',
        file.meta.validations &&
          !file.meta.validations[field.id] &&
          file.meta.touched &&
          file.meta.touched[field.id] &&
          'text-danger has-danger'
      );
      return (
        <div className={`col col-12 col-md-${field.col || 12}`}>
          <fieldset className={groupClass}>
            <label
              htmlFor={`${file.id}${field.id}`}
              className="form-control-label"
            >
              {field.validation &&
                field.validation.required && (
                  <sup className="text-danger">*</sup>
                )}
              {field.name}
            </label>
            {field.tag === 'select' ? (
              <select
                className="form-control"
                {...field.props}
                data-name={field.id}
                data-index={i}
                id={`${file.id}${field.id}`}
                value={file.meta[field.id]}
                placeholder={field.placeholder}
                onChange={this.tempStoreMetaOrSubmit}
                onBlur={this.tempStoreMetaOnBlur}
                options={field.option}
                required={field.validate && field.validate.required}
              >
                <option value="" />
                {field.options.map(o => (
                  <option value={o[field.valueKey] || o.value || o}>
                    {o[field.labelKey] || o.label || o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form-control"
                {...field.props}
                data-name={field.id}
                data-index={i}
                id={`${file.id}${field.id}`}
                value={file.meta[field.id]}
                placeholder={field.placeholder}
                onInput={this.tempStoreMetaOrSubmit}
                onBlur={this.tempStoreMetaOnBlur}
                required={field.validate && field.validate.required}
              />
            )}
          </fieldset>
        </div>
      );
    });
  }

  handleClick() {
    this.props.fileCardDone(this.meta, this.props.file.id);
  }

  render() {
    const { props } = this;
    const { file } = props;

    const isProcessing = file.progress.preprocess || file.progress.postprocess;
    const isUploaded =
      file.progress.uploadComplete && !isProcessing && !file.error;
    const uploadInProgress =
      (file.progress.uploadStarted && !file.progress.uploadComplete) ||
      isProcessing;
    const isPaused = file.isPaused || false;
    const error = file.error || false;

    const onPauseResumeCancelRetry = () => {
      if (isUploaded) return;
      if (error) {
        props.retryUpload(file.id);
        return;
      }
      if (props.resumableUploads) {
        props.pauseUpload(file.id);
      } else {
        props.cancelUpload(file.id);
      }
    };

    const grillItemClass = classNames(
      'uppy-GrillItem',
      { 'is-inprogress': uploadInProgress },
      { 'is-processing': isProcessing },
      { 'is-complete': isUploaded },
      { 'is-paused': isPaused },
      { 'is-error': error },
      { 'is-resumable': props.resumableUploads }
    );

    return (
      <li
        className={grillItemClass}
        id={`uppy_${file.id}`}
        title={file.meta.name}
      >
        <div className="uppy-GrillItem-preview-wrapper">
          <div className="uppy-GrillItem-preview">
            <div
              className="uppy-GrillItem-previewInnerWrap"
              style={{ backgroundColor: getFileTypeIcon(file.type).color }}
            >
              {file.preview ? (
                <img alt={file.name} src={file.preview} />
              ) : (
                <div className="uppy-GrillItem-previewIconWrap">
                  <span
                    className="uppy-GrillItem-previewIcon"
                    style={{ color: getFileTypeIcon(file.type).color }}
                  >
                    {getFileTypeIcon(file.type).icon}
                  </span>
                  <svg
                    className="uppy-GrillItem-previewIconBg"
                    width="72"
                    height="93"
                    viewBox="0 0 72 93"
                  >
                    <g>
                      <path
                        d="M24.08 5h38.922A2.997 2.997 0 0 1 66 8.003v74.994A2.997 2.997 0 0 1 63.004 86H8.996A2.998 2.998 0 0 1 6 83.01V22.234L24.08 5z"
                        fill="#FFF"
                      />
                      <path
                        d="M24 5L6 22.248h15.007A2.995 2.995 0 0 0 24 19.244V5z"
                        fill="#E4E4E4"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </div>
            <div className="uppy-GrillItem-progress">
              {isUploaded ? (
                <div className="uppy-GrillItem-progressIndicator">
                  {FileItemProgress({
                    progress: file.progress.percentage,
                    fileID: file.id,
                  })}
                </div>
              ) : (
                <button
                  className="uppy-GrillItem-progressIndicator"
                  type="button"
                  title={
                    isUploaded
                      ? 'upload complete'
                      : props.resumableUploads
                        ? file.isPaused ? 'resume upload' : 'pause upload'
                        : 'cancel upload'
                  }
                  onClick={onPauseResumeCancelRetry}
                >
                  {error
                    ? iconRetry()
                    : FileItemProgress({
                        progress: file.progress.percentage,
                        fileID: file.id,
                      })}
                </button>
              )}
              {props.showProgressDetails && (
                <div
                  className="uppy-GrillItem-progressInfo"
                  title={props.i18n('fileProgress')}
                  aria-label={props.i18n('fileProgress')}
                >
                  {!file.isPaused &&
                    !isUploaded && (
                      <span>
                        {prettyETA(getETA(file.progress))} ・ ↑{' '}
                        {prettyBytes(getSpeed(file.progress))}/s
                      </span>
                    )}
                </div>
              )}
            </div>
          </div>
          <div className="uppy-GrillItem-action">
            {!isUploaded && (
              <button
                className="uppy-GrillItem-remove"
                type="button"
                aria-label="Remove file"
                title="Remove file"
                onClick={() => props.removeFile(file.id)}
              >
                <svg
                  aria-hidden="true"
                  className="UppyIcon"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="#FFF"
                    strokeWidth="1"
                    fillRule="nonzero"
                    vectorEffect="non-scaling-stroke"
                    d="M30 1C14 1 1 14 1 30s13 29 29 29 29-13 29-29S46 1 30 1z"
                  />
                  <path
                    fill="#FFF"
                    vectorEffect="non-scaling-stroke"
                    d="M42 39.667L39.667 42 30 32.333 20.333 42 18 39.667 27.667 30 18 20.333 20.333 18 30 27.667 39.667 18 42 20.333 32.333 30z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="uppy-GrillItem-fields">
          <div className="row">
            <div className="col col-12">
              <fieldset className="form-group">
                <label htmlFor={file.id} className="label">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  data-name="name"
                  id={file.id}
                  value={file.meta.name || ''}
                  placeholder="name"
                  onKeyUp={this.tempStoreMetaOrSubmit}
                  onKeyDown={this.tempStoreMetaOrSubmit}
                  onKeyPress={this.tempStoreMetaOrSubmit}
                />
              </fieldset>
            </div>
            {this.renderMetaFields(file)}
          </div>
        </div>
      </li>
    );
  }
}

FileItem.propTypes = {
  file: PropTypes.object,
  acquirers: PropTypes.object,
  isWide: PropTypes.bool,
  showProgressDetails: PropTypes.bool,
  resumableUploads: PropTypes.bool,
  i18n: PropTypes.func,
  retryUpload: PropTypes.func,
  pauseUpload: PropTypes.func,
  cancelUpload: PropTypes.func,
  showFileCard: PropTypes.func,
  removeFile: PropTypes.func,
  log: PropTypes.func,
  fileCardDone: PropTypes.func,
  metaFields: PropTypes.array,
};

export default FileItem;
