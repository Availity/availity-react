import React, { Component, createRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { button, boolean, number, array } from '@storybook/addon-knobs';
import mock, { proxy } from 'xhr-mock';
import { Button, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import UploadCore from '@availity/upload-core';

import Upload, {
  UploadProgressBar,
  FileList,
  FilePicker,
  FilePickerBtn,
} from '@availity/upload';

import README from '@availity/upload/README.md';
import MockUpload from '@availity/upload/tests/mockUpload';

const log = window.console.log.bind(console);

class PreUpload extends Component {
  state = {
    files: [],
  };

  form = createRef();

  addFile = (event, values) => {
    const upload = new UploadCore(values.file, {
      bucketId: 'b',
      customerId: 'c',
      clientId: 'a',
      metadata: { type: values.type },
    });
    upload.start();
    this.setState(({ files }) => ({ files: files.concat(upload) }));
    if (this.form.current) this.form.current.reset();
  };

  removeFile = id => {
    this.setState(({ files }) => ({ files: files.filter(f => f.id !== id) }));
  };

  render() {
    return (
      <div className="py-3">
        <AvForm onValidSubmit={this.addFile} ref={this.form}>
          <AvField
            label="Type"
            name="type"
            required
            type="select"
            tag={CustomInput}
          >
            <option value="">Select Type</option>
            <option>X-ray</option>
            <option>MRI</option>
            <option>CT</option>
            <option>Other</option>
          </AvField>
          <AvGroup>
            <FilePicker name="file" multiple={false} required>
              {({ file, clear }) => (
                <div>
                  {file.name}{' '}
                  <Button color="link" className="text-danger" onClick={clear}>
                    Remove
                  </Button>
                </div>
              )}
            </FilePicker>
          </AvGroup>
          <Button color="primary">Upload File</Button>
        </AvForm>
        <div className="mt-3">
          <FileList files={this.state.files} onRemoveFile={this.removeFile} />
        </div>
      </div>
    );
  }
}

mock.setup();

mock.post(
  /\/ms\/api\/availity\/internal\/core\/vault\/upload\/v1\/resumable\/[^/]\//,
  (req, res) =>
    res
      .status(201)
      .headers({
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        'transfer-encoding': 'chunked',
        location: '4611142db7c049bbbe37376583a3f46b',
      })
      .body('')
);

mock.patch(
  /\/ms\/api\/availity\/internal\/core\/vault\/upload\/v1\/resumable\/[^/]\/[^/]/,
  (req, res) =>
    res
      .status(204)
      .headers({
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        'transfer-encoding': 'chunked',
        'AV-Scan-Result': 'accepted',
        'Upload-Result': 'accepted',
        'Upload-Length': req.body().length,
        'Upload-Offset': req.header('upload-offset') + req.body().size,
        references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
      })
      .body('')
);

mock.use(
  'HEAD',
  /\/ms\/api\/availity\/internal\/core\/vault\/upload\/v1\/resumable\/[^/]\/[^/]/,
  (req, res) =>
    res
      .status(200)
      .headers({
        'tus-resumable': '1.0.0',
        'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
        'transfer-encoding': 'chunked',
        'AV-Scan-Result': 'accepted',
        'Upload-Result': 'accepted',
        'Upload-Length': '596852',
        'Upload-Offset': '596852',
        references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
      })
      .body('')
);

mock.use(proxy);

let instance;

storiesOf('Upload', module)
  .addDecorator(withReadme([README]))
  .addDecorator(story => {
    instance = new MockUpload();
    return story();
  })
  .add('default', () => (
    <div className="py-3">
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        multiple={boolean('Multiple File Select', Upload.defaultProps.multiple)}
        max={number('Max number of files', 0)}
        allowedFileTypes={array(
          'Allowed File Types',
          ['.jpg', '.jpeg', '.doc', '.docx'],
          ','
        )}
        maxSize={number('Max File Size', 0, { min: 0 }) || undefined}
      />
    </div>
  ))
  .add('picker button', () => (
    <div className="py-3">
      <p>
        This component does not do much out-of-the-box, it mostly just button
        that triggers a file input which ensures the value gets reset after a
        file is chosen so that the user can chose the same file again.
      </p>
      <FilePickerBtn
        allowedFileTypes={array('Allowed File Types', [], ',')}
        maxSize={number('Max File Size', 0, { min: 0 }) || undefined}
      />
    </div>
  ))
  .add('picker field', () => (
    <div className="py-3">
      <p>
        This component does not do much out-of-the-box, it mostly just ensures
        the value gets reset after a file is chosen so that the user can chose
        the same file again.
      </p>
      <FilePicker
        onChange={log}
        allowedFileTypes={array('Allowed File Types', [], ',')}
        maxSize={number('Max File Size', 0, { min: 0 }) || undefined}
      />
    </div>
  ))
  .add('progress bar', () => {
    button('+10%', () => instance.progress(10), 'Mock Actions');
    button('Accept', () => instance.success(), 'Mock Actions');
    button(
      'Reject',
      () => instance.error('File upload rejected'),
      'Mock Actions'
    );
    button(
      'Require Password',
      () => instance.error('Encrypted files require a password', 'encrypted'),
      'Mock Actions'
    );
    button('Reset', () => instance.reset(), 'Mock Actions');
    return (
      <div className="py-3">
        <UploadProgressBar
          upload={instance}
          animated={boolean('Animated', false)}
        />
      </div>
    );
  })
  .add('Pre-upload', () => <PreUpload />);
