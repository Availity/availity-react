export interface WizardStepProps {
  complete?: boolean;
  active?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  href?: string;
  tag?: React.ReactType | string;
  className?: string;
}

declare const WizardStep: React.FC<WizardStepProps>;

export default WizardStep;
