import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const watching = ['region', 'organizationId', 'customerId'];

const warned = {};

function warnOnce(message) {
  if (!warned[message]) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

class Authorize extends Component {
  static propTypes = {
    permissions: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          ),
          PropTypes.string,
          PropTypes.number,
        ])
      ),
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    region: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    organizationId: PropTypes.string,
    customerId: PropTypes.string,
    unauthorized: PropTypes.node,
    children: PropTypes.node,
    negate: PropTypes.bool,
  };

  static defaultProps = {
    region: true,
    unauthorized: null,
    children: null,
  };

  state = {
    loading: true,
  };

  async getRegion() {
    const { region } = this.props;

    if (region === true) {
      const resp = await avRegionsApi.getCurrentRegion();
      return (
        (resp &&
          resp.data &&
          resp.data.regions &&
          resp.data.regions[0] &&
          resp.data.regions[0].id) ||
        undefined
      );
    }
    if (region) {
      return region;
    }
    return undefined;
  }

  checkPermission(permission) {
    const { organizationId, customerId } = this.props;
    if (!permission) return false;

    if (organizationId) {
      if (customerId) {
        warnOnce(
          'You provided both `organizationId` and `customerId` to Authorize but both cannot be used together; `organizationId` will be used and `customerId` will be ignored. If you want to use `customerId` do not provide `organizationId`.'
        );
      }
      return (
        permission.organizations.filter(
          ({ id: orgId }) => orgId === organizationId
        ).length > 0
      );
    }

    if (customerId) {
      return (
        permission.organizations.filter(
          ({ customerId: orgCustomerId }) => orgCustomerId === customerId
        ).length > 0
      );
    }

    return true;
  }

  // TODO: Move most of this logic to avUserPermissionsApi or something more common.
  async checkPermissions() {
    const { loading } = this.state;
    const { permissions } = this.props;

    if (!loading) this.setState({ loading: true });
    const permissionsSets = Array.isArray(permissions)
      ? permissions
      : [permissions];
    const permissionsList = [].concat(...permissionsSets);
    const newPermissions = (await avUserPermissionsApi.getPermissions(
      permissionsList,
      await this.getRegion()
    )).reduce((prev, cur) => {
      prev[cur.id] = cur;
      return prev;
    }, {});

    const authorized = permissionsSets.some(permissionSet => {
      if (Array.isArray(permissionSet)) {
        return permissionSet.every(permission =>
          this.checkPermission(newPermissions[permission])
        );
      }
      return this.checkPermission(newPermissions[permissionSet]);
    });
    if (
      permissionsList.join() ===
      []
        .concat(...(Array.isArray(permissions) ? permissions : [permissions]))
        .join()
    ) {
      this.setState({ authorized, loading: false });
    }
  }

  componentDidMount() {
    this.checkPermissions();
  }

  componentDidUpdate(prevProps) {
    const { permissions } = this.props;

    if (
      // eslint-disable-next-line react/destructuring-assignment
      watching.some(propsName => prevProps[propsName] !== this.props[propsName])
    ) {
      return this.checkPermissions();
    }

    if (prevProps.permissions !== permissions) {
      if (
        typeof prevProps.permissions === 'string' ||
        typeof permissions === 'string'
      ) {
        return this.checkPermissions();
      }

      const prevPermissions = [].concat(...prevProps.permissions);
      const currentPermissions = [].concat(...permissions);
      if (
        prevPermissions.length !== currentPermissions.length ||
        prevPermissions.join() !== currentPermissions.join()
      ) {
        return this.checkPermissions();
      }
    }

    return false;
  }

  render() {
    const { loader, children, unauthorized, negate } = this.props;
    const { loading, authorized } = this.state;

    if (loading) {
      if (loader) return loader === true ? <BlockUi blocking /> : loader;
      return null;
    }
    const showChildren = authorized ^ negate; // eslint-disable-line no-bitwise
    if (showChildren) {
      return children;
    }

    return unauthorized;
  }
}

export default Authorize;
