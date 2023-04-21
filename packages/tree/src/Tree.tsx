import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Input, Label } from 'reactstrap';

import TreeItemContent from './TreeItemContent';
import TreeItem from './TreeItem';

const SELECT_ALL = 'Select All';
const DESELECT_ALL = 'Deselect All';

const EXPAND_ALL = 'Expand All';
const COLLAPSE_ALL = 'Collapse All';

const areAllChildrenSelected = (item: TreeItem) =>
  (item.isSelected && item.children?.every((child) => (!child.isDisabled ? child.isSelected : true))) || false;

export type TreeProps = {
  /** Required. The list of items to display in the tree. */
  items: TreeItem[];
  /** The label that displays above the text box. */
  searchLabel?: string;
  /** When enabled, there is a search input box that will display and allow for the user to limit the items in the tree based on the typed search value. */
  enableSearch?: boolean;
  /** Whenever an item is selected in the tree, it fires this event to let the parent know of the items that are selected. */
  onItemsSelected?: (selectedItems: TreeItem[]) => void;
  /** Whenever an item is expanded in the tree, it fires this event to let the parent know of the items that are expanded. */
  onItemsExpanded?: (expandedItems?: TreeItem[]) => void;
  /** The id of the parent tree */
  parentId?: string;
  /** The items which are selected in the tree */
  selectedItems?: TreeItem[];

  expandedItems?: TreeItem[];
  /** When true, the tree view will be entirely expanded on initial load. */
  expandAll?: boolean;
  /** Determines whether items can be selected in the tree */
  selectable?: boolean;
  /** Determines whether disabled items should be visible in in the tree at all. */
  displayDisabledItems?: boolean;
};

export const buildTree = (items: TreeItem[], expandedIds?: string[], selectedIds?: string[], hiddenIds?: string[]) => {
  const tree: TreeItem[] = [];
  const parents: Map<string, TreeItem> = new Map<string, TreeItem>();

  for (const item of items) {
    item.children = [];
    item.isSelected = selectedIds ? selectedIds.includes(item.id) : item.isSelected;
    item.isExpanded = expandedIds ? expandedIds.includes(item.id) : item.isExpanded;
    item.isHidden = hiddenIds ? hiddenIds.includes(item.id) : item.isHidden;
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
  searchLabel,
  enableSearch = false,
  items = [],
  selectedItems = [],
  expandedItems = [],
  onItemsSelected,
  onItemsExpanded,
  expandAll = false,
  parentId,
  selectable = false,
  displayDisabledItems = true,
}: TreeProps): JSX.Element | null => {
  const [treeItems, setTreeItems] = useState<TreeItem[]>(items || []);
  const [selectedList, setSelectedList] = useState(selectedItems);
  const [expandedList, setExpandedList] = useState<TreeItem[]>(expandedItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [canSelectDeselect, setCanSelectDeselect] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const [rootSelectText, setRootSelectText] = useState(SELECT_ALL);
  const [rootExpandAllText, setRootExpandAllText] = useState(expandAll ? COLLAPSE_ALL : EXPAND_ALL);

  useEffect(() => {
    setTreeItems(items);
    setSearchTerm('');
  }, [items]);

  useEffect(() => {
    setSelectedList(selectedItems);
    const updateSelectedItems = (items: TreeItem[]): TreeItem[] => {
      for (const item of items) {
        item.isSelected = !item.isDisabled && selectedList.map((item) => item.id).includes(item.id);
        if (item.children) {
          item.children = updateSelectedItems(item.children || []);
        }
      }
      return items;
    };

    updateSelectedItems(treeItems);
  }, [JSON.stringify(selectedItems)]);

  useEffect(() => {
    const areSelected = areAllSelected(treeItems);
    setRootSelectText(areSelected ? DESELECT_ALL : SELECT_ALL);
  }, [selectedList, treeItems]);

  useEffect(() => {
    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.areAllChildrenSelected = areAllChildrenSelected(item) || false;
      });
    }

    setTreeItems([...treeItems]);
  }, [selectedList]);

  useEffect(() => {
    const applyHideDisabledItems = (items: TreeItem[], displayDisabledItems: boolean) => {
      const newItems: TreeItem[] = [];
      for (const item of items) {
        let newItem: TreeItem = {
          ...item,
          isHidden: (item.isDisabled && displayDisabledItems === false) || item.isHidden || false,
        };
        if (item.children && item.children.length > 0) {
          newItem.children = applyHideDisabledItems(item.children, displayDisabledItems);
        }
        newItems.push(newItem);
      }
      return newItems;
    };

    setTreeItems(applyHideDisabledItems(items, displayDisabledItems));
  }, [displayDisabledItems]);

  useEffect(() => {
    const areExpanded = areAllExpanded(treeItems);
    setRootExpandAllText(areExpanded ? COLLAPSE_ALL : EXPAND_ALL);
  }, [expandedList, treeItems]);

  const areAllExpanded = (items: TreeItem[]) => {
    let allExpanded = items.every((item) => item.isExpanded || item.children?.length === 0 || item.isHidden);
    for (const item of items) {
      if (item.children) {
        allExpanded = allExpanded && areAllExpanded(item.children);
      }
    }
    return allExpanded;
  };

  const areAllSelected = useCallback((items: TreeItem[]) => {
    if (items.length === 0) {
      return true;
    }

    let allSelected = items
      .filter((item) => !item.isDisabled && !item.isHidden)
      .every((item) => item.isSelected === true);

    for (const item of items) {
      if (item.children) {
        allSelected = allSelected && areAllSelected(item.children);
      }
    }
    return allSelected;
  }, []);

  useEffect(() => {
    const applyExpandAll = (items: TreeItem[], expandAll: boolean) => {
      const newItems: TreeItem[] = [];
      for (const item of items) {
        let newItem: TreeItem = { ...item, isExpanded: expandAll || item.isExpanded };
        if (item.children && item.children.length > 0) {
          newItem.children = applyExpandAll(item.children, expandAll);
        }
        newItems.push(newItem);
      }
      return newItems;
    };

    if (expandAll) {
      setTreeItems(applyExpandAll(items, expandAll));
    }
  }, [expandAll]);

  const walkTree = useCallback((item: TreeItem, fn: (item: TreeItem) => void) => {
    fn(item);
    if (item.children) {
      for (const child of item.children) {
        walkTree(child, fn);
      }
    }
  }, []);

  const canExpandCollapseItems = (items: TreeItem[]) => {
    let canExpand = items.some((item) => item.children && item.children.length > 0 && !item.isHidden);
    for (const item of items) {
      if (item.children) {
        canExpand = canExpand || canExpandCollapseItems(item.children);
      }
    }
    return canExpand;
  };

  const canSelectDeselectItems = (items: TreeItem[]) => {
    let canSelectDeselect = items.some((item) => !item.isHidden);
    for (const item of items) {
      if (item.children) {
        canSelectDeselect = canSelectDeselect || canSelectDeselectItems(item.children);
      }
    }
    return canSelectDeselect;
  };

  useEffect(() => {
    setCanExpand(canExpandCollapseItems(treeItems));
    setCanSelectDeselect(canSelectDeselectItems(treeItems));
  }, [JSON.stringify(treeItems)]);

  const filterItems = (items: TreeItem[], searchTerm: string): TreeItem[] => {
    const searchValue = searchTerm.toUpperCase();

    const rootItems = items.filter((item) => item.name.toUpperCase().includes(searchValue));
    for (const item of rootItems) {
      item.isHidden = displayDisabledItems ? false : item.isDisabled;
    }

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

    const areExpanded = areAllExpanded(items);
    setRootExpandAllText(areExpanded ? COLLAPSE_ALL : EXPAND_ALL);

    const areSelected = areAllSelected(items);
    setRootSelectText(areSelected ? DESELECT_ALL : SELECT_ALL);

    setCanExpand(canExpandCollapseItems(treeItems));
    setCanSelectDeselect(canSelectDeselectItems(treeItems));

    return items;
  };

  const toggleSelect = (items: TreeItem[]) => {
    let selected: TreeItem[] = selectedList;
    for (const item of items) {
      const itemToUpdate = findItem(item.id, treeItems);
      if (itemToUpdate && !item.isDisabled && !item.isHidden) {
        item.isSelected = !itemToUpdate.isSelected;

        if (item.isSelected) {
          selected = [...selected, item];
        } else {
          selected = selected.filter((item) => item.id !== itemToUpdate.id);
        }
      }
    }

    setSelectedList(selected);

    if (onItemsSelected) {
      onItemsSelected(selected);
    }
  };

  const findItem = (id: string, items: TreeItem[]): TreeItem | undefined => {
    let foundItem: TreeItem | undefined = items.find((t) => t.id === id);
    if (foundItem) {
      return foundItem;
    }

    for (const item of items) {
      if (item.children) {
        foundItem = findItem(id, item.children);
        if (foundItem) {
          break;
        }
      }
    }
    return foundItem;
  };

  const toggleExpand = (item: TreeItem) => {
    const itemToUpdate = findItem(item.id, treeItems);
    if (itemToUpdate) {
      itemToUpdate.isExpanded = !itemToUpdate.isExpanded;
      let expanded = [];

      if (item.isExpanded) {
        expanded = [...expandedList, item];
        setExpandedList(expanded);
      } else {
        expanded = expandedList.filter((item) => item.id !== itemToUpdate.id);
        setExpandedList(expanded);
      }

      if (onItemsExpanded) {
        onItemsExpanded(expanded);
      }
    }
  };

  const search = (value: string) => {
    setSearchTerm(value);
    setTreeItems(filterItems(items, value));
  };

  const getSelectedItems = useCallback((items: TreeItem[]) => {
    let selected: TreeItem[] = [];
    for (const item of items) {
      if (item.isSelected) {
        selected.push(item);
      }

      if (item.children) {
        selected = [...selected, ...getSelectedItems(item.children)];
      }
    }
    return selected;
  }, []);

  const getExpandedItems = useCallback((items: TreeItem[]) => {
    let expandedItems: TreeItem[] = [];
    for (const item of items) {
      if (item.isExpanded) {
        expandedItems.push(item);
      }

      if (item.children) {
        expandedItems = [...expandedItems, ...getExpandedItems(item.children)];
      }
    }
    return expandedItems;
  }, []);

  const toggleExpandAll = () => {
    const isExpanded = !areAllExpanded(treeItems);

    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isExpanded = !item.isHidden ? isExpanded : item.isExpanded;
      });
    }

    setExpandedList(getExpandedItems(treeItems));
    setRootExpandAllText(areAllExpanded(treeItems) ? COLLAPSE_ALL : EXPAND_ALL);

    if (onItemsExpanded) {
      onItemsExpanded(getExpandedItems(treeItems));
    }
  };

  const toggleSelectAll = () => {
    const isSelected = !areAllSelected(treeItems);
    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isSelected = !item.isDisabled && !item.isHidden ? isSelected : item.isSelected;
        item.areAllChildrenSelected = isSelected;
      });
    }

    setSelectedList(getSelectedItems(treeItems));

    setRootSelectText(isSelected ? DESELECT_ALL : SELECT_ALL);

    if (onItemsSelected) {
      onItemsSelected(getSelectedItems(treeItems));
    }
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

    setSelectedList(getSelectedItems(treeItems));

    if (onItemsSelected) {
      onItemsSelected(getSelectedItems(treeItems));
    }
  };

  return (
    <>
      <div data-testid={`tree-view-${parentId || 'parent'}`} className="tree-view">
        {enableSearch && (
          <div className="form-group">
            {searchLabel && <Label className="font-weight-bold">{searchLabel}</Label>}
            <Input
              data-testid="tree-search-input"
              type="text"
              className="form-control"
              id="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => search(event.target.value)}
            />
          </div>
        )}

        <div className="d-flex justify-content-between">
          <Col xs="auto" className="pl-0">
            {canExpand && (
              <Button
                data-testid="btn-expand-all"
                id="btnExpandAll"
                color="link"
                className="p-0"
                onClick={toggleExpandAll}
              >
                {rootExpandAllText}
              </Button>
            )}
          </Col>

          {selectable && canSelectDeselect && (
            <Col xs="auto" className="pr-0">
              <Button data-testid="btn-select-all" color="link" className="pb-0 pt-0" onClick={() => toggleSelectAll()}>
                {rootSelectText}
              </Button>
            </Col>
          )}
        </div>

        <TreeItemContent
          items={treeItems}
          onItemExpanded={toggleExpand}
          onItemsSelected={toggleSelect}
          toggleSelectChildren={toggleSelectChildren}
          selectable={selectable}
        />
      </div>
    </>
  );
};

export default Tree;
