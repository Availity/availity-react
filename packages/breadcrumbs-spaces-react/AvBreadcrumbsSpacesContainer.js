import React from 'react';
import PropTypes from 'prop-types';
import { spacesApi } from '@availity/api-axios';

import AvBreadcrumbsSpaces from './AvBreadcrumbsSpaces';

class AvBreadcrumbsSpacesContainer extends React.Component {
  static propTypes = {
    pageName: PropTypes.string.isRequired,
    spaceId: PropTypes.string,
  };

  state = { pageName: this.props.pageName };

  getSpaceName(spaceId) {
    return spacesApi.getSpaceName(spaceId);
  }

  async componentDidMount() {
    const spaceId =
      this.props.spaceId || spacesApi.parseSpaceId(window.location.search);
    const spaceName = await this.getSpaceName(spaceId);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      spaceName,
      spaceId,
    });
  }

  render() {
    return <AvBreadcrumbsSpaces {...this.state} />;
  }
}

export default AvBreadcrumbsSpacesContainer;
