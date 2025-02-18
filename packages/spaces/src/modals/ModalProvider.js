import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getUrl, getTarget } from '@availity/link';
import { isAbsoluteUrl } from '@availity/resolve-url';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import DisclaimerModal from './DisclaimerModal';
import MultiPayerModal from './MultiPayerModal';
import { updateUrl, updateTopApps } from '../helpers';

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const MODAL_TYPES = {
  DISCLAIMER: {
    body: DisclaimerModal,
    buttonProps: () => ({
      children: 'Accept',
    }),
    onSubmit: ({ link, id: spaceId }) => {
      window.open(link.url[0] === '/' ? updateUrl(link.url, 'spaceId', spaceId) : link.url, link.target);
    },
  },
  MULTI_PAYER: {
    body: MultiPayerModal,
    buttonProps: ({ selectedOption }) => ({
      children: 'Continue',
      disabled: selectedOption === undefined,
    }),
    onSubmit: ({ metadata, link, id: spaceId, name }, modalState, dispatch) => {
      if (metadata?.disclaimerId) {
        dispatch({
          type: 'OPEN_DISCLAIMER_MODAL',
          disclaimerId: metadata.disclaimerId,
          link,
          id: spaceId,
          name,
        });
        return;
      }

      const target = getTarget(link.target);

      window.open(
        !isAbsoluteUrl(link.url)
          ? getUrl(updateUrl(link.url, 'spaceId', modalState.selectedOption.id), false, false, target)
          : link.url,
        target
      );
    },
  },
};

export const MODAL_INITIAL_STATE = {
  isOpen: false,
  modalOptions: {},
  modalState: {},
  selectedModal: {
    buttonProps: () => {},
  },
};

export const modalActions = {
  RESET: () => MODAL_INITIAL_STATE,
  OPEN_DISCLAIMER_MODAL: (state, modalOptions) => ({
    ...state,
    isOpen: true,
    selectedModal: MODAL_TYPES.DISCLAIMER,
    modalOptions: {
      ...modalOptions,
      type: modalOptions.spaceType,
    },
  }),
  OPEN_MULTI_PAYER_MODAL: (state, modalOptions) => ({
    ...state,
    isOpen: true,
    selectedModal: MODAL_TYPES.MULTI_PAYER,
    modalOptions: {
      ...modalOptions,
      type: modalOptions.spaceType,
    },
  }),
  UPDATE_MODAL_STATE: (state, modalState) => ({
    ...state,
    modalState,
  }),
};

export const modalReducer = (state, { type, ...action }) => modalActions[type](state, action);

const ModalProvider = ({ children }) => {
  const [
    {
      selectedModal: { body: Body, onSubmit, buttonProps } = {},
      modalOptions: { title, ...modalOptions },
      modalState,
      isOpen,
    },
    dispatch,
  ] = useReducer(modalReducer, MODAL_INITIAL_STATE);

  const toggle = () => dispatch({ type: 'RESET' });

  return (
    <ModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={(modalType, modalOptions) =>
        dispatch({
          type: `OPEN_${modalType}`,
          ...modalOptions,
        })
      }
    >
      <Modal labelledBy="disclaimer-header" role="dialog" aria-modal toggle={toggle} isOpen={isOpen}>
        <ModalHeader id="disclaimer-header" className="h5" tag="div" role="heading" aria-level="2">
          {title}
        </ModalHeader>
        {Body && (
          <Body
            {...modalOptions}
            setState={(newState) => dispatch({ type: 'UPDATE_MODAL_STATE', ...newState })}
            state={modalState}
          />
        )}
        <ModalFooter>
          <Button color="default" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            {...buttonProps({ ...modalState, ...modalOptions })}
            onClick={() => {
              onSubmit(modalOptions, modalState, dispatch);

              updateTopApps({ configurationId: modalOptions.id, type: modalOptions.type }, modalOptions.user);

              toggle();
            }}
          />
        </ModalFooter>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
};

export default ModalProvider;
