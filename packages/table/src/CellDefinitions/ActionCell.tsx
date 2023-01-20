import React, { useEffect, useMemo, useState } from 'react';
import * as Popper from 'popper.js';
import { useWindowDimensions } from '@availity/hooks';

import Icon from '@availity/icon';
import TableActionMenu, { TableActionMenuProps } from '../TableActionMenu';
import TableActionMenuItem from '../TableActionMenuItem';
import { Cell, IdType } from '../types/ReactTable';
import { RecordAction } from '../types/RecordAction';
import { PrimaryRecordAction } from '../types/PrimaryRecordAction';

export interface ActionCellConfig<T> {
  actions: RecordAction<T>[];
  primaryAction?: PrimaryRecordAction<T>;
  tableActionMenuProps?: Omit<TableActionMenuProps, 'children'>;
  isSticky?: boolean;
}

const ActionCell = <T extends IdType>({
  actions,
  primaryAction,
  tableActionMenuProps,
  isSticky,
}: ActionCellConfig<T>): ((cell: Cell<T>) => JSX.Element) => {
  const ActionCellDef = ({ row: { original, id } }: Cell<T>): JSX.Element => {
    const { height, width } = useWindowDimensions();

    const [menuPositionTransform, setMenuPositionTransform] = useState<string | undefined>();

    const stickyMenuModifiers = useMemo(
      () => ({
        eventListeners: {
          scroll: !isSticky,
        },
        maintainInitialPosition: {
          order: 849,
          enabled: isSticky,
          fn: (data: Popper.Data) => {
            if (!isSticky) {
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
      }),
      [isSticky, menuPositionTransform]
    );

    const isPrimaryActionVisible = primaryAction
      ? primaryAction.isVisible
        ? primaryAction.isVisible(original)
        : true
      : false;

    const { dropdownMenuProps, ...tableActionMenuAttrs } = tableActionMenuProps || {};

    useEffect(() => {
      setMenuPositionTransform(undefined);
    }, [height, width]);

    let modifiers: Popper.Modifiers | undefined;
    let dropDownMenuAttrs;
    if (dropdownMenuProps) {
      const { modifiers: modifierOverrides, ...dropdownMenuPropsOverride } = dropdownMenuProps;
      modifiers = modifierOverrides;
      dropDownMenuAttrs = dropdownMenuPropsOverride;
    }

    const onMenuToggled = (isOpen: boolean) => {
      if (!isOpen) {
        setMenuPositionTransform(undefined);
      }
    };

    return (
      <>
        <TableActionMenu
          id={`table_row_action_menu_${id}`}
          onMenuToggled={isSticky ? onMenuToggled : undefined}
          dropdownMenuProps={{
            modifiers: { ...stickyMenuModifiers, ...modifiers },
            ...dropDownMenuAttrs,
          }}
          {...tableActionMenuAttrs}
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
              typeof primaryAction.iconName === 'function' ? primaryAction.iconName(original) : primaryAction.iconName
            }
            title={typeof primaryAction.title === 'function' ? primaryAction.title(original) : primaryAction.title}
            onClick={() => primaryAction.onClick(original)}
          />
        )}
      </>
    );
  };

  return ActionCellDef;
};

export default ActionCell;
