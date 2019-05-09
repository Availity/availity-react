export interface WizardStepProps {
    link?: boolean;
    complete?: boolean;
    active?: boolean;
    disabled?: boolean;
    clickable?: boolean;
    href?: string;
    children?: React.ReactType;
    tag?: React.ReactType | string;
    className?: string;
}

declare const WizardStep: React.FunctionComponent<WizardStepProps>;

export default WizardStep;

