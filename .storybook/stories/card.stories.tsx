import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, CardProps, Button } from 'reactstrap';
import { colors } from './options';

export default {
  title: '3rd Party/Reactstrap/Card',
  parameters: {
    docs: {
      description: {
        component: 'A flexible and extensible content container with multiple variants and options.',
      },
      // page: README,
    },
    controls: {
      expanded: true,
    },
  },
};

export const CardStory = (args) => (
  <Card {...args} style={{ width: '18rem' }}>
    <img src="https://picsum.photos/300/200" alt="Sample" />
    <CardBody>
      <CardTitle tag="h5">Card title</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted">
        Card subtitle
      </CardSubtitle>
      <CardText>
        Some quick example text to build on the card title and make up the bulk of the card&lsquo;s content.
      </CardText>
      <Button>Button</Button>
    </CardBody>
  </Card>
);
CardStory.storyName = 'Card';
CardStory.args = {
  color: undefined,
  outline: false,
  inverse: false,
  body: false,
};
CardStory.argTypes = {
  color: {
    control: { type: 'select' },
    options: colors,
  },
};

export const hidden_RSCard = ({ children, ...cardProps }: CardProps): Card => <Card {...cardProps}>{children}</Card>;

export const Props = () => (
  <>
    <h4>Reactstrap Props</h4>
    <h5>Button</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSCard} />
    </div>
  </>
);
