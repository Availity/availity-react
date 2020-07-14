import React from 'react';
import { storiesOf } from '@storybook/react';
import { button, boolean, number, array, text } from '@storybook/addon-knobs';
import mock from 'xhr-mock';

import Upload, {
  UploadProgressBar,
  FilePicker,
  FilePickerBtn,
} from '@availity/upload';

import README from '@availity/upload/README.md';
import MockUpload from '@availity/upload/tests/mockUpload';

const log = window.console.log.bind(console);

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

// mock.use(proxy);

let instance;

storiesOf('Components|Upload', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
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
<<<<<<< HEAD
=======
        disabled={boolean('Disabled', Upload.defaultProps.disabled)}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
<<<<<<< HEAD
        This component does not do much out-of-the-box, it mostly just button
        that triggers a file input which ensures the value gets reset after a
        file is chosen so that the user can chose the same file again.
=======
        This component does not do much out-of-the-box, it is mostly just a
        button that triggers a file input which ensures the value gets reset
        after a file is chosen so that the user can choose the same file again.
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
      </p>
      <FilePickerBtn
        allowedFileTypes={array('Allowed File Types', [], ',')}
        maxSize={number('Max File Size', 0, { min: 0 }) || undefined}
<<<<<<< HEAD
=======
        disabled={boolean('Disabled', Upload.defaultProps.disabled)}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
  .add('restrict file types', () => (
    <div className="py-3">
      <p>Allows you to define which file types are available to upload.</p>
      <p>Here we have jpg, jpeg, doc and docx available to be selected.</p>
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        multiple={boolean('Multiple File Select', Upload.defaultProps.multiple)}
<<<<<<< HEAD
=======
        disabled={boolean('Disabled', Upload.defaultProps.disabled)}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
  .add('restrict file name', () => (
    <div className="py-3">
      <p>
        Allows you to restrict characters are permissible in the filename of
        uploads.
      </p>
      <p>
        Here we will allow files with any letter, number or the characters _ and
        - in its name. (-_a-zA-Z0-9)
      </p>
      <Upload
        clientId="a"
        bucketId="b"
        customerId="c"
        allowedFileNameCharacters={text('REGEX', '-_a-zA-z0-9')}
<<<<<<< HEAD
=======
        disabled={boolean('Disabled', Upload.defaultProps.disabled)}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
          striped={boolean('Striped', false)}
          complete={boolean('Complete', false)}
          color={text('Color', 'success')}
        />
      </div>
    );
  });
