import Icon from '@availity/icon';
import { useMount } from '@availity/hooks';
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
  searchLabel?: string;
  enableSearch?: boolean;
  items: TreeItem[];
  isRoot?: boolean;
  onItemsSelected?: (selectedItems: TreeItem[]) => void;
  onItemsExpanded?: (expandedItems?: TreeItem[]) => void;
  onDismount?: () => void;
  parentId?: string;
  selectedItems?: TreeItem[];
  expandAll?: boolean;
  selectable?: boolean;
};

export const buildTree = (items: TreeItem[], expandedIds?: string[], selectedIds?: string[]) => {
  const tree: TreeItem[] = [];
  const parents: Map<string, TreeItem> = new Map<string, TreeItem>();

  for (const item of items) {
    item.children = [];
    item.isSelected = selectedIds ? selectedIds.includes(item.id) : item.isSelected;
    item.isExpanded = expandedIds ? expandedIds.includes(item.id) : item.isExpanded;
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
  onDismount,
}: TreeProps): JSX.Element | null => {
  const [treeItems, setTreeItems] = useState(items);
  const [selectedList, setSelectedList] = useState(selectedItems);
  const [allExpanded, setAllExpanded] = useState(expandAll);
  const [searchTerm, setSearchTerm] = useState('');

  useMount(() => {
    return () => {
      if (!isRoot) {
        return;
      }

      if (onDismount) {
        onDismount();
      }
    };
  });

  const areAllExpanded = (items: TreeItem[]) => {
    let allExpanded = items.every((item) => item.isExpanded || item.children?.length === 0);
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

  useEffect(() => {
    if (areAllSelected(treeItems)) {
      setRootSelectText(DESELECT_ALL);
    } else {
      setRootSelectText(SELECT_ALL);
    }

    for (const item of treeItems) {
      item.areAllChildrenSelected = areAllChildrenSelected(item);
    }
  }, [selectedList, areAllSelected]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectedList(selectedItems);
      for (const item of treeItems) {
        walkTree(item, (item) => {
          item.areAllChildrenSelected = areAllChildrenSelected(item);
        });
      }
    }
  }, [selectedItems, walkTree]);

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
    const isSelected = !areAllSelected(treeItems);
    for (const item of treeItems) {
      walkTree(item, (item) => {
        item.isSelected = isSelected;
        item.areAllChildrenSelected = isSelected;
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
        if (child.isDisabled) {
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
    setAllExpanded(areAllExpanded(treeItems));

    if (isRoot) {
      if (areAllExpanded(items)) {
        setRootExpandAllText(COLLAPSE_ALL);
      } else {
        setRootExpandAllText(EXPAND_ALL);
      }
    }

    if (onItemsExpanded) {
      onItemsExpanded();
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
          <div className="form-group mb-1">
            <Button
              data-testid="btn-expand-all"
              id="btnExpandAll"
              color="link"
              className="p-0"
              onClick={toggleExpandAll}
            >
              {rootExpandAllText}
            </Button>
          </div>
        )}

        <ul>
          {treeItems.map((item) => (
            <li data-testid={`tree-view-item-${item.id}`} key={`tree-view-item-${item.id}`}>
              {!item.isHidden && (
                <div>
                  <Row>
                    <Col sm="7">
                      <FormGroup check>
                        {!item.isDisabled && selectable && (
                          <Input
                            id={`chkSelect_${item.id}`}
                            name={`chkSelect_${item.id}`}
                            data-testid={`chk-tree-view-item-select-${item.id}`}
                            type="checkbox"
                            checked={item.isSelected}
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
                      <Col sm="5">
                        <div className="form-inline d-flex justify-content-end ml-auto align-items-center">
                          {isRoot && selectable && (
                            <Button
                              data-testid="btn-select-all"
                              color="link"
                              className="pb-0 pt-0"
                              onClick={() => toggleSelectAll()}
                            >
                              {rootSelectText}
                            </Button>
                          )}
                          {selectable && (
                            <FormGroup check>
                              <Input
                                data-testid={`chkSelectAllChildren_${item.id}`}
                                id={`chkSelectAllChildren_${item.id}`}
                                type="checkbox"
                                checked={item.areAllChildrenSelected}
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
                            <Icon size="lg" className="expand-tree" name={item.isExpanded ? 'down-dir' : 'right-dir'} />
                          </Button>
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>
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
