import React, { useState, useEffect } from 'react';
import { Tooltip as RSTooltip, TooltipProps } from 'reactstrap';

const Tooltip = ({ placement = 'auto', children, ...rest }: TooltipProps): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltipOpen = () => setTooltipOpen(!tooltipOpen);
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Escape') setTooltipOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  return (
    <RSTooltip autohide={false} isOpen={tooltipOpen} placement={placement} toggle={toggleTooltipOpen} {...rest}>
      {children}
    </RSTooltip>
  );
};

export default Tooltip;
