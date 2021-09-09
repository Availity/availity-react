import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTableContext } from './AvTable';

const AvTableRow = ({ className, selectedRowClassName, row, ...rest }) => {
    const {
        scrollable,
        prepareRow,
        selectedRows
    } = useTableContext();

    const buildRowClass = (row) => {
        let className = '';
        if (scrollable) {
            className = 'fixed-width-tr';
        }

        if (_.includes(selectedRows.map(sr => sr.id), row.id)) {
            className += selectedRowClassName;
        }

        return {
            className
        }
    }

    const buildCellClass = () => ({
        className: scrollable ? 'fixed-width-text' : ''
    })

    prepareRow(row);

    return (
        <tr {...row.getRowProps(buildRowClass(row))} {...rest}>
            {row.cells.map((cell) => (
                <td {...cell.getCellProps(buildCellClass())}>{cell.render('Cell')}</td>
            ))}
        </tr>
    );

};

AvTableRow.propTypes = {
    row: PropTypes.object,
    className: PropTypes.string,
    selectedRowClassName: PropTypes.string
};

export default AvTableRow;
