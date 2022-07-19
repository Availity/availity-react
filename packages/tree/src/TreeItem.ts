export default class TreeItem {
  id: string;

  isExpanded?: boolean;

  isSelected?: boolean;

  isHidden?: boolean;

  isDisabled?: boolean;

  name: string;

  parentId?: string;

  children?: TreeItem[];

  areAllChildrenSelected?: boolean;

  depth?: number;

  constructor(obj: TreeItem) {
    this.id = obj.id;
    this.parentId = obj.parentId;
    this.isExpanded = obj.isExpanded || false;
    this.isSelected = obj.isSelected || false;
    this.isHidden = obj.isHidden || false;
    this.isDisabled = obj.isDisabled || false;
    this.name = obj.name;
    this.children = obj.children;
    this.areAllChildrenSelected = obj.areAllChildrenSelected;
    this.depth = obj.depth;
  }
}
