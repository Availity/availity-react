import React, { Component } from 'react';
import PropTypes from 'prop-types';

import memoize from 'memoize-one';

import merge from 'merge-options-es5';

import isEqual from 'lodash/isEqual';

import { buildGrid } from '../utils';

import { GridUpdaterContext, GridCardContext } from '../constants';

const { Provider: GridUpdaterProvider } = GridUpdaterContext;
const { Provider: GridCardProvider } = GridCardContext;

class Grid extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    // not sure how to get linter to recognize these props are used
    /* eslint-disable react/no-unused-prop-types */
    columns: PropTypes.number,
    itemConfig: PropTypes.object, // config for grid items
    gridConfig: PropTypes.object, // config for grid values, overritten by specific props
    /* eslint-enable react/no-unused-prop-types */
    buildSteps: PropTypes.arrayOf(PropTypes.func),
    preColumnCheckSteps: PropTypes.arrayOf(PropTypes.func),
    postColumnCheckSteps: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.func),
      PropTypes.bool,
    ]),
  };

  static defaultProps = {
    itemConfig: {},
    buildSteps: [],
  };

  // state is items
  state = {};

  // used to update the config from the providers and then check the values
  updateProviderGridConfig = (id, config) => {
    const item = this.state[id];
    if (isEqual(item, config)) {
      return;
    }
    this.setState({ [id]: config });
  };

  buildFullInputConfig(props = {}, items = {}) {
    const { columns, itemConfig, gridConfig } = props;
    const allItems = merge(itemConfig, items);
    const finalGridConfig = { ...gridConfig };
    if (columns) {
      finalGridConfig.columns = columns;
    }
    return {
      grid: finalGridConfig,
      items: allItems,
    };
  }
  getInputConfig = memoize(this.buildFullInputConfig, isEqual);

  get inputConfig() {
    return this.getInputConfig(this.props, this.state);
  }

  getFinalConfig = memoize(buildGrid, isEqual);

  get preCheckBuildSteps() {
    return this.props.preColumnCheckSteps || this.props.buildSteps;
  }

  get postCheckBuildSteps() {
    return this.props.postColumnCheckSteps;
  }

  get finalConfig() {
    return this.getFinalConfig(
      this.inputConfig,
      this.preCheckBuildSteps,
      this.postCheckBuildSteps
    );
  }

  forceConfigCheck() {
    this.buildFullInputConfig();
    this.getFinalConfig();
    this.forceUpdate();
  }

  buildStyles = memoize((style, grid) => {
    const {
      columns,
      rows,
      columnSize = '1fr',
      rowSize = '1fr',
      gridGap,
    } = grid;
    const output = merge(style, {
      display: 'grid',
      gridGap,
      gridTemplateColumns: `repeat(${columns}, ${columnSize})`,
      gridAutoRows: rowSize,
      gridAutoFlow: 'dense',
    });
    if (rows) {
      output.gridTemplateRows = `repeat(${rows}, ${rowSize})`;
    }

    return output;
  }, isEqual);

  render() {
    const config = this.finalConfig;
    const { grid, items } = config;

    const gridStyle = this.buildStyles(this.props.style, grid);

    let useClassName = 'AvGrid';
    if (this.props.className) {
      useClassName += ` ${this.props.className}`;
    }

    return (
      <div className={useClassName} style={gridStyle} ref={this.gridRef}>
        <GridUpdaterProvider value={this.updateProviderGridConfig}>
          <GridCardProvider value={items}>
            {this.props.children}
          </GridCardProvider>
        </GridUpdaterProvider>
      </div>
    );
  }
}

export default Grid;
