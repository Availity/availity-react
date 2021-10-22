import React from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import "@availity/mock";
import README from "@availity/feedback/README.md";
import { Preview } from "../util";

const Feedback = React.lazy(() => import("@availity/feedback"));
const FeedbackForm = React.lazy(() =>
  import("@availity/feedback/src/FeedbackForm")
);

export default {
  title: "Components/Feedback",
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
  <Feedback
    appName={text("Application Name", "Payer Space")}
    prompt={text("Prompt")}
    formProps={{
      additionalComments: boolean("Additional Comments", false),
      aboutOptions: boolean("About Options", false)
        ? [
            { label: "The Payer Space", value: "space" },
            { label: "Applications", value: "applications" },
            { label: "Resources", value: "resources" },
            { label: "News and Announcements", value: "news" }
          ]
        : [],
      staticFields: { staticKey: "my-static-value" }
    }}
    showSupport={boolean("Support", false)}
    color={select(
      "Button Color",
      {
        light: "light",
        dark: "dark",
        ghost: "ghost",
        primary: "primary",
        secondary: "secondary",
        success: "success",
        danger: "danger",
        info: "info",
        warning: "warning"
      },
      "secondary"
    )}
    outline={boolean("Button Outline", false)}
    className={text("ClassName", "")}
    modal={boolean("Modal", false)}
  >
    {text("Button Text")}
  </Feedback>
);
Default.story = {
  name: "default"
};
export const WithForm = () => (
  <FeedbackForm
    name={text("Application Name", "Payer Space")}
    prompt={text("Prompt")}
    autoFocusFeedbackButton={boolean("autoFocusFeedbackButton", false)}
    faceOptions={[
      {
        icon: "ok",
        description: "Yes",
        placeholder: `Leave a comment if you'd like.`
      },
      {
        icon: "cancel",
        description: "No",
        placeholder: `Leave a comment if you'd like.`
      }
    ]}
  />
);
WithForm.story = {
  name: "with form"
};
