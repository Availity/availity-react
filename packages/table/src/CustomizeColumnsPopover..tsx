import React, { useState, useEffect } from 'react';
import Icon from '@availity/icon';
import { Button, Popover, PopoverBody, Table, UncontrolledTooltip } from 'reactstrap';
import { List, arrayMove } from 'react-movable';
import { useTableContext } from './TableContext';
import { Column, ExtendedTableHeader } from './types';
import { IdType } from './types/ReactTable';

const CustomizeColumnsPopover = <T extends IdType>(): JSX.Element => {
  const { instance, onColumnsCustomized, setIsCustomizingColumns, onReset, minimumNumberOfColumns, defaultColumns } =
    useTableContext();
  const { allColumns, setColumnOrder, setHiddenColumns } = instance;
  const [isCustomizableColumnsPopoverOpen, setIsCustomizableColumnsPopoverOpen] = useState(false);
  const [availableColumns, setAvailableColumns] = useState(allColumns.filter((col: Column<T>) => col.canCustomize));

  const [userColumns, setUserColumns] = useState(
    availableColumns.filter((col: Column<T>) => col.canCustomize && col.isVisible).map((col: Column<T>) => col.id)
  );

  useEffect(() => {
    setAvailableColumns(allColumns.filter((col: Column<T>) => col.canCustomize));
  }, [allColumns]);

  useEffect(() => {
    setUserColumns(
      availableColumns.filter((col: Column<T>) => col.canCustomize && col.isVisible).map((col: Column<T>) => col.id)
    );
  }, [availableColumns]);

  const togglePopover = () => {
    const isOpen = !isCustomizableColumnsPopoverOpen;
    setIsCustomizableColumnsPopoverOpen(isOpen);
    if (setIsCustomizingColumns) {
      setIsCustomizingColumns(isOpen);
    }
  };

  const resetToDefault = () => {
    const defaultCols = defaultColumns as Column<T>[];
    setHiddenColumns(
      defaultCols?.filter((col: Column<T>) => col.canCustomize && col.hidden).map((col: Column<T>) => col.accessor)
    );
    setUserColumns(
      defaultCols
        ?.filter((col: Column<T>) => col.canCustomize && col.hidden !== true)
        .map((col: Column<T>) => col.accessor)
    );
    if (onReset) {
      onReset();
    }
    togglePopover();
  };

  const submitCustomizeFields = () => {
    setColumnOrder(
      availableColumns.filter((col: Column<T>) => userColumns.includes(col.id)).map((col: Column<T>) => col.id)
    );

    const hiddenCols = availableColumns.filter((col: Column<T>) => !userColumns.includes(col.id));
    setHiddenColumns(hiddenCols.map((ac: Column<T>) => ac.id));

    if (onColumnsCustomized) {
      onColumnsCustomized(userColumns, hiddenCols);
    }

    togglePopover();
  };

  return (
    <>
      <Button
        id="btn_open_customizable_columns"
        className="float-right customize-column-link"
        color="link"
        onClick={togglePopover}
      >
        <Icon name="edit" aria-label="customizable-columns" />
      </Button>
      <UncontrolledTooltip boundary="window" placement="left" target="btn_open_customizable_columns">
        Customize Columns
      </UncontrolledTooltip>
      <Popover
        className="edit-table-columns"
        innerClassName="sortable-table-fields-content"
        placement="left-start"
        isOpen={isCustomizableColumnsPopoverOpen}
        target="btn_open_customizable_columns"
        toggle={togglePopover}
        boundariesElement="window"
      >
        <PopoverBody>
          <section>
            <div className="row">
              <h5 className="header-margin col-sm-5">Columns</h5>
              <div className="reset-to-default">
                <Button color="link" onClick={resetToDefault}>
                  Reset to Default
                </Button>
              </div>
            </div>
            <Icon name="info-circle" /> Drag the labels below to reorder your table.
          </section>

          <List
            values={availableColumns}
            onChange={({ oldIndex, newIndex }) => {
              setAvailableColumns(arrayMove(availableColumns, oldIndex, newIndex));
            }}
            renderList={({ children, props }) => (
              <Table borderless className="sortable-table-fields-content">
                <tbody {...props}>{children}</tbody>
              </Table>
            )}
            renderItem={({ value, props, isDragged }) => {
              const colDef = value as unknown as ExtendedTableHeader<T>;
              const row = (
                <tr
                  {...props}
                  className="customizable-column-item"
                  style={{
                    ...props.style,
                    cursor: 'grab',
                  }}
                >
                  <td className="align-center">
                    <Icon id="icon-sort" name="sort" aria-label="sort" />
                  </td>
                  <td>
                    <input
                      id={`${colDef.id}`}
                      type="checkbox"
                      checked={userColumns.includes(colDef.id)}
                      onChange={async (e) => {
                        if (e.target.checked) {
                          setUserColumns([...userColumns, colDef.id]);
                        } else {
                          setUserColumns(userColumns.filter((col: string) => col !== colDef.id));
                        }
                      }}
                    />
                  </td>
                  <td>{colDef.Header}</td>
                </tr>
              );

              return isDragged ? (
                <div {...props} className="grabbed-item">
                  <Table borderless className="configure-columns sortable-table-fields-content">
                    <tbody>
                      <tr>
                        <td className="align-center">
                          <Icon id="icon-sort" name="sort" aria-label="sort" />
                        </td>
                        <td>
                          <input
                            id={`${colDef.id}`}
                            type="checkbox"
                            checked={userColumns.includes(colDef.id)}
                            onChange={async (e) => {
                              if (e.target.checked) {
                                setUserColumns([...userColumns, colDef.id]);
                              } else {
                                setUserColumns(userColumns.filter((col: string) => col !== colDef.id));
                              }
                            }}
                          />
                        </td>
                        <td>{colDef.Header}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ) : (
                row
              );
            }}
          />
          <section className="d-flex justify-content-center">
            <div className="customize-columns-buttons justify-content-center">
              <Button id="btnCustomizeColumnsCancel" color="light" onClick={togglePopover}>
                Cancel
              </Button>
              <Button
                id="btnCustomizeColumnsSubmit"
                disabled={userColumns.length < minimumNumberOfColumns}
                color="primary"
                onClick={submitCustomizeFields}
                className="ml-2"
              >
                Submit
              </Button>
            </div>
          </section>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default CustomizeColumnsPopover;
