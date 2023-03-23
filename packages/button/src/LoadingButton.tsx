import React from 'react';
import BlockUi from 'react-block-ui';
import { Button } from 'reactstrap';
import type { ButtonProps } from 'reactstrap';

export type LoadingButtonProps = {
  /** This is the flag that determines whether the button is loading. If it is true, the loading panel will show. */
  isLoading: boolean;
  /** The unique id of the button item to be fetched from API. */
  id?: string;
  /** Children can be a react child or render prop. */
  children: React.ReactNode;
  /** Additional classes that should be applied to the button. */
  className?: string;
  /** This represents the button type, so either 'submit' or 'button'. Defaults to 'submit'. */
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
