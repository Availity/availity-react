import React from "react";
import { Button } from "reactstrap";
import { number, text, boolean } from "@storybook/addon-knobs";
import "@availity/yup";
import * as yup from "yup";
import {
  AvProviderSelect,
  AvOrganizationSelect
} from "@availity/select/resources";
import README from "@availity/select/README.md";
import "@availity/mock";
import FormikResults from "../mocks/FormikResults";
import { Preview } from "../util";

const singleValueSchema = (name, required) =>
  yup.object().shape({
    [name]: yup
      .string()
      .isRequired(required, "This field is required.")
      .nullable()
  });
export default {
  title: "Form Components/Select/resources",
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const _AvProviderSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <FormikResults
      initialValues={{
        AvProviderSelect: null
      }}
      validationSchema={singleValueSchema("AvProviderSelect")}
    >
      <AvProviderSelect
        label={text("Label", "Select Provider")}
        name="AvProviderSelect"
        customerId={text("Customer ID", "1234")}
        requiredParams={["customerId"]}
        watchParams={["customerId"]}
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        isDisabled={boolean("Disabled", false)}
      />
      <Button color="primary">Submit</Button>
    </FormikResults>
  );
};
_AvProviderSelect.story = {
  name: "AvProviderSelect"
};
export const _AvOrganizationSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <FormikResults
      initialValues={{
        AvOrganizationSelect: null
      }}
      validationSchema={singleValueSchema("AvOrganizationSelect")}
    >
      <AvOrganizationSelect
        label={text("Label", "Select Organization")}
        name="AvOrganizationSelect"
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={text("Generic Error Message", "This field is invalid")}
        validate={{
          required: {
            value: required,
            errorMessage:
              required &&
              text("Required Error Message", "This field is required")
          }
        }}
        isDisabled={boolean("Disabled", false)}
      />
      <Button color="primary">Submit</Button>
    </FormikResults>
  );
};
_AvOrganizationSelect.story = {
  name: "AvOrganizationSelect"
};
