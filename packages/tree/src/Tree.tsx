import Icon from '@availity/icon';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import TreeItem from './TreeItem';

const SELECT_ALL = 'Select All';
const DESELECT_ALL = 'Deselect All';

const EXPAND_ALL = 'Expand All';
const COLLAPSE_ALL = 'Collapse All';

const areAllChildrenSelected = (item: TreeItem) =>
  (item.isSelected && item.children?.every((child) => !child.isDisabled ? child.isSelected : true)) || false;

export type TreeProps = {
  searchLabel?: string;
  enableSearch?: boolean;
  items: TreeItem[];
  isRoot?: boolean;
  onItemsSelected?: (selectedIds: TreeItem[]) => void;
  onItemsExpanded?: () => void;
  parentId?: string;
  selectedItems?: TreeItem[];
  expandAll?: boolean;
  selectable?: boolean
};

export const buildTree = (items: TreeItem[]) => {
  const tree: TreeItem[] = [];
  const parents: Map<string, TreeItem> = new Map<string, TreeItem>();

  for (const item of items) {
    item.children =[];
    parents.set(item.id, item);
  }

  for (let [key, value] of parents) {
    if (value.parentId && parents.get(value.parentId)) {
      const parent = parents.get(value.parentId);
      if (parent) {
        parent.children?.push(value);
      }
    } else {
      tree.push(value);
    }
  }
  return tree;
};

const Tree = ({
  isRoot = true,
  searchLabel,
  enableSearch = false,
  items = [],
  selectedItems = [],
  onItemsSelected,
  onItemsExpanded,
  expandAll = false,
  parentId,
  selectable = false
}: TreeProps): JSX.Element | null => {
  const [treeItems, setTreeItems] = useState(items);
  const [selectedList, setSelectedList] = useState(selectedItems);
  const [allExpanded, setAllExpanded] = useState(expandAll);

  const areAllExpanded = (items: TreeItem[]) => {
    let allExpanded = items.every((item) => item.isExpanded);
    for (const item of items) {
      if (item.children) {
        allExpanded = allExpanded && areAllExpanded(item.children);
      }
    }
    return allExpanded;
  };

  const areAllSelected = useCallback((items: TreeItem[]) => {
    let allSelected = items.every((item) => item.isSelected);

    for (const item of items) {
      if (item.children) {
        allSelected = allSelected && areAllSelected(item.children);
      }
    }
    return allSelected;
  }, []);

  const [rootSelectText, setRootSelectText] = useState(SELECT_ALL);
  const [rootExpandAllText, setRootExpandAllText] = useState(expandAll ? COLLAPSE_ALL : EXPAND_ALL);
  const [isReady, setIsReady] = useState(false);

  const walkTree = useCallback((item: TreeItem, fn: (item: TreeItem) => void) => {
    fn(item);
    if (item.children) {
      for (const child of item.children) {
        walkTree(child, fn);
      }
    }
  }, []);

  useEffect(() => {
    if (treeItems) {
      if (!isReady) {
        for (const item of treeItems) {
          item.isExpanded = item.isExpanded || expandAll || false;
          item.isHidden = item.isHidden || false;
          item.isDisabled = item.isDisabled || false;
          item.isSelected = selectedItems.map((item) => item.id).includes(item.id) || item.isSelected || false;
          item.areAllChildrenSelected = areAllChildrenSelected(item);
        }
      }
      setIsReady(true);
    }
  }, [treeItems, expandAll, isReady, selectedItems]);

  const handleItemSelected = useCallback(() => {
    if (onItemsSelected) {
      onItemsSelected(selectedList);
    }
  }, [selectedList, onItemsSelected]);

  useEffect(() => {
    if (areAllSelected(treeItems)) {
      setRootSelectText(DESELECT_ALL);
    } else {
      setRootSelectText(SELECT_ALL);
    }

    for (const item of treeItems) {
      item.areAllChildrenSelected = areAllChildrenSelected(item);
    }

    handleItemSelected();
  }, [selectedList, treeItems, areAllSelected, handleItemSelected]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectedList(selectedItems);
      for (const item of treeItems) {
        walkTree(item, (item) => {
          item.areAllChildrenSelected = areAllChildrenSelected(item);
        });
      }
    }
  }, [selectedItems, walkTree, treeItems]);

  const filterItems = (items: TreeItem[], searchTerm: string) => {
    const searchValue = searchTerm.toUpperCase();
    const rootItems = items.filter((item) => item.name.toUpperCase().includes(searchValue));
    for (const item of rootItems) item.isHidden = false;

    const hiddenItems = items.filter((item) => !rootItems.map((rootItem) => rootItem.id).includes(item.id));
    for (const hiddenItem of hiddenItems) hiddenItem.isHidden = true;
    for (const item of items) {
      if (item.children) {
        const matchedChildren = item.children.filter((item) => item.name.toUpperCase().includes(searchValue));
        if (matchedChildren?.length > 0) {
          item.isExpanded = true;
        }

        filterItems(item.children, searchTerm);
      }
    }
  };

  const toggleSelect = (item: TreeItem) => {
    const itemToUpdate = treeItems.find((t) => t.id === item.id);
    if (itemToUpdate) {
      item.isSelected = !item.isSelected;
      if (item.isSelected) {
        setSelectedList([...selectedList, item]);
      } else {
        setSelectedList(selectedList.filter((item) => item.id !== itemToUpdate.id));
      }
    }
  };

  const toggleExpand = (item: TreeItem) => {
    const itemToUpdate = treeItems.find((t) => t.id === item.id);
    if (itemToUpdate) {
      itemToUpdate.isExpanded = !item.isExpanded;
    }
    setTreeItems([...treeItems]);

    if (onItemsExpanded) {
      onItemsExpanded();
    }
  };

  const search = (value: string) => {
    filterItems(items, value);
    setTreeItems([...treeItems]);
  };

  const getSelectedItems = useCallback((items: TreeItem[]) => {
    let selectedItems: TreeItem[] = [];
    for (const item of items) {
      if (item.isSelected) {
        selectedItems.push(item);
      }

      if (item.children) {
        selectedItems = [...selectedItems, ...getSelectedItems(item.children)];
      }
    }
    return selectedItems;
  }, []);

  const toggleExpandAll = () => {
    const isExpanded = !allExpanded;
    setAllExpanded(isExpanded);

    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isExpanded = isExpanded;
      });
    }

    if (isRoot && isExpanded) {
      setRootExpandAllText(COLLAPSE_ALL);
    } else {
      setRootExpandAllText(EXPAND_ALL);
    }

    setTreeItems([...treeItems]);
  };

  const toggleSelectAll = () => {
    const isSelected = !areAllSelected(items);
    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isSelected = isSelected;
        item.areAllChildrenSelected = isSelected;
      });
    }

    setSelectedList(getSelectedItems(items));
  };

  const toggleSelectChildren = (item: TreeItem) => {
    const isSelected = !areAllChildrenSelected(item);
    item.isSelected = isSelected;
    item.areAllChildrenSelected = isSelected;

    for (const child of item.children || []) {
      walkTree(child, (child) => {
        if (child.isDisabled) {
          return;
        }
        child.isSelected = isSelected;
        child.areAllChildrenSelected = isSelected;
      });
    }

    setSelectedList(getSelectedItems(items));
    setTreeItems([...treeItems]);
  };

  const onChildrenSelected = useCallback(() => {
    setSelectedList(getSelectedItems(treeItems));
  }, [getSelectedItems, treeItems]);

  const onChildrenExpanded = () => {
    setAllExpanded(areAllExpanded(items));
    if (areAllExpanded(items)) {
      setRootExpandAllText(COLLAPSE_ALL);
    } else {
      setRootExpandAllText(EXPAND_ALL);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      <div data-testid={`tree-view-${parentId || 'parent'}`} className="tree-view">
        {isRoot && enableSearch && (
          <div className="form-group">
            <Label className="font-weight-bold">{searchLabel}</Label>
            <Input
              data-testid="tree-search-input"
              type="text"
              className="form-control"
              id="search"
              placeholder="Search"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => search(event.target.value)}
            />
          </div>
        )}

        {isRoot && (
          <div className="form-group mb-1">
            <Button data-testid="btn-expand-all" id="btnExpandAll" color="link" className="p-0" onClick={toggleExpandAll}>
              {rootExpandAllText}
            </Button>
          </div>
        )}

        <ul className="pl-0">
          {treeItems.map((item) => (
            <li data-testid={`tree-view-item-${item.id}`} key={`tree-view-item-${item.id}`}>
              {!item.isHidden && (
                <>
                  <div className="d-flex">
                    <FormGroup check>
                      {!item.isDisabled && selectable && (
                        <Input
                          id={`chkSelect_${item.id}`}
                          data-testid={`chk-tree-view-item-select-${item.id}`}
                          type="checkbox"
                          checked={item.isSelected}
                          onChange={() => toggleSelect(item)}
                        />
                      )}
                      <Label data-testid={`tree-view-item-${item.id}-label`} className={item.isDisabled ? 'text-muted' : ''} check>
                        {item.name}
                      </Label>
                    </FormGroup>

                    {item.children && item.children.length > 0 && (
                      <div className="form-inline d-flex justify-content-end ml-auto align-items-center">
                        {isRoot && selectable && (
                          <Button data-testid="btn-select-all" color="link" className="pb-0 pt-0" onClick={() => toggleSelectAll()}>
                            {rootSelectText}
                          </Button>
                        )}
                        {selectable && (<FormGroup check>
                          <Input
                            data-testid={`chkSelectAllChildren_${item.id}`}
                            id={`chkSelectAllChildren_${item.id}`}
                            type="checkbox"
                            checked={item.areAllChildrenSelected}
                            onChange={() => toggleSelectChildren(item)}
                          />{' '}
                        </FormGroup>)}
                        <Button
                          data-testid={`btn-expand-all-${item.id}`}
                          color="link"
                          className="icon-expand p-0 text-decoration-none"
                          onClick={() => toggleExpand(item)}
                        >
                          <Icon size="lg" className="expand-tree" name={item.isExpanded ? 'down-dir' : 'right-dir'} />
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
              {item.children && item.children.length > 0 && item.isExpanded && (
                <ul>
                  <Tree
                    isRoot={false}
                    items={item.children}
                    parentId={item.id}
                    selectedItems={selectedItems}
                    onItemsSelected={onChildrenSelected}
                    onItemsExpanded={onChildrenExpanded}
                    expandAll={expandAll}
                    selectable={selectable}
                  />
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tree;
