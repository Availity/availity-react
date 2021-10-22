import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "@availity/favorites/style.scss";
import README from "@availity/favorites/README.md";
import "@availity/mock";
import { Preview } from "../util";

const Favorites = React.lazy(() => import("@availity/favorites"));
const FavoriteHeart = React.lazy(() =>
  import("@availity/favorites/src/FavoriteHeart")
);

export default {
  title: "Components/Favorites",
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const Default = () => (
  <Favorites>
    <Card tag={CardBody} className="d-flex flex-row">
      <FavoriteHeart id="1234" name="Hello World" />
      <CardTitle className="ml-2">Hello World</CardTitle>
    </Card>
  </Favorites>
);
Default.story = {
  name: "default"
};
