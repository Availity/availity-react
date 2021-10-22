import React from "react";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import README from "@availity/progress/README.md";
import { Preview } from "../util";

const Progress = React.lazy(() => import("@availity/progress"));

export default {
  title: "Components/Progress",
  decorators: [withKnobs],
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const Default: React.FC = () => {
  const value = number("Value", 50);
  const max = number("Max", 100);
  return (
    <div>
      <p>{Math.round(value / max * 100)}% Complete</p>
      <Progress
        animated={boolean("Animated", false)}
        striped={boolean("Striped", false)}
        complete={boolean("Complete", false)}
        color={text("Color", "success")}
        value={value}
        max={max}
      />
    </div>
  );
};
Default.story = {
  name: "default"
};
