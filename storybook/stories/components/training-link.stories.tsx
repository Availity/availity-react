import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import README from "@availity/training-link/README.md";
import { Preview } from "../util";

const TrainingLink = React.lazy(() => import("@availity/training-link"));

export default {
  title: "Components/Training Link",
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
  <TrainingLink link={text("Link", "https://google.com")} name="Appeals" />
);
Default.story = {
  name: "default"
};
