/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import DefaultLoader from './Loader';

import './style.css';

export type Props = {
  blocking: boolean;
  children?: React.ReactNode;
  className?: string;
  keepInView?: boolean;
  loader?: JSX.Element;
  message?: string | React.ReactNode;
  renderChildren?: boolean;
  tag?: React.ElementType;
};

function BlockUi({
  blocking,
  children,
  className,
  keepInView,
  loader = <DefaultLoader />,
  message,
  renderChildren = true,
  tag: Tag = 'div',
}: Props): JSX.Element {
  const [top, setTop] = useState<string | number>('50%');

  const helperRef = useRef<HTMLDivElement>(null);
  const blockerRef = useRef<HTMLDivElement>(null);
  const topFocusRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // TODO: make sure useCallback is actually helping
  const handleKeepInView = useCallback(() => {
    if (blocking && keepInView && containerRef.current) {
      const containerBounds = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (containerBounds.top > windowHeight || containerBounds.bottom < 0) return;

      if (containerBounds.top >= 0 && containerBounds.bottom <= windowHeight) {
        if (top !== '50%') {
          setTop('50%');
        }
        return;
      }

      const messageBoundsHeight = messageContainerRef.current
        ? messageContainerRef.current.getBoundingClientRect().height
        : 0;

      let newTop =
        Math.max(
          Math.min(windowHeight, containerBounds.bottom) - Math.max(containerBounds.top, 0),
          messageBoundsHeight
        ) / 2;

      if (containerBounds.top < 0) {
        newTop = Math.min(newTop - containerBounds.top, containerBounds.height - messageBoundsHeight / 2);
      }

      if (top !== newTop) {
        setTop(newTop);
      }
    }
  }, [blocking, keepInView, top]);

  const blockingTab = (event: React.KeyboardEvent<HTMLDivElement>, withShift = false) => {
    const { key, keyCode, shiftKey } = event;

    return blocking && (key === 'Tab' || keyCode === 9) && shiftKey === withShift;
  };

  const tabbedUpTop: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (blockerRef.current && blockingTab(event)) {
      blockerRef.current.focus();
    }
  };

  const tabbedDownTop: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (blockerRef.current && blockingTab(event)) {
      event.preventDefault();
      blockerRef.current.focus();
    }
  };

  const tabbedUpBottom: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (topFocusRef.current && blockingTab(event, true)) {
      topFocusRef.current.focus();
    }
  };

  const tabbedDownBottom: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (topFocusRef.current && blockingTab(event, true)) {
      event.preventDefault();
      topFocusRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleKeepInView);

    return () => {
      window.removeEventListener('scroll', handleKeepInView);
    };
  }, [handleKeepInView]);

  const classes = blocking ? `block-ui ${className}` : className;
  const shouldRenderChildren = !blocking || renderChildren;

  return (
    <Tag className={classes} aria-busy={blocking}>
      {blocking ? <div tabIndex={0} onKeyUp={tabbedUpTop} onKeyDown={tabbedDownTop} ref={topFocusRef} /> : null}
      {shouldRenderChildren ? children : null}
      {blocking ? (
        <div
          className="block-ui-container"
          tabIndex={0}
          ref={blockerRef}
          onKeyUp={tabbedUpBottom}
          onKeyDown={tabbedDownBottom}
        >
          <div className="block-ui-overlay" ref={containerRef} />
          <div
            className="block-ui-message-container"
            ref={messageContainerRef}
            style={{ top: keepInView ? top : undefined }}
          >
            <div className="block-ui-message">
              {message}
              {React.isValidElement(loader) ? loader : null}
            </div>
          </div>
        </div>
      ) : null}
      <span ref={helperRef} />
    </Tag>
  );
}

export default BlockUi;
