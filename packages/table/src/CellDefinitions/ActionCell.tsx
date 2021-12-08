import React from 'react';
import Icon from '@availity/icon';
import TableActionMenu from '../TableActionMenu';
import TableActionMenuItem from '../TableActionMenuItem';
import { Cell, IdType } from '../types/ReactTable';
import { RecordAction } from '../types/RecordAction';
import { PrimaryRecordAction } from '../types/PrimaryRecordAction';

export interface ActionCellConfig<T> {
  actions: RecordAction<T>[];
  primaryAction?: PrimaryRecordAction<T>
}

const ActionCell = <T extends IdType>({ actions, primaryAction }: ActionCellConfig<T>): (cell: Cell<T>) => JSX.Element => {
  const ActionCellDef = ({ row: { original }, index }: Cell<T>): JSX.Element => (
    <>
      <TableActionMenu
        id={`table_row_action_menu_${original.id ? original.id : index}`}
      >
        {actions.map((action, index) => (
          <TableActionMenuItem
            key={action.id}
            id={`table_row_action_menu_item_${index}`}
            action={action}
            record={original}
          />
        ))}
      </TableActionMenu>
      {primaryAction && (
        <Icon
          name={primaryAction.iconName}
          title={primaryAction.title}
          onClick={() => primaryAction.onClick(original)}
        />
      )}
    </>
  );

  return ActionCellDef;
};

export default ActionCell;
