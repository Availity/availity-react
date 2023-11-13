import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import avMessages from '@availity/message-core';

type HelpObject = {
  id: string;
  type?: 'vendor' | 'provider' | 'payer';
};

type HelpCtx = {
  addHelp: (data: HelpObject) => void;
  removeHelp: (id: string) => void;
  help: HelpObject | undefined;
};

const HelpContext = createContext<HelpCtx | null>(null);

const useHelpContext = () => {
  const ctx = useContext(HelpContext);
  if (!ctx) throw new Error('You must use useHelpContext inside the HelpContext Provider');
  return ctx;
};

export const constants = {
  SET_HELP: 'nav:help:set',
  RESET_HELP: 'nav:help:reset',
} as const;

const HelpProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [help, setHelp] = useState<HelpObject>();

  const addHelp = useCallback((newHelp: HelpObject) => {
    setHelp(newHelp);
    avMessages.send({
      event: constants.SET_HELP,
      ...newHelp,
    });
  }, []);

  const removeHelp = useCallback((id: string) => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setHelp(undefined);
    avMessages.send({
      event: constants.RESET_HELP,
      id,
    });
  }, []);

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
  useEffect(() => {
    const handleUnMount = () => {
      if (help?.id) {
        avMessages.send({
          event: constants.RESET_HELP,
          id: help.id,
        });
      }
    };

    return () => handleUnMount();
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

export const useHelp = ({ type, id }: { type: 'vendor' | 'provider' | 'payer'; id: string }): HelpCtx => {
  const help = useHelpContext();
  const { addHelp, removeHelp } = help;

  useEffect(() => {
    addHelp({
      type,
      id,
    });

    return () => removeHelp(id);
  }, [addHelp, id, removeHelp, type]);

  return help;
};

export type HelpProps = {
  /** The page level help ID Required */
  id: string;
  /** The page level help type: ie.: provider | vendor | payer | insight. Required */
  type?: 'vendor' | 'provider' | 'payer';
  children?: React.ReactNode;
};

export const Help = ({ id, type = 'vendor', children }: HelpProps): JSX.Element => {
  useHelp({ type, id });

  return <>{children}</>;
};

export default HelpProvider;
