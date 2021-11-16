declare interface TableAction<T> {
  id: string;
  displayText: string;
  divider?: boolean;
  isVisible?: (record: T) => boolean;
  onClick: (record: T) => void;
}

declare interface PrimaryAction<T> {
  iconName: string;
  title: string;
  onClick: (record: T) => void;
}

declare interface ActionCellConfig<T> {
  actions: TableAction<T>[];
  primaryAction?: PrimaryAction<T>;
}

declare function ActionCell<T>(config: ActionCellConfig<T>): string;

export default ActionCell;
