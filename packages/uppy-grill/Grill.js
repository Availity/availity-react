import { h as React } from 'preact';
import PropTypes from 'prop-types';
import { isTouchDevice } from 'uppy/lib/core/Utils';
import { closeIcon } from 'uppy/lib/plugins/Dashboard/icons';
import classNames from 'classnames';
import Tabs from 'uppy/lib/plugins/Dashboard/Tabs';
import FileList from './FileList';
import './style.scss';

React.createElement = React;

// most of this code was taken from https://github.com/transloadit/uppy
// MIT licence, https://github.com/transloadit/uppy/blob/master/LICENSE
// Copyright (c) 2018 Transloadit

const renderInnerPanel = props => (
  <div style={{ width: '100%', height: '100%' }}>
    <div className="uppy-GrillContent-bar">
      <div className="uppy-GrillContent-title">
        {props.i18n('importFrom')}{' '}
        {props.activePanel ? props.activePanel.name : null}
      </div>
      <button
        className="uppy-GrillContent-back"
        type="button"
        onClick={props.hideAllPanels}
      >
        {props.i18n('done')}
      </button>
    </div>
    {props.getPlugin(props.activePanel.id).render(props.state)}
  </div>
);

renderInnerPanel.propTypes = {
  i18n: PropTypes.func,
  getPlugin: PropTypes.func,
  state: PropTypes.object,
  activePanel: PropTypes.object,
  hideAllPanels: PropTypes.func,
};

const Grill = props => {
  const GrillClassName = classNames(
    'uppy',
    'uppy-Grill',
    { 'Uppy--isTouchDevice': isTouchDevice() },
    { 'uppy-Grill--semiTransparent': props.semiTransparent },
    { 'uppy-Grill--modal': !props.inline },
    { 'uppy-Grill--wide': props.isWide }
  );

  return (
    <div
      className={GrillClassName}
      aria-hidden={props.inline ? 'false' : props.modal.isHidden}
      aria-label={
        !props.inline
          ? props.i18n('GrillWindowTitle')
          : props.i18n('GrillTitle')
      }
      onPaste={props.handlePaste}
    >
      <div
        className="uppy-Grill-overlay"
        tabIndex="-1"
        onClick={props.handleClickOutside}
      />

      <div
        className="uppy-Grill-inner"
        aria-modal={!props.inline && 'true'}
        role={!props.inline && 'dialog'}
        style={{
          maxWidth: props.inline && props.maxWidth ? props.maxWidth : '',
          maxHeight: props.inline && props.maxHeight ? props.maxHeight : '',
        }}
      >
        <button
          className="uppy-Grill-close"
          type="button"
          aria-label={props.i18n('closeModal')}
          title={props.i18n('closeModal')}
          onClick={props.closeModal}
        >
          {closeIcon()}
        </button>

        <div className="uppy-Grill-innerWrap">
          <Tabs {...props} />

          <div className="uppy-Grill-filesContainer">
            <FileList {...props} />
          </div>

          <div
            className="uppy-GrillContent-panel"
            role="tabpanel"
            id={
              props.activePanel &&
              `uppy-GrillContent-panel--${props.activePanel.id}`
            }
            aria-hidden={props.activePanel ? 'false' : 'true'}
          >
            {props.activePanel && renderInnerPanel(props)}
          </div>

          <div className="uppy-Grill-progressindicators">
            {props.progressindicators.map(target =>
              props.getPlugin(target.id).render(props.state)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Grill.propTypes = {
  closeModal: PropTypes.bool,
  activePanel: PropTypes.bool,
  state: PropTypes.object,
  progressindicators: PropTypes.array,
  i18n: PropTypes.func,
  inline: PropTypes.bool,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  handleClickOutside: PropTypes.func,
  handlePaste: PropTypes.func,
  modal: PropTypes.object,
  isWide: PropTypes.bool,
  semiTransparent: PropTypes.bool,
  getPlugin: PropTypes.func,
};

export default Grill;
