import React from 'react';
import BlockUi from 'react-block-ui';
import { Button, ButtonProps } from 'reactstrap';

type Props = {
  id?: string;
  isLoading: boolean;
  children: string;
  className?: React.ReactChild;
  type?: string;
} & ButtonProps;

const LoadingButton = ({ id, isLoading, className, children, type, ...rest }: Props): JSX.Element => (
  <Button
    data-testid="loading_button"
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

LoadingButton.defaultProps = {
  type: 'submit',
};

export default LoadingButton;
