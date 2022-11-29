import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Label as RSLabel } from 'reactstrap';
import { FieldHelpIcon } from '@availity/help';

export const RequiredAsterisk = () => (
  // required-asterisk class available in availity-uikit v4.1.5+
  <strong
    className="text-danger d-inline align-text-top"
    data-testid="required-asterisk"
    style={{
      fontSize: '130%',
      lineHeight: '100%',
    }}
  >
    *
  </strong>
);

export const RequiredKey = () => (
  <div>
    Fields marked with an asterisk <RequiredAsterisk /> are required.
  </div>
);

const Label = ({ helpId, id, required, children, ...attributes }) => {
  const labelId = id || uuid();
  const Wrapper = ({ children }) => {
    if (helpId && (attributes.className || attributes.style)) {
      return (
        <div className={attributes.className} style={attributes.style}>
          {children}
        </div>
      );
    }
    return <>{children}</>;
  };

  return (
    <Wrapper>
      <RSLabel id={labelId} data-testid="label" {...attributes}>
        {required ? (
          <>
            <RequiredAsterisk />{' '}
          </>
        ) : null}
        {children}
      </RSLabel>
      {helpId ? <FieldHelpIcon labelId={labelId} id={helpId} /> : null}
    </Wrapper>
  );
};

Label.propTypes = {
  /** Id of the label element. Default is generated UUID. */
  id: PropTypes.string,
  /** Help topic id, adds <FieldHelpIcon/> next to the label (should not be within label for accessibility). */
  helpId: PropTypes.string,
  /** Will add <RequiredAsterisk /> to label. */
  required: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default Label;
