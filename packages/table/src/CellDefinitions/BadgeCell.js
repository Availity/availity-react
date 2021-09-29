import React from 'react';

const BadgeCell = (className, value) => (
  <p className={`badge ${className}`} title={value}>
    {value}
  </p>
);

export default BadgeCell;
