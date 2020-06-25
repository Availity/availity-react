/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import '@availity/mock';

function MyComponent() {
  return (
    <BrowserOnly
      fallback={<div>The fallback content to display on prerendering</div>}
    >
      {() => {
        import('@availity/mock');
        return null;
      }}
    </BrowserOnly>
  );
}
export default MyComponent;
