import Icon from '@availity/icon';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

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
  /** Determines whether this is the root of the tree structure */
  isRoot?: boolean;
  /** Whenever an item is selected in the tree, it fires this event to let the parent know of the items that are selected. */
  onItemsSelected?: (selectedItems: TreeItem[]) => void;
  /** Whenever an item is expanded in the tree, it fires this event to let the parent know of the items that are expanded. */
  onItemsExpanded?: (expandedItems?: TreeItem[]) => void;
  /** The id of the parent tree */
  parentId?: string;
  /** The items which are selected in the tree */
  selectedItems?: TreeItem[];
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
  isRoot = true,
  searchLabel,
  enableSearch = false,
  items = [],
  selectedItems = [],
  onItemsSelected,
  onItemsExpanded,
  expandAll = false,
  parentId,
  selectable = false,
  displayDisabledItems = true,
}: TreeProps): JSX.Element | null => {
  const [treeItems, setTreeItems] = useState<TreeItem[]>(items || []);
  const [selectedList, setSelectedList] = useState(selectedItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [canSelectDeselect, setCanSelectDeselect] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const [rootSelectText, setRootSelectText] = useState(SELECT_ALL);
  const [rootExpandAllText, setRootExpandAllText] = useState(expandAll ? COLLAPSE_ALL : EXPAND_ALL);

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
    let allSelected = items.filter((item) => !item.isDisabled && !item.isHidden).every((item) => item.isSelected);
    for (const item of items) {
      if (item.children) {
        allSelected = allSelected && areAllSelected(item.children);
      }
    }
    return allSelected;
  }, []);

  useEffect(() => {
    setTreeItems(items);
    setSearchTerm('');
  }, [items]);

  const walkTree = useCallback((item: TreeItem, fn: (item: TreeItem) => void) => {
    fn(item);
    if (item.children) {
      for (const child of item.children) {
        walkTree(child, fn);
      }
    }
  }, []);

  useEffect(() => {
    setSelectedList(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (!treeItems) {
      return;
    }

    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isExpanded = item.isExpanded || expandAll || false;
        item.isDisabled = item.isDisabled || false;
        item.isHidden = (item.isDisabled && displayDisabledItems === false) || item.isHidden || false;
        item.isSelected = selectedList.map((item) => item.id).includes(item.id) || item.isSelected || false;
        item.areAllChildrenSelected = areAllChildrenSelected(item);
      });
    }
  }, [treeItems, expandAll, selectedList, displayDisabledItems]);

  useEffect(() => {
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

    for (const item of treeItems) {
      item.areAllChildrenSelected = areAllChildrenSelected(item);
    }

    setCanExpand(canExpandCollapseItems(treeItems));
    setCanSelectDeselect(canSelectDeselectItems(treeItems));

    const areExpanded = areAllExpanded(items);
    const areSelected = areAllSelected(items);

    setRootExpandAllText(!areExpanded ? EXPAND_ALL : COLLAPSE_ALL);
    setRootSelectText(!areSelected ? SELECT_ALL : DESELECT_ALL);
  }, [treeItems, selectedList, areAllSelected]);

  const filterItems = (items: TreeItem[], searchTerm: string) => {
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
  };

  const toggleSelect = (item: TreeItem) => {
    const itemToUpdate = treeItems.find((t) => t.id === item.id);
    if (itemToUpdate && !item.isDisabled && !item.isHidden) {
      item.isSelected = !item.isSelected;
      let selected = [];

      if (item.isSelected) {
        selected = [...selectedList, item];
        setSelectedList(selected);
      } else {
        selected = selectedList.filter((item) => item.id !== itemToUpdate.id);
        setSelectedList(selected);
      }

      if (onItemsSelected) {
        onItemsSelected(selected);
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
    setSearchTerm(value);
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
    const isExpanded = !areAllExpanded(treeItems);

    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isExpanded = !item.isHidden ? isExpanded : item.isExpanded;
      });
    }

    setTreeItems([...treeItems]);
  };

  const toggleSelectAll = () => {
    const isSelected = !areAllSelected(treeItems);
    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isSelected = !item.isDisabled && !item.isHidden ? isSelected : item.isSelected;
        item.areAllChildrenSelected = areAllChildrenSelected(item);
      });
    }

    setSelectedList(getSelectedItems(treeItems));

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
    setTreeItems([...treeItems]);

    if (onItemsSelected) {
      onItemsSelected(getSelectedItems(treeItems));
    }
  };

  const onChildrenSelected = useCallback(() => {
    setSelectedList(getSelectedItems(treeItems));
    for (const child of treeItems || []) {
      walkTree(child, (child) => {
        if (child.isDisabled || child.isHidden) {
          return;
        }
        child.areAllChildrenSelected = areAllChildrenSelected(child);
      });
    }
    if (onItemsSelected) {
      onItemsSelected(getSelectedItems(treeItems));
    }
  }, [getSelectedItems, treeItems]);

  const onChildrenExpanded = () => {
    if (onItemsExpanded) {
      onItemsExpanded();
    }
  };

  return (
    <>
      <div data-testid={`tree-view-${parentId || 'parent'}`} className="tree-view">
        {isRoot && enableSearch && (
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

        {isRoot && (
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
                <Button
                  data-testid="btn-select-all"
                  color="link"
                  className="pb-0 pt-0"
                  onClick={() => toggleSelectAll()}
                >
                  {rootSelectText}
                </Button>
              </Col>
            )}
          </div>
        )}

        <ul>
          {treeItems.map((item) => (
            <React.Fragment key={`tree-view-item-${item.id}`}>
              {!item.isHidden && (
                <li data-testid={`tree-view-item-${item.id}`}>
                  <div>
                    <Row>
                      <Col xs="10" sm="9">
                        <FormGroup check>
                          {!item.isDisabled && selectable && (
                            <Input
                              id={`chkSelect_${item.id}`}
                              name={`chkSelect_${item.id}`}
                              data-testid={`chk-tree-view-item-select-${item.id}`}
                              type="checkbox"
                              checked={item.isSelected || false}
                              onChange={() => toggleSelect(item)}
                            />
                          )}
                          <Label
                            data-testid={`tree-view-item-${item.id}-label`}
                            className={item.isDisabled ? 'text-muted' : ''}
                            check
                            for={`chkSelect_${item.id}`}
                          >
                            {item.name}
                          </Label>
                        </FormGroup>
                      </Col>

                      {item.children && item.children.length > 0 && (
                        <Col xs="2" sm="3">
                          <div className="form-inline d-flex justify-content-end ml-auto align-items-center">
                            {selectable && !item.isDisabled && (
                              <FormGroup check>
                                <Input
                                  data-testid={`chkSelectAllChildren_${item.id}`}
                                  id={`chkSelectAllChildren_${item.id}`}
                                  type="checkbox"
                                  checked={item.areAllChildrenSelected || false}
                                  onChange={() => toggleSelectChildren(item)}
                                />{' '}
                              </FormGroup>
                            )}
                            <Button
                              data-testid={`btn-expand-all-${item.id}`}
                              color="link"
                              className="icon-expand p-0 text-decoration-none"
                              onClick={() => toggleExpand(item)}
                            >
                              <Icon
                                size="lg"
                                className="expand-tree"
                                name={item.isExpanded ? 'down-dir' : 'right-dir'}
                              />
                            </Button>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>
                </li>
              )}
              {item.children && item.children.length > 0 && item.isExpanded && (
                <ul>
                  <Tree
                    isRoot={false}
                    items={item.children}
                    parentId={item.id}
                    selectedItems={selectedList}
                    onItemsSelected={onChildrenSelected}
                    onItemsExpanded={onChildrenExpanded}
                    expandAll={expandAll}
                    selectable={selectable}
                    displayDisabledItems={displayDisabledItems}
                  />
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tree;
