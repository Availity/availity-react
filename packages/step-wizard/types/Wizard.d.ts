export interface WizardProps {
  bar?: boolean;
  stacked?: boolean;
  progress?: boolean;
  tag?: React.ReactType | string;
  className?: string;
}

declare const Wizard: React.FC<WizardProps>;

export default Wizard;
