import * as React from 'react';

interface RadioGroupProps extends React.HTMLAttributes<HTMLFormElement> {
  name: string;
  label?: React.ReactNode;
  onChange?: (value: any) => void;
  inline?: boolean | false;
}

declare class RadioGroup extends React.Component<RadioGroupProps> {}

export default RadioGroup;
