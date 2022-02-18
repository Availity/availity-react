import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';
import LoadingButton from '../src';

import '../styles.scss';

export default {
  title: 'Components/Button/Loading Button',
} as Meta;

export const Default: Story = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toggle = () => {
    setIsLoading(!isLoading);
  };

  return (
    <>
      <Button color="secondary" onClick={toggle}>
        Toggle Is Loading
      </Button>
      <hr />
      <Row>
        <Col md="3">
          <LoadingButton block disabled isLoading={isLoading} color="primary">
            Test
          </LoadingButton>
        </Col>
        <Col md="3">
          <LoadingButton block disabled isLoading={isLoading} color="light">
            Test
          </LoadingButton>
        </Col>
        <Col md="3">
          <LoadingButton block disabled isLoading={isLoading} color="secondary">
            Test
          </LoadingButton>
        </Col>
      </Row>
    </>
  );
};

Default.storyName = 'default';
