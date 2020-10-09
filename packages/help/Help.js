import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import avMessages from '@availity/message-core';
import Icon from '@availity/icon';

const HelpContext = createContext();

export const constants = {
  SET_HELP: 'nav:help:set',
  RESET_HELP: 'nav:help:reset',
  OPEN_FIELD_HELP: 'nav:help:field',
};

const HelpProvider = ({ children }) => {
  const [help, setHelp] = useState();

  const addHelp = newHelp => {
    setHelp(newHelp);
    avMessages.send({
      event: constants.SET_HELP,
      ...newHelp,
    });
  };

  const removeHelp = id => {
    setHelp(undefined);
    avMessages.send({
      event: constants.RESET_HELP,
      id,
    });
  };

  // If we leave the web app completely we want to make sure to reset
  const unload = useCallback(() => {
    if (help && help.id) {
      avMessages.send({
        event: constants.RESET_HELP,
        id: help.id,
      });
    }
  }, [help]);

  useEffect(() => {
    window.addEventListener('beforeunload', unload);
    return () => {
      window.removeEventListener('beforeunload', unload);
    };
  }, [help, unload]);

  // On umount make sure to remove the help from the top nav
  useEffect(() => {
    return () => {
      if (help && help.id) {
        avMessages.send({
          event: constants.RESET_HELP,
          id: help.id,
        });
      }
    };
  }, [help]);

  return (
    <HelpContext.Provider
      value={{
        addHelp,
        removeHelp,
        help,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
};

export const useHelp = ({ type, id }) => {
  const help = useContext(HelpContext);

  useEffect(() => {
    help.addHelp({
      type,
      id,
    });

    return () =>
      help.removeHelp({
        id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  return help;
};

export const Help = ({ type, id, children }) => {
  useHelp({ type, id });

  return children;
};
export const triggerFieldHelp = id => {
  avMessages.send({
    event: constants.OPEN_FIELD_HELP,
    id,
  });
};

export const FieldHelpIcon = ({ color, size, id }) => {
  return (
    <Icon
      data-testid="field-help-icon"
      name="help-circle"
      size={size}
      color={color}
      onClick={() => triggerFieldHelp(id)}
    />
  );
};

FieldHelpIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  id: PropTypes.string.isRequired,
};

FieldHelpIcon.defaultProps = {
  size: '1x',
  color: 'primary',
};
Help.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Help.defaultProps = {
  type: 'vendor',
};

HelpProvider.propTypes = {
  children: PropTypes.node,
};

export default HelpProvider;
