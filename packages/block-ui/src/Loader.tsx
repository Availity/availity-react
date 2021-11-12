import React from 'react';

function Bullet(): JSX.Element {
  return <span className="loading-bullet">&bull;</span>;
}

function Loader(): JSX.Element {
  return (
    <div className="loading-indicator">
      <Bullet />
      <Bullet />
      <Bullet />
    </div>
  );
}

export default Loader;
