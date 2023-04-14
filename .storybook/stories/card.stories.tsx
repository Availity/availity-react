import React from 'react';
import { ArgsTable } from '@storybook/addon-docs';
import {
  Card,
  CardText,
  CardBody,
  CardBodyProps,
  CardTitle,
  CardSubtitle,
  CardProps,
  CardHeader,
  CardHeaderProps,
  CardFooter,
  CardFooterProps,
  CardGroup,
  CardImg,
  CardLink,
  CardDeck,
  CardColumns,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from 'reactstrap';
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

export const KitchenSinkStory = (args) => (
  <Card style={{ width: '18rem' }}>
    <img src="https://picsum.photos/300/200" alt="Card" />
    <CardBody>
      <CardTitle tag="h5">Card Title</CardTitle>
      <CardText>This is some text within a card body.</CardText>
    </CardBody>
    <ListGroup flush>
      <ListGroupItem>An item</ListGroupItem>
      <ListGroupItem>A second item</ListGroupItem>
      <ListGroupItem>And a third item</ListGroupItem>
    </ListGroup>
    <CardBody>
      <CardLink href="#">Card Link</CardLink>
      <CardLink href="#">Another Card Link</CardLink>
    </CardBody>
  </Card>
);
KitchenSinkStory.storyName = 'Kitchen Sink';
KitchenSinkStory.args = {};

export const ListGroupStory = (args) => (
  <Card style={{ width: '18rem' }}>
    <CardHeader>Featured</CardHeader>
    <ListGroup flush>
      <ListGroupItem>An item</ListGroupItem>
      <ListGroupItem>A second item</ListGroupItem>
      <ListGroupItem>And a third item</ListGroupItem>
    </ListGroup>
  </Card>
);
ListGroupStory.storyName = 'ListGroup';
ListGroupStory.args = {};

export const ImgCapsStory = (args) => (
  <>
    <Card className="my-2">
      <CardImg top width="100%" src="https://picsum.photos/900/180" alt="Card image cap" style={{ height: 180 }} />
      <CardBody>
        <CardTitle tag="h5">Card Title</CardTitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This content is a
          little bit longer.
        </CardText>
        <CardText>
          <small className="text-muted">Last updated 3 mins ago</small>
        </CardText>
      </CardBody>
    </Card>
    <Card className="my-2">
      <CardBody>
        <CardTitle tag="h5">Card Title</CardTitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This content is a
          little bit longer.
        </CardText>
        <CardText>
          <small className="text-muted">Last updated 3 mins ago</small>
        </CardText>
      </CardBody>
      <CardImg bottom width="100%" src="https://picsum.photos/900/180" alt="Card image cap" style={{ height: 180 }} />
    </Card>
  </>
);
ImgCapsStory.storyName = 'Image Caps';

export const SizingStory = (args) => (
  <Row>
    <Col sm="6">
      <Card body>
        <CardTitle tag="h5">Special Title Treatment</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button>Go somewhere</Button>
      </Card>
    </Col>
    <Col sm="6">
      <Card body>
        <CardTitle tag="h5">Special Title Treatment</CardTitle>
        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
        <Button>Go somewhere</Button>
      </Card>
    </Col>
  </Row>
);
SizingStory.storyName = 'Sizing';
SizingStory.args = {};

export const GroupsStory = (args) => (
  <CardGroup>
    <Card>
      <CardImg top width="100%" src="https://picsum.photos/318/180" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This content is a
          little bit longer.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
    <Card>
      <CardImg top width="100%" src="https://picsum.photos/318/180" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
    <Card>
      <CardImg top width="100%" src="https://picsum.photos/318/180" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This card has even
          longer content than the first to show that equal height action.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  </CardGroup>
);
GroupsStory.storyName = 'Groups';
GroupsStory.args = {};

export const DecksStory = (args) => (
  <CardDeck>
    <Card>
      <CardImg top width="100%" src="https://picsum.photos/256/186" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This content is a
          little bit longer.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
    <Card>
      <CardImg top width="100%" src="https://picsum.photos/256/186" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
    <Card>
      <CardImg top width="100%" src="https://picsum.photos/256/186" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>
          This is a wider card with supporting text below as a natural lead-in to additional content. This card has even
          longer content than the first to show that equal height action.
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  </CardDeck>
);
DecksStory.storyName = 'Decks';
DecksStory.args = {};

export const hidden_RSCard = ({ children, ...cardProps }: CardProps): Card => <Card {...cardProps}>{children}</Card>;

export const hidden_RSCardHeader = ({ children, ...cardBodyProps }: CardBodyProps): CardBody => (
  <CardBody {...cardBodyProps}>{children}</CardBody>
);
export const hidden_RSCardBody = ({ children, ...cardHeaderProps }: CardHeaderProps): CardHeader => (
  <CardHeader {...cardHeaderProps}>{children}</CardHeader>
);
export const hidden_RSCardFooter = ({ children, ...cardFooterProps }: CardFooterProps): CardFooter => (
  <CardBody {...cardFooterProps}>{children}</CardBody>
);

export const Props = () => (
  <>
    <h4>Reactstrap Props</h4>
    <h5>Card</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSCard} />
    </div>
    <h5>Card Header</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSCardHeader} />
    </div>
    <h5>Card Body</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSCardBody} />
    </div>
    <h5>Card Footer</h5>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSCardHeader} />
    </div>
  </>
);
