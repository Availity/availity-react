#### uppy-grill

> Uppy Plugin based on [uppy's Dashboard Plugin](https://uppy.io/docs/dashboard/) that changes the layout and provides enhanced form capabilities

#### Installation

```bash
npm install @availity/uppy-grill--save
```

#### Usage

```javascript
import Uppy from 'uppy';
import Grill from '@availity/uppy-grill';

const uppy = Uppy({
  // optional uppy options. See https://uppy.io/docs/uppy/
});

uppy.use(Grill, {
  // See https://uppy.io/docs/plugins/#Common-Options
  target: 'body',
  trigger: '#uppy-select-files',
  inline: false,
  maxWidth: 750,
  maxHeight: 550,
  semiTransparent: false,
  showProgressDetails: false,
  hideUploadButton: false,
  hideProgressAfterFinish: false,
  note: null,
  metaFields: [
    {
      id: 'string',
      name: 'string', // field's label
      tag: 'string', // select or text. Default text
      placeholder: 'string',
      defaultValue: 'string', // if 'lastModified' it will be the last modified date of the file, else it will be the string provided
      col: 12, // number of columns wide the field should be based on the bootstrap 12 column layout
      validate: {
        required: false, // makes the field required
        date: false, // performs basic mm/dd/yyyy date validation
      },
      options: [
        // only used when tag is 'select'. The options which will appear in the select dropdown.
        {
          label: 'string',
          value: 'string',
        },
        // ...
      ],
    },
  ],
  closeModalOnClickOutside: false,
  disableStatusBar: false,
  disableInformer: false,
  locale: {
    strings: {
      selectToUpload: 'Select files to upload',
      closeModal: 'Close Modal',
      upload: 'Upload',
      importFrom: 'Import files from',
      dashboardWindowTitle: 'Uppy Dashboard Window (Press escape to close)',
      dashboardTitle: 'Uppy Dashboard',
      copyLinkToClipboardSuccess: 'Link copied to clipboard.',
      copyLinkToClipboardFallback: 'Copy the URL below',
      fileSource: 'File source',
      done: 'Done',
      localDisk: 'Local Disk',
      myDevice: 'My Device',
      dropPasteImport:
        'Drop files here, paste, import from one of the locations above or',
      dropPaste: 'Drop files here, paste or',
      browse: 'browse',
      fileProgress: 'File progress: upload speed and ETA',
      numberOfSelectedFiles: 'Number of selected files',
      uploadAllNewFiles: 'Upload all new files',
      emptyFolderAdded: 'No files were added from empty folder',
      folderAdded: {
        0: 'Added %{smart_count} file from %{folder}',
        1: 'Added %{smart_count} files from %{folder}',
      },
    },
  },
});
```

#### Prior Art

uppy-grill is based on and mostly copied from [uppy's Dashboard Plugin](https://uppy.io/docs/dashboard/).
uppy-grill changes the layout and provides enhanced form capabilities but most of the work is uppy's Dashboard Plugin
