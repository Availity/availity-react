import React from 'react';
import PropTypes from 'prop-types';
import { ModalBody, CardImg, Row, Col } from 'reactstrap';

const DisclaimerModal = ({
  parentPayerSpaces,
  name,
  state: { selectedOption },
  setState,
}) => (
  <ModalBody>
    <p>
      Open {name} as:{' '}
      {selectedOption ? selectedOption.name || selectedOption.id : ''}
    </p>
    <Row>
      {parentPayerSpaces &&
        parentPayerSpaces.map(payerSpace => (
          <Col
            md={3}
            key={payerSpace.id}
            style={{
              cursor: 'pointer',
            }}
            data-testid={`link-payer-option-${payerSpace.id}`}
            onClick={() =>
              setState({
                selectedOption: payerSpace,
              })
            }
          >
            <div className="link-payer-option">
              <CardImg
                width="100%"
                src={payerSpace.images.tile}
                alt={payerSpace.name}
                className="img-responsive"
              />
            </div>
          </Col>
        ))}
    </Row>
  </ModalBody>
);

DisclaimerModal.propTypes = {
  parentPayerSpaces: PropTypes.array,
  name: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
};

export default DisclaimerModal;
