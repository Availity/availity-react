import React from 'react';

import './Loader.css';

export function Bullet(): React.JSX.Element {
  return <span className="loading-bullet">&bull;</span>;
}

function Loader(): React.JSX.Element {
  return (
    <div className="loading-indicator">
      <Bullet />
      <Bullet />
      <Bullet />
    </div>
  );
}

export default Loader;
