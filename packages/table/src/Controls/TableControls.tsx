import React from 'react';
import { Form } from 'reactstrap';

type Props = {
    id?: string;
    disabled?: boolean;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableControls = ({
    id,
    disabled,
    children,
    ...rest
}: Props): JSX.Element => {
    console.log(disabled);
    return (
        <div id={id} className="table-controls" {...rest}>
            <Form inline>
                {children}
            </Form>
        </div>
    );
};


export default TableControls;