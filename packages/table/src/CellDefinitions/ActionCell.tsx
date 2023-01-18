import React, { useState } from 'react';
import Icon from '@availity/icon';
import TableActionMenu, { TableActionMenuProps } from '../TableActionMenu';
import TableActionMenuItem from '../TableActionMenuItem';
import { Cell, IdType } from '../types/ReactTable';
import { RecordAction } from '../types/RecordAction';
import { PrimaryRecordAction } from '../types/PrimaryRecordAction';

export interface ActionCellConfig<T> {
  actions: RecordAction<T>[];
  primaryAction?: PrimaryRecordAction<T>;
  tableActionMenuProps?: TableActionMenuProps;
  isStatic?: boolean;
}

const ActionCell = <T extends IdType>({
  actions,
  primaryAction,
  tableActionMenuProps,
  isStatic,
}: ActionCellConfig<T>): ((cell: Cell<T>) => JSX.Element) => {
  const ActionCellDef = ({ row: { original, id } }: Cell<T>): JSX.Element => {
    const [menuPositionTransform, setMenuPositionTransform] = useState<string | undefined>();

    const isPrimaryActionVisible = primaryAction
      ? primaryAction.isVisible
        ? primaryAction.isVisible(original)
        : true
      : false;

    return (
      <>
        <TableActionMenu
          id={`table_row_action_menu_${id}`}
          dropdownMenuProps={{
            modifiers: {
              maintainInitialPosition: {
                order: 849,
                fn: (data) => {
                  if (!isStatic) {
                    return data;
                  }

                  if (!menuPositionTransform) {
                    setMenuPositionTransform(data.styles.transform);
                  } else {
                    data.styles.transform = menuPositionTransform;
                  }

                  return data;
                },
                phase: 'beforeWrite',
                requires: ['computeStyles'],
              },
            },
          }}
          {...tableActionMenuProps}
        >
          {actions.map((action) => (
            <TableActionMenuItem
              key={action.id}
              id={`table_row_action_menu_item_${id}`}
              action={action}
              record={original}
            />
          ))}
        </TableActionMenu>
        {primaryAction && isPrimaryActionVisible && (
          <Icon
            data-testid={`table_row_action_menu_item_${id}_primaryAction`}
            name={
              typeof primaryAction.iconName === 'string' ? primaryAction.iconName : primaryAction.iconName(original)
            }
            title={typeof primaryAction.title === 'string' ? primaryAction.title : primaryAction.title(original)}
            onClick={() => primaryAction.onClick(original)}
          />
        )}
      </>
    );
  };

  return ActionCellDef;
};

export default ActionCell;
