import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import FileRow from './FileRow';

const FileList = ({
  files,
  children,
  onRemoveFile,
  onPasswordSubmit,
  ...rest
}) => {
  const list = useMemo(
    () =>
      files.map((file) => (
        <FileRow
          key={file.id}
          file={file}
          onRemove={onRemoveFile}
          onPasswordSubmit={onPasswordSubmit}
        >
          {children}
        </FileRow>
      )),
    [files, children, onRemoveFile, onPasswordSubmit]
  );

  if (typeof children === 'function') {
    return list;
  }

  return files.length > 0 ? (
    <Table size="sm" hover style={{ tableLayout: 'fixed' }} {...rest}>
      <caption className="sr-only">List of files uploaded</caption>
      <thead>
        <tr>
          <th style={{ width: '10%', border: 0 }} scope="col">
            <span className="sr-only">File Icon</span>
          </th>
          <th style={{ width: '35%', border: 0 }} scope="col">
            <span className="sr-only">File Name</span>
          </th>
          <th style={{ width: '45%', border: 0 }} scope="col">
            <span className="sr-only">Upload Progress</span>
          </th>
          <th style={{ width: '10%', border: 0 }} scope="col">
            <span className="sr-only">File Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="w-100">{list}</tbody>
    </Table>
  ) : null;
};

FileList.propTypes = {
  files: PropTypes.array,
  children: PropTypes.func,
  onRemoveFile: PropTypes.func,
  onPasswordSubmit: PropTypes.func,
};

export default FileList;
