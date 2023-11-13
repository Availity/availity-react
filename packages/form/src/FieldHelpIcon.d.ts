type FieldHelpIconProps = {
  /** The field Help ID Required */
  id: string;
  /** The bootstrap 3 color of the icon. Default:primary */
  color?: string;
  /** The size of the help icon. Default: 1x */
  size?: string;
  /** The id of the associated label for aria-describedby, needed for accessibility. */
  labelId?: string;
};

declare const FieldHelpIcon: (props: FieldHelpIconProps) => JSX.Element;

declare const OPEN_FIELD_HELP: string;

export { FieldHelpIconProps, OPEN_FIELD_HELP };

export default FieldHelpIcon;
