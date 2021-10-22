import React from "react";
import { Button } from "reactstrap";
import { number, text, boolean } from "@storybook/addon-knobs";
import {
  AvProviderSelect,
  AvOrganizationSelect,
  AvRegionSelect,
  AvPermissionSelect,
  AvNavigationSelect,
  AvUserSelect,
  AvCodeSelect
} from "@availity/reactstrap-validation-select/resources";
import README from "@availity/reactstrap-validation-select/README.md";
import "@availity/mock";
import AvFormResults from "../mocks/AvFormResults";
import { Preview } from "../util";

export default {
  title: "Legacy Form Components/AvSelect/resources",
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
    <AvFormResults>
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
    </AvFormResults>
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
    <AvFormResults>
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
    </AvFormResults>
  );
};
_AvOrganizationSelect.story = {
  name: "AvOrganizationSelect"
};
export const _AvRegionSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <AvFormResults>
      <AvRegionSelect
        label={text("Label", "Select Region")}
        name="AvRegionSelect"
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
    </AvFormResults>
  );
};
_AvRegionSelect.story = {
  name: "AvRegionSelect"
};
export const _AvPermissionSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <AvFormResults>
      <AvPermissionSelect
        label={text("Label", "Select Permission")}
        name="AvPermissionSelect"
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
    </AvFormResults>
  );
};
_AvPermissionSelect.story = {
  name: "AvPermissionSelect"
};
export const _AvNavigationSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <AvFormResults>
      <AvNavigationSelect
        label={text("Label", "Select Payer Space")}
        name="AvNavigationSelect"
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
    </AvFormResults>
  );
};
_AvNavigationSelect.story = {
  name: "AvNavigationSelect"
};
export const _AvUserSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <AvFormResults>
      <AvUserSelect
        label={text("Label", "Select User")}
        name="AvUserSelect"
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
    </AvFormResults>
  );
};
_AvUserSelect.story = {
  name: "AvUserSelect"
};
export const _AvCodeSelect = () => {
  const isMulti = boolean("Multiple", false);
  const min = (isMulti && number("Min Selection", 2)) || undefined;
  const max = (isMulti && number("Max Selection", 3)) || undefined;
  const required = boolean("Required", false);
  return (
    <AvFormResults>
      <AvCodeSelect
        label={text("Label", "Select Code")}
        name="AvCodeSelect"
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        errorMessage={text("Generic Error Message", "This field is invalid")}
        parameters={{
          list: "ALLCPTCODES"
        }}
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
    </AvFormResults>
  );
};
_AvCodeSelect.story = {
  name: "AvCodeSelect"
};
