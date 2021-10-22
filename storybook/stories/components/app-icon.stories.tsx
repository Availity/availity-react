import React from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import README from "@availity/app-icon/README.md";
import { Preview } from "../util";

const AppIcon = React.lazy(() => import("@availity/app-icon"));

export default {
  title: "Components/AppIcon",
  decorators: [withKnobs],
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const _Default = () => (
  <AppIcon
    size={select(
      "Size",
      {
        Default: "",
        Large: "lg",
        "Extra Large": "xl"
      },
      ""
    )}
    color={select(
      "Color",
      {
        Black: "black",
        Blue: "blue",
        Green: "green",
        Orange: "orange"
      },
      "black"
    )}
    branded={boolean("Branded", false)}
    className={text("ClassName")}
    src={text("Image")}
    alt={text("alt")}
  >
    {text("Application Abbreviation", "AI")}
  </AppIcon>
);
_Default.story = {
  name: "default"
};
