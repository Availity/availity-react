export interface WizardProps {
    bar?: boolean;
    stacked?: boolean;
    progress?: boolean;
    children?: React.ReactType;
    tag?: React.ReactType | string;
    className?: string;
}

declare const Wizard: React.FunctionComponent<WizardProps>;

export default Wizard;
