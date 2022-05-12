import React from 'react';
import BlockUi from 'react-block-ui';
import { Button } from 'reactstrap';
import type { ButtonProps } from 'reactstrap';

export type LoadingButtonProps = {
  id?: string;
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  type?: string;
} & ButtonProps;

const LoadingButton = ({
  id,
  isLoading,
  className,
  children,
  type = 'submit',
  ...rest
}: LoadingButtonProps): JSX.Element => (
  <Button
    id={id}
    disabled={isLoading}
    type={type}
    className={`button ${isLoading ? 'is-loading' : ''} ${className || ''}`}
    {...rest}
  >
    <BlockUi tag="div" blocking={isLoading} keepInView />
    {!isLoading && <>{children}</>}
  </Button>
);

export default LoadingButton;
