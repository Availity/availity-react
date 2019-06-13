import React from "react";
import { FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";

export default props => (
  <ErrorMessage component={FormFeedback} {...props} />
);
