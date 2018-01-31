import { h as React } from 'preact';
import PropTypes from 'prop-types';
import { dashboardBgIcon } from 'uppy/lib/plugins/Dashboard/icons';
import ActionBrowseTagline from 'uppy/lib/plugins/Dashboard/ActionBrowseTagline';
import classNames from 'classnames';
import FileItem from './FileItem';

React.createElement = React;

// most of this code was taken from https://github.com/transloadit/uppy
// MIT licence, https://github.com/transloadit/uppy/blob/master/LICENSE
// Copyright (c) 2018 Transloadit

const FileList = props => {
  const noFiles = props.totalFileCount === 0;
  const grillFilesClass = classNames('uppy-Grill-files', {
    'uppy-Grill-files--noFiles': noFiles,
  });

  return (
    <ul className={grillFilesClass}>
      {noFiles && (
        <div className="uppy-Grill-bgIcon">
          {dashboardBgIcon()}
          <h3 className="uppy-Grill-dropFilesTitle">
            <ActionBrowseTagline
              acquirers={props.acquirers}
              handleInputChange={props.handleInputChange}
              i18n={props.i18n}
            />
          </h3>
          {props.note && <p className="uppy-Grill-note">{props.note}</p>}
        </div>
      )}
      {Object.keys(props.files).map(fileID => (
        <FileItem
          acquirers={props.acquirers}
          file={props.files[fileID]}
          showFileCard={props.showFileCard}
          showProgressDetails={props.showProgressDetails}
          info={props.info}
          log={props.log}
          i18n={props.i18n}
          removeFile={props.removeFile}
          pauseUpload={props.pauseUpload}
          cancelUpload={props.cancelUpload}
          retryUpload={props.retryUpload}
          resumableUploads={props.resumableUploads}
          isWide={props.isWide}
          metaFields={props.metaFields}
          fileCardDone={props.fileCardDone}
          uppy={props.uppy}
        />
      ))}
    </ul>
  );
};

FileList.propTypes = {
  totalFileCount: PropTypes.number,
  acquirers: PropTypes.object,
  handleInputChange: PropTypes.func,
  note: PropTypes.string,
  showFileCard: PropTypes.func,
  showProgressDetails: PropTypes.func,
  info: PropTypes.func,
  i18n: PropTypes.func,
  removeFile: PropTypes.func,
  pauseUpload: PropTypes.func,
  cancelUpload: PropTypes.func,
  retryUpload: PropTypes.func,
  log: PropTypes.func,
  files: PropTypes.object,
  uppy: PropTypes.object,
  isWide: PropTypes.bool,
  fileCardDone: PropTypes.string,
  metaFields: PropTypes.array,
  resumableUploads: PropTypes.bool,
};

export default FileList;
