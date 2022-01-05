/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useRef, useState, isValidElement } from 'react';
import type { ElementType, KeyboardEvent, KeyboardEventHandler, ReactNode } from 'react';

import DefaultLoader from './Loader';
import './BlockUi.css';

export type Props = {
  blocking: boolean;
  children?: ReactNode;
  className?: string;
  keepInView?: boolean;
  loader?: JSX.Element;
  message?: string | ReactNode;
  renderChildren?: boolean;
  tag?: ElementType;
};

function BlockUi({
  blocking,
  children,
  className = '',
  keepInView,
  loader = <DefaultLoader />,
  message,
  renderChildren = true,
  tag: Tag = 'div',
}: Props): JSX.Element {
  const [top, setTop] = useState<string | number>('50%');

  const blockerRef = useRef<HTMLDivElement>(null);
  const topFocusRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

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

  // Add/Remove event listeners with handleKeepInView
  useEffect(() => {
    window.addEventListener('scroll', handleKeepInView);

    return () => {
      window.removeEventListener('scroll', handleKeepInView);
    };
  }, [handleKeepInView]);

  const blockingTab = (event: KeyboardEvent<HTMLDivElement>, withShift = false) => {
    const { key, shiftKey } = event;

    return blocking && key === 'Tab' && shiftKey === withShift;
  };

  const tabbedUpTop: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (blockerRef.current && blockingTab(event)) {
      blockerRef.current.focus();
    }
  };

  const tabbedDownTop: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (blockerRef.current && blockingTab(event)) {
      event.preventDefault();
      blockerRef.current.focus();
    }
  };

  const tabbedUpBottom: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (topFocusRef.current && blockingTab(event, true)) {
      topFocusRef.current.focus();
    }
  };

  const tabbedDownBottom: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (topFocusRef.current && blockingTab(event, true)) {
      event.preventDefault();
      topFocusRef.current.focus();
    }
  };

  // Render children when not blocking or renderChildren is true
  const shouldRenderChildren = !blocking || renderChildren;

  return (
    <Tag className={blocking ? `block-ui ${className}` : className} aria-busy={blocking}>
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
              {isValidElement(loader) ? loader : null}
            </div>
          </div>
        </div>
      ) : null}
    </Tag>
  );
}

export default BlockUi;
