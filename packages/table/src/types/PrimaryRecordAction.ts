export interface PrimaryRecordAction<T> {
  iconName: string | ((record?: T) => string);
  title: string | ((record?: T) => string);
  onClick: (record?: T) => void;
  isVisible?: (record?: T) => boolean;
}
