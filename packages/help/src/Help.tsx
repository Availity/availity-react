import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import avMessages from '@availity/message-core';
import Icon from '@availity/icon';

type THelp = {
  id: string;
  type?: 'vendor' | 'provider' | 'payer';
};

type THelpContext = {
  addHelp: (help: THelp) => void;
  removeHelp: (id: string) => void;
  help?: THelp;
};

const HelpContext = createContext<THelpContext | null>(null);

export const constants = {
  SET_HELP: 'nav:help:set',
  RESET_HELP: 'nav:help:reset',
  OPEN_FIELD_HELP: 'nav:help:field',
};

const HelpProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [help, setHelp] = useState<THelp>();

  const addHelp = (newHelp: THelp) => {
    setHelp(newHelp);
    avMessages.send({
      event: constants.SET_HELP,
      ...newHelp,
    });
  };

  const removeHelp = (id: string) => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setHelp(undefined);
    avMessages.send({
      event: constants.RESET_HELP,
      id,
    });
  };

  // If we leave the web app completely we want to make sure to reset
  const unload = useCallback(() => {
    if (help?.id) {
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
  useEffect(
    () => () => {
      if (help?.id) {
        avMessages.send({
          event: constants.RESET_HELP,
          id: help.id,
        });
      }
    },
    [help]
  );

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

const useHelpContext = () => {
  const ctx = useContext(HelpContext);
  if (!ctx) throw new Error('useHelpContext must be used inside of a HelpProvider');
  return ctx;
};

export const useHelp = ({ type, id }: THelp): THelpContext => {
  const help = useHelpContext();

  useEffect(() => {
    help.addHelp({
      type,
      id,
    });

    return () => help.removeHelp(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  return help;
};

type HelpProps = {
  id: string;
  type?: 'vendor' | 'provider' | 'payer';
  children: React.ReactNode;
};

export const Help = ({ type = 'vendor', id, children }: HelpProps): JSX.Element => {
  useHelp({ type, id });

  return <>{children}</>;
};

export const triggerFieldHelp = (id: string): void => {
  avMessages.send({
    event: constants.OPEN_FIELD_HELP,
    id,
  });
};

const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
  if (event.key === 'Enter') {
    triggerFieldHelp(id);
  }
};

type FieldHelpIconProps = {
  color?: string;
  id: string;
  labelId?: string;
  size?: string;
};

export const FieldHelpIcon = ({ color = 'primary', size = '1x', id, labelId }: FieldHelpIconProps): JSX.Element => (
  <Icon
    role="link"
    data-testid="field-help-icon"
    name="help-circle"
    size={size}
    color={color}
    onClick={() => triggerFieldHelp(id)}
    tabIndex={0}
    onKeyPress={(e) => handleKeyPress(e, id)}
    aria-hidden="false"
    aria-label="help"
    aria-describedby={labelId || ''}
  />
);

export default HelpProvider;
