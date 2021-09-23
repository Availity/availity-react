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

declare const HelpProvider: React.FC;

declare const Help: React.FC<HelpObj>;

declare const FieldHelpIcon: (props: { labelId?: string; color?: string; size?: string; id: string }) => JSX.Element;

declare function useHelp(data: HelpObj): HelpContext;

declare function triggerFieldHelp(id: string): void;

export { constants, FieldHelpIcon, Help, triggerFieldHelp, useHelp };

export default HelpProvider;
