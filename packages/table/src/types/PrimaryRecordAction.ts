export interface PrimaryRecordAction<T> {
  iconName: string;
  title: string;
  onClick: (record?: T) => void;
  isVisible?: (record?: T) => boolean;
}
