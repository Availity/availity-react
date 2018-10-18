import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleGridItem from './Component';

import contextWrapper from './contextWrapper';

class GridItem extends Component {
  static propTypes = {
    gridId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    column: PropTypes.number,
    row: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    itemConfig: PropTypes.object,
    updateItem: PropTypes.func,
    gridValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.childRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.gridId !== prevProps.gridId) {
      this.removeFromGrid(prevProps.gridId);
    }
    this.updateGrid();
  }

  getItemObj(props = this.props) {
    const output = props.itemConfig || {};
    ['column', 'row', 'width', 'height', 'ignoreHeight'].forEach(key => {
      const prop = props[key];
      if (typeof prop !== 'undefined') {
        output[key] = prop;
      }
    });
    output.ref = this.childRef;
    return output;
  }

  removeFromGrid(gridId = this.props.gridId) {
    if (this.props.updateItem) {
      this.props.updateItem(gridId, false);
    }
  }

  updateGrid() {
    if (this.props.updateItem) {
      const { gridId } = this.props;
      this.props.updateItem(gridId, this.getItemObj());
    }
  }

  render() {
    const ignoreProps = [
      'column',
      'row',
      'width',
      'height',
      'gridId',
      'updateItem',
      'gridValues',
      'itemConfig',
    ];
    const { gridValues } = this.props;
    const props = Object.keys(this.props).reduce((output, key) => {
      const value = ignoreProps.indexOf(key) < 0 && this.props[key];
      if (value) {
        output[key] = value;
      }
      return output;
    }, {});

    const cardValues = gridValues[this.props.gridId] || {};
    return (
      <SimpleGridItem
        {...props}
        {...cardValues}
        ref={this.childRef}
        zeroIndexed
      />
    );
  }
}

export default contextWrapper(GridItem);
