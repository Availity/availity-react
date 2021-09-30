import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Icon from '@availity/icon';

import UploadProgressBar from './UploadProgressBar';

const fileTypeIconMap = {
  png: 'file-image',
  jpg: 'file-image',
  jpeg: 'file-image',
  gif: 'file-image',
  ppt: 'file-powerpoint',
  pptx: 'file-powerpoint',
  xls: 'file-excel',
  xlsx: 'file-excel',
  doc: 'file-word',
  docx: 'file-word',
  txt: 'doc-alt',
  text: 'doc-alt',
  zip: 'file-archive',
  '7zip': 'file-archive',
  xml: 'file-code',
  html: 'file-code',
  pdf: 'file-pdf',
};

const FileRow = ({ onRemove, children, file }) => {
  const remove = () => {
    onRemove(file.id);
  };

  const progressBar = () => <UploadProgressBar upload={file} />;

  const ext = file.file.name.split('.').pop().toUpperCase();

  const icon = fileTypeIconMap[ext.toLowerCase()] || 'doc';

  if (typeof children === 'function') {
    return children({
      file,
      metadata: file.options.metadata,
      name: file.file.name,
      remove,
      ext,
      icon,
      progressBar,
    });
  }

  return (
    <tr>
      <td className="align-middle" style={{ width: '10%' }}>
        <Icon name={icon} title={`${ext} File Icon`}>
          <span className="sr-only">{ext} File Icon</span>
        </Icon>{' '}
      </td>
      <td className="align-middle" style={{ width: '35%' }}>
        <div className="text-truncate" title={file.file.name}>
          {file.file.name}
        </div>
      </td>
      <td className="align-middle" style={{ width: '45%' }}>
        <UploadProgressBar upload={file} />
      </td>
      <td className="align-middle" style={{ width: '10%' }}>
        <Button data-testid="remove-file-btn" color="link" className="text-danger px-0" onClick={remove}>
          <Icon name="trash-empty">
            <span className="sr-only">
              Remove
              {file.file.name}
            </span>
          </Icon>
        </Button>
      </td>
    </tr>
  );
};

FileRow.propTypes = {
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.func,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    options: PropTypes.object,
  }),
};

export default FileRow;
