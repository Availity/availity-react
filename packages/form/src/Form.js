import React from "react";
import PropTypes from "prop-types";
import { Form as RsForm, Util } from "reactstrap";
import { Formik, Form as FForm } from "formik";

const Form = ({ tag: Tag, children, ...rest }) => (
    <Formik {...rest}>
      <RsForm tag={FForm}>{children}</RsForm>
    </Formik>
  );

Form.propTypes = {
  children: PropTypes.node,
  tag: Util.tagPropTypes
};

Form.defaultProps = {
  tag: RsForm
};

export default Form;
