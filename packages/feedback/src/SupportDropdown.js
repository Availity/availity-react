import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import SupportForm from './SupportForm';

const SupportDropdown = ({ setSupportIsActive, feedbackToggle }) => {
  const [blocking, setBlocking] = useState(null);

  return (
    <DropdownMenu right style={{ width: '550px', padding: 0 }}>
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
