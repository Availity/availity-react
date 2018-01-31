#### uppy-react
> Uppy wrapper with opinions around file-uploads and virus scanning with Availity.

#### Installation

```bash
npm install @availity/uppy-react uppy --save
```

#### Usage

```javascript
import React from 'react';
import AvUppyReact from '@availity/uppy-react';
import AvUppyGrill from '@availity/uppy-grill/react';

// ... 
<AvUppyReact component={AvUppyGrill} />
```

##### Props

```javascript
propTypes = {
  bucket: PropTypes.string.isRequired, // Required. Availity upload bucket ID
  customerId: PropTypes.string.isRequired, // Required. Availity customer ID
  clientId: PropTypes.string.isRequired, // Required. Availity API client ID
  component: PropTypes.func.isRequired, // Required. Underlying UI component. Can be any uppy plugin: https://uppy.io/docs/plugins/ or @availity/uppy-grill/react
  autoProceed: PropTypes.bool,
  restrictions: PropTypes.shape({ // https://uppy.io/docs/uppy/#restrictions
    maxFileSize: PropTypes.number,
    maxNumberOfFiles: PropTypes.number,
    minNumberOfFiles: PropTypes.number,
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  }),
  uppyOptions: PropTypes.object, // see https://uppy.io/docs/uppy/#Options
  tusOptions: PropTypes.object, // see https://uppy.io/docs/tus/
  getUppy: PropTypes.func, // callback passed the reference to the uppy instance used in the component
  beforeUppyRun: PropTypes.func, // callback passed the reference to the uppy instance used in the component, useful for adding additional uppy plugins before uppy.run
  headers: PropTypes.object, // additional headers to send on the requests (such as XSRF tokens)
  endpoint: PropTypes.string, // endpoint to upload to (the bucket ID is appended to this value). Defaults to Availity's resumable upload service (see defaultProps)
  chunkSize: PropTypes.number, // max upload chuck size. Used to break up larger files.
};

defaultProps = {
  endpoint: '/ms/api/availity/internal/core/vault/upload/v1/resumable',
  chunkSize: 3e6, // ~3MB
};
```

##### Manual Uploads

```javascript
import React from 'react';
import AvUppyReact from '@availity/uppy-react';
import AvUppyGrill from '@availity/uppy-grill/react';

// class extends React.Component .....

getUppyInstance = uppyInstance => {
  this.uppyInstance = uppyInstance;
} 

// this get triggered/called somewhere in your code....
doUpload = () => {
  if (this.uppyInstance) {
    this.uppyInstance.upload() // returns a promise resulting in an array of uploaded files
      .then(files => {
        // do stuff with files.
        // files[0].reference is the Availity file upload reference id. Everything else is just uppy file.
      })
  }
}
// ... 
<AvUppyReact component={AvUppyGrill} getUppy={this.getUppyInstance} />
// ...
```

##### Manual Validation

```javascript
import React from 'react';
import AvUppyReact from '@availity/uppy-react';
import AvUppyGrill from '@availity/uppy-grill/react';

// class extends React.Component .....

getUppyInstance = uppyInstance => {
  this.uppyInstance = uppyInstance;
}

// this get triggered/called somewhere in your code....
onSubmit = () => {
  if (this.uppyInstance && !this.uppyInstance.validate()) {
    // .validate() return bool. true is valid, false is invalid.
    // do something
  } else {
    // probably trigger uploads (see above) and such.
  }
}
// ... 
<AvUppyReact component={AvUppyGrill} getUppy={this.getUppyInstance} />
// ...
```
Note: validate also trigger UI updates indicating invalid fields.

##### Events
You get the instance of uppy via `getUppy` (see above) and listen for events.
This project adds more events to track the virus scanning Availity does.
Use [`uppy.on`](https://uppy.io/docs/uppy/#uppy-on-39-event-39-action) to listen for these events.
  - scan-start: event data: `files` - All uploaded files are starting to be scanned
  - scan-success:  event data: `files` - All uploaded files have been scanned
  - file-scan-start:  event data: `file` - File is starting to be scanned
  - file-scan-complete:  event data: `file` - File has finished being scanned
  - file-scan-success:  event data: `file` - File has finished being scanned, resulting in success
  - file-scan-error:  event data: details `object` - File has finished being scanned, resulting in failure