import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DefaultLoader from './Loader';
import safeActiveElement from './safeActiveElement';

const BlockUi = ({
  tag: Tag,
  blocking,
  className,
  children,
  message,
  loader: Loader,
  renderChildren,
  keepInView,
  ...attributes
}) => {
  const [top, setTop] = useState('50%');
  const helper = useRef();
  const blocker = useRef();
  const topFocus = useRef();
  const container = useRef();
  const messageContainer = useRef();

  const keepInViewFunc = () => {
    console.log('keep in view?');
    if (blocking && keepInView && container && container.current) {
      console.log('Container', container);
      const containerBounds = container.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (containerBounds.top > windowHeight || containerBounds.bottom < 0)
        return;
      if (containerBounds.top >= 0 && containerBounds.bottom <= windowHeight) {
        if (top !== '50%') {
          setTop('50%');
        }
        return;
      }

      const messageBoundsHeight = messageContainer
        ? messageContainer.getBoundingClientRect().height
        : 0;
      let top =
        Math.max(
          Math.min(windowHeight, containerBounds.bottom) -
            Math.max(containerBounds.top, 0),
          messageBoundsHeight
        ) / 2;
      if (containerBounds.top < 0) {
        top = Math.min(
          top - containerBounds.top,
          containerBounds.height - messageBoundsHeight / 2
        );
      }
      setTop(top);
    }
  };

  const attachListeners = () => {
    window.addEventListener('scroll', keepInViewFunc);
  };

  const detachListeners = () => {
    window.removeEventListener('scroll', keepInViewFunc);
  };

  // effects
  useEffect(() => {
    if (
      blocking &&
      helper &&
      helper.parentNode &&
      helper.parentNode.contains &&
      helper.parentNode.contains(safeActiveElement())
    ) {
      const focused = safeActiveElement();

      if (focused && focused !== document.body) {
        (window.setImmediate || setTimeout)(
          () => focused && typeof focused.blur === 'function' && focused.blur()
        );
      }

      return () => {
        detachListeners();

        const ae = safeActiveElement();
        if (focused && (!ae || ae === document.body || ae === topFocus)) {
          if (typeof focused.focus === 'function') {
            focused.focus();
          }
          focused = null;
        }
      };
    }
  }, [blocking]);

  useEffect(() => {
    if (keepInView !== undefined) {
      attachListeners();
      keepInViewFunc();
      return detachListeners;
    }
  }, [keepInView, blocking]);

  const classes = blocking ? `block-ui ${className}` : className;
  const renderChilds = !blocking || renderChildren;

  const blockingTab = (e, withShift = false) =>
    blocking && (e.key === 'Tab' || e.keyCode === 9) && e.shiftKey == withShift;

  const tabbedUpTop = e => blockingTab(e) && blocker.focus();

  const tabbedDownTop = e => {
    if (blockingTab(e)) {
      e.preventDefault();
      blocker.focus();
    }
  };

  const tabbedUpBottom = e => blockingTab(e, true) && topFocus.focus();

  const tabbedDownBottom = e => {
    if (blockingTab(e, true)) {
      e.preventDefault();
      topFocus.focus();
    }
  };

  return (
    <Tag {...attributes} className={classes} aria-busy={blocking}>
      {blocking && (
        <div
          tabIndex="0"
          onKeyUp={tabbedUpTop}
          onKeyDown={tabbedDownTop}
          ref={topFocus}
        />
      )}
      {renderChilds && children}
      {blocking && (
        <div
          className="block-ui-container"
          tabIndex="0"
          ref={blocker}
          onKeyUp={tabbedUpBottom}
          onKeyDown={tabbedDownBottom}
        >
          <div className="block-ui-overlay" ref={container} />
          <div
            className="block-ui-message-container"
            ref={messageContainer}
            style={{ top: keepInView ? top : undefined }}
          >
            <div className="block-ui-message">
              {message}
              {React.isValidElement(Loader) ? Loader : <Loader />}
            </div>
          </div>
        </div>
      )}
      <span ref={helper} />
    </Tag>
  );
};

BlockUi.propTypes = {
  blocking: PropTypes.bool,
  children: PropTypes.node,
  renderChildren: PropTypes.bool,
  keepInView: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
  ]),
};
BlockUi.defaultProps = {
  tag: 'div',
  renderChildren: true,
  loader: DefaultLoader,
};

export default BlockUi;
