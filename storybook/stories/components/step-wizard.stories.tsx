import React from "react";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import README from "@availity/step-wizard/README.md";
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle
} from "@availity/step-wizard";
import { Preview } from "../util";

export default {
  title: "Components/Wizard",
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
  <div className="py-3">
    <Wizard
      bar={boolean("Wizard Bar", false)}
      stacked={boolean("Wizard Stacked", false)}
      progress={boolean("Wizard Progress", false)}
    >
      <WizardStep
        complete={boolean("First Step Complete", false)}
        active={boolean("First Step Active", false)}
        disabled={boolean("First Step Disabled", false)}
        clickable={boolean("First Step Clickable", false)}
        href={text("First Step Href", "#step-1")}
      >
        <WizardStepBadge>1</WizardStepBadge>
        <WizardStepTitle>First</WizardStepTitle>
      </WizardStep>

      <WizardStep
        complete={boolean("Second Step Complete", false)}
        active={boolean("Second Step Active", false)}
        disabled={boolean("Second Step Disabled", false)}
        clickable={boolean("Second Step Clickable", false)}
        href={text("Second Step Href", "#step-2")}
      >
        <WizardStepBadge>2</WizardStepBadge>
        <WizardStepTitle>Second</WizardStepTitle>
      </WizardStep>

      <WizardStep
        complete={boolean("Third Step Complete", false)}
        active={boolean("Third Step Active", false)}
        disabled={boolean("Third Step Disabled", false)}
        clickable={boolean("Third Step Clickable", false)}
        href={text("Third Step Href", "#step-3")}
      >
        <WizardStepBadge>3</WizardStepBadge>
        <WizardStepTitle>Third</WizardStepTitle>
      </WizardStep>
    </Wizard>
  </div>
);
Default.story = {
  name: "default"
};
