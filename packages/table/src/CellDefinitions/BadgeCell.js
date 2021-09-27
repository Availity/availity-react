import React from 'react';

const BadgeCell = (className, value) => (
  <p className={`badge ${className}`}>{value}</p>
);

export default BadgeCell;
