import React from 'react';
import PropTypes from 'prop-types';
import { spacesApi } from '@availity/api-axios';

import AvBreadcrumbsSpaces from './AvBreadcrumbsSpaces';

class AvBreadcrumbsSpacesContainer extends React.Component {
  async componentWillMount() {
    const spaceId =
      this.props.spaceId || spacesApi.parseSpaceId(window.location.search);
    const spaceName = await spacesApi.getSpaceName(this.props.spaceId);
    this.setState({
      spaceName,
      spaceId,
    });
  }

  render() {
    return <AvBreadcrumbsSpaces {...this.props} {...this.state} />;
  }
}

AvBreadcrumbsSpacesContainer.propTypes = {
  pageName: PropTypes.string.isRequired,
  spaceId: PropTypes.string,
};

export default AvBreadcrumbsSpacesContainer;
