import React from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import Icon from '@availity/icon';

import TreeItem from './TreeItem';

type TreeItemContentProps = {
  /** The items that are displayed in the tree view item. */
  items: TreeItem[];
  /** Whenever an item is expanded in the tree, it fires this event to let the parent know of the items that are expanded. */
  onItemExpanded: (item: TreeItem) => void;
  /** Whenever an item is selected in the tree, it fires this event to let the parent know of the items that are selected. */
  onItemsSelected: (items: TreeItem[]) => void;
  /** Whenever the select all children checkbox is checked, if fire this event to appropriately select all of the children. */
  toggleSelectChildren: (item: TreeItem) => void;
  selectable?: boolean;
};

const TreeItemContent = ({
  items,
  onItemExpanded,
  onItemsSelected,
  selectable,
  toggleSelectChildren,
}: TreeItemContentProps) => (
  <ul>
    {items.map((item) => (
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
                        onChange={() => onItemsSelected([item])}
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
                        onClick={() => onItemExpanded(item)}
                      >
                        <Icon size="lg" className="expand-tree" name={item.isExpanded ? 'down-dir' : 'right-dir'} />
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </li>
        )}
        {item.children && item.children.length > 0 && item.isExpanded && (
          <ul data-testid={`tree-view-${item.id}`}>
            <TreeItemContent
              items={item.children}
              onItemExpanded={onItemExpanded}
              onItemsSelected={onItemsSelected}
              toggleSelectChildren={toggleSelectChildren}
              selectable={selectable}
            />
          </ul>
        )}
      </React.Fragment>
    ))}
  </ul>
);

export default TreeItemContent;
