import React from "react";
import { useToggle } from "@availity/hooks";
import README from "@availity/hooks/README.md";
import { Button } from "reactstrap";
import { Preview } from "../util";

type ComponentProps = {
  initialValue?: boolean
};

const Component: React.SFC<ComponentProps> = ({ initialValue = false }) => {
  const [isToggled, toggle] = useToggle(initialValue);
  return (
    <Button onClick={() => toggle()} color="primary">
      {isToggled ? "World" : "Hello"}
    </Button>
  );
};
export default {
  title: "Hooks/useToggle",
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const Default = () => <Component />;
Default.story = {
  name: "default"
};
export const WithInitialValue = () => <Component initialValue />;
WithInitialValue.story = {
  name: "with initialValue"
};
