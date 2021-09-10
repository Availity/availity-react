import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import SupportForm from './SupportForm';

const dropdownStyles = { width: '550px', maxWidth: '90vw', padding: 0 };

const SupportDropdown = ({ setSupportIsActive, feedbackToggle }) => {
  const [blocking, setBlocking] = useState(null);

  return (
    <DropdownMenu
      right
      style={dropdownStyles}
      positionFixed="false"
      role="dialog"
      aria-labelledby="support-form-header"
    >
      <BlockUi tag="div" keepInView blocking={blocking}>
        <SupportForm
          setSupportIsActive={setSupportIsActive}
          setBlocking={setBlocking}
          feedbackToggle={feedbackToggle}
        />
      </BlockUi>
    </DropdownMenu>
  );
};

SupportDropdown.propTypes = {
  setSupportIsActive: PropTypes.func,
  feedbackToggle: PropTypes.func,
};

export default SupportDropdown;
