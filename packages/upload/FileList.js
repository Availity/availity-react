import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import FileRow from './FileRow';

class FileList extends Component {
  static propTypes = {
    files: PropTypes.array,
    children: PropTypes.func,
    onRemoveFile: PropTypes.func,
  };

  render() {
    const { files, children } = this.props;

    const list = files.map(file => (
      <FileRow key={file.id} file={file} onRemove={this.props.onRemoveFile}>
        {children}
      </FileRow>
    ));

    if (typeof children === 'function') {
      return list;
    }

    return files.length > 0 ? (
      <Table size="sm" hover style={{ tableLayout: 'fixed' }}>
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
  }
}

export default FileList;
