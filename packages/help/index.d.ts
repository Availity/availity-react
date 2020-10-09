export interface HelpObj {
  id: string;
  type?: 'vendor' | 'provider' | 'payer';
}

export type TopNavConstants = {
  SET_HELP: 'nav:help:set';
  RESET_HELP: 'nav:help:reset';
};

export interface HelpContext {
  addHelp: (data: HelpObj) => void;
  removeHelp: (id: string) => void;
  help: HelpObj;
}

declare const constants: TopNavConstants;

declare const HelpProvider: React.Provider<HelpContext>;

declare const Help: React.StatelessComponent<HelpObj>;

declare function useHelp(data: HelpObj): HelpContext;

export { Help, useHelp, constants };

export default HelpProvider;
