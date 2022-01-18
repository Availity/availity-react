import React, { cloneElement, isValidElement, useEffect, useState } from 'react';
import { Form } from 'reactstrap';

type Props = {
  id?: string;
  disabled?: boolean;
  children?: React.ReactNode[] | React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const TableControls = ({ id, disabled, children, ...rest }: Props): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled || false);

  useEffect(() => {
    setIsDisabled(disabled || false);
  }, [disabled]);

  const childElements = Array.isArray(children) ? children : [children];
  return (
    <div id={id} className="table-controls" {...rest}>
      <Form inline>
        {childElements?.map((child: React.ReactNode, index: number) => {
          if (!isValidElement(child)) {
            return null;
          }

          return cloneElement(child, { disabled: isDisabled, key: `table_controls_${index}` });
        })}
      </Form>
    </div>
  );
};

export default TableControls;
