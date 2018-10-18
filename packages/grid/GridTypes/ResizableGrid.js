import PropTypes from 'prop-types';

import merge from 'merge-options-es5';

import ResizeObserver from 'resize-observer-polyfill';

import isElement from 'lodash/isElement';
import isEqual from 'lodash/isEqual';

import Grid from './Grid';
import { autoRows, autoColumns } from '../utils';

class ResizableGrid extends Grid {
  static propTypes = {
    ...Grid.propTypes,
    rowSize: PropTypes.bool,
    minColumns: PropTypes.number,
    maxColumns: PropTypes.number,
    columnWidth: PropTypes.number,
    columnsAllowed: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.bool),
      PropTypes.objectOf(PropTypes.bool),
    ]),
  };

  static defaultProps = {
    rowSize: true,
  };

  constructor(props) {
    super(props);
    this.observer = new ResizeObserver(() => {
      this.forceConfigCheck();
      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout);
      }
      this.currentTimeout = setTimeout(() => {
        this.forceConfigCheck();
        delete this.currentTimeout;
      }, 0.25 * 1000);
    });
  }

  gridRef = elm => {
    if (this.gridElm && elm !== this.gridElm) {
      this.observer.unobserve(this.gridElm);
    }
    this.gridElm = elm;
    this.observer.observe(this.gridElm);
  };

  buildFullInputConfig(props = {}, items = {}, ref) {
    const {
      columns,
      itemConfig,
      gridConfig,
      minColumns,
      maxColumns,
      columnWidth,
      columnsAllowed,
    } = props;
    const allItems = merge(itemConfig, items);
    const finalGridConfig = {
      minColumns,
      maxColumns,
      columnWidth,
      columnsAllowed,
      ref,
      ...gridConfig,
    };
    if (columns) {
      finalGridConfig.columns = columns;
    }
    return {
      grid: finalGridConfig,
      items: allItems,
    };
  }
  get inputConfig() {
    return this.getInputConfig(this.props, this.state, this.gridElm);
  }

  get preCheckBuildSteps() {
    const {
      buildSteps,
      preColumnCheckSteps,
      postColumnCheckSteps,
      rowSize,
    } = this.props;
    const propsSteps = preColumnCheckSteps || buildSteps || [];
    const output = [autoColumns, ...propsSteps];
    if (
      rowSize &&
      postColumnCheckSteps &&
      !Array.isArray(postColumnCheckSteps)
    ) {
      output.push(autoRows);
    }
    return output;
  }

  get postCheckBuildSteps() {
    const { postColumnCheckSteps, rowSize } = this.props;
    if (rowSize) {
      return Array.isArray(postColumnCheckSteps)
        ? [autoRows, ...postColumnCheckSteps]
        : [autoRows];
    }
    return postColumnCheckSteps;
  }

  get buildSteps() {
    return [autoRows, ...this.props.buildSteps];
  }

  componentDidUpdate(prevProps, prevState) {
    const oldKeys = Object.keys(prevState);
    const newKeys = Object.keys(this.state);

    // TODO props stuff
    const removedKeys = oldKeys.filter(key => newKeys.indexOf(key) < 0);
    removedKeys.forEach(key => {
      const item = prevState[key];
      const elm = (item.ref && item.ref.current) || item.ref;
      if (isElement(elm)) {
        this.observer.unobserve(elm);
      }
    });

    newKeys.forEach(key => {
      const oldItem = prevState[key];
      const oldElm =
        oldItem &&
        oldItem.ref &&
        (isElement(oldItem.ref) ? oldItem.ref : oldItem.ref.current);
      const newItem = this.state[key];
      const newElm = isElement(newItem.ref) ? newItem.ref : newItem.ref.current;

      if (!isEqual(newElm, oldElm) && isElement(oldElm)) {
        this.observer.unobserve(oldElm);
      }
      if (isElement(newElm)) {
        this.observer.observe(newElm);
      }
    });
  }
}

export default ResizableGrid;
