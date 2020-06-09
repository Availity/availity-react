export interface HelpObj {
  id: string;
  type?: 'vendor' | 'provider' | 'payer';
}

export interface HelpContext {
  addHelp: (data: HelpObj) => void;
  removeHelp: (id: string) => void;
  help: HelpObj;
}

declare const HelpProvider: React.Provider<HelpContext>;

declare const Help: React.StatelessComponent<HelpObj>;

declare function useHelp(data: HelpObj): HelpContext;

export { Help, useHelp };

export default HelpProvider;
