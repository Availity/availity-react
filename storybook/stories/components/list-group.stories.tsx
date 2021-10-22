import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { ListGroupItem } from "reactstrap";
import README from "@availity/list-group/README.md";
import { Preview } from "../util";

const ListGroup = React.lazy(() => import("@availity/list-group"));

export default {
  title: "Components/List Group",
  decorators: [withKnobs],
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const Default = () => (
  <ListGroup
    cards={boolean("Cards", false)}
    selectable={boolean("Selectable", false)}
  >
    <ListGroupItem>item</ListGroupItem>
    <ListGroupItem>item</ListGroupItem>
    <ListGroupItem>item</ListGroupItem>
  </ListGroup>
);
Default.story = {
  name: "default"
};
