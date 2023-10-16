import React, { useState } from 'react';
import { StoryObj } from '@storybook/react';
import { Button, Col, Row } from 'reactstrap';

import { LoadingButton } from '.';

import '../styles.scss';

export default {
  title: 'Components/Button/Loading Button',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'This is a button component that displays a loading indicator inside of it when loading',
      },
    },
  },
};

export const _Default: StoryObj<typeof Button> = {
  render: () => {
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
  },
};
