export function scan(file, headers = {}, uppy) {
  return new Promise((resolve, reject) => {
    const xhr = new window.XMLHttpRequest();

    xhr.open('HEAD', file.uploadURL, true);
    xhr.setRequestHeader('Tus-Resumable', '1.0.0');

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = () => {
      if (Math.floor(xhr.status / 100) !== 2) {
        return reject(xhr);
      }

      const result = xhr.getResponseHeader('AV-Scan-Result');

      if (result === 'accepted') {
        const referencesHeader = xhr.getResponseHeader('references');
        if (referencesHeader) {
          const reference = JSON.parse(referencesHeader)[0];
          const resultingFile = {
            ...file,
            reference,
          };
          if (uppy) {
            uppy.emit('file-scan-success', resultingFile);
            uppy.emit('file-scan-complete', resultingFile);
            uppy.setFileState(file.id, {
              reference,
              scanning: false,
              scanResult: result,
              scanProgress: 100,
            });
          }
          return resolve(resultingFile);
        }
        if (uppy) {
          uppy.emit('file-scan-complete', file);
          uppy.emit('file-scan-error', {
            request: xhr,
            file,
            error: 'File scan response invalid',
          });
          uppy.setFileState(file.id, {
            scanning: false,
            scanResult: 'invalid',
            scanProgress: 100,
          });
        }
        return reject(new Error('File upload response invalid'));
      }

      if (result === 'rejected') {
        if (uppy) {
          uppy.emit('file-scan-complete', file);
          uppy.emit('file-scan-error', {
            request: xhr,
            file,
            error: 'File upload rejected',
          });
          uppy.setFileState(file.id, {
            scanning: false,
            scanResult: result,
            scanProgress: 100,
          });
        }
        return reject(new Error('File upload rejected'));
      }

      if (uppy) {
        uppy.setFileState(file.id, {
          scanProgress:
            parseInt(xhr.getResponseHeader('AV-Scan-Bytes'), 10) / file.size,
        });
      }

      setTimeout(() => {
        resolve(scan(file, headers, uppy));
      }, 200);
    };

    xhr.onerror = err => {
      if (uppy) {
        uppy.emit('file-scan-complete', file);
        uppy.emit('file-scan-error', {
          request: xhr,
          file,
          error: 'Network Error',
        });
        uppy.setFileState(file.id, {
          scanning: false,
          scanResult: 'Network Error',
        });
      }
      reject(new Error(err));
    };

    xhr.send(null);
  });
}

export function getScanResults(files, headers, uppy) {
  if (uppy) {
    uppy.setState({ scanning: true });
    uppy.emit('scan-start', files);
  }

  return Promise.all(
    files.map(file => {
      if (uppy) {
        uppy.emit('file-scan-start', file);
        uppy.setFileState(file.id, { scanning: true, scanProgress: 0 });
      }
      return scan(file, headers, uppy);
    })
  ).then(files => {
    if (uppy) {
      uppy.setState({ scanning: false });
      uppy.emit('scan-success', files);
    }
    return files;
  });
}
