import React from 'react';
import PropTypes from 'prop-types';

const emptyState = '···';

const BreadcrumbsSpaces = ({ spaceName, spaceId, pageName }) => (
  <ul className="breadcrumb">
    <li className="breadcrumb-item">
      <a href="/public/apps/dashboard" target="newBody">
        Home
      </a>
    </li>

    <li className="breadcrumb-item">
      {spaceName ? (
        <a href={`/web/spaces/spaces/#/${spaceId}`}>{spaceName}</a>
      ) : (
        <span>{emptyState}</span>
      )}
    </li>

    <li className="breadcrumb-item active">{pageName || emptyState}</li>
  </ul>
);

BreadcrumbsSpaces.propTypes = {
  spaceId: PropTypes.string,
  spaceName: PropTypes.string,
  pageName: PropTypes.string.isRequired,
};

export default BreadcrumbsSpaces;
