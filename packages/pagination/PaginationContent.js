import React, { useContext } from 'react';
import { Util } from 'reactstrap';
import { PaginationContext } from './Pagination';

const PaginationContent = ({ component: Component }) => {
  const { page } = useContext(PaginationContext);

  return (
    <React.Fragment>
      {page.items.map((value, key) => {
        // eslint-disable-next-line no-console
        console.warn("Warning a Pagination Item doesn't have a key:", value);

        return <Component key={value.key || key} {...value} />;
      })}
    </React.Fragment>
  );
};

PaginationContent.propTypes = {
  component: Util.tagPropType,
};

export default PaginationContent;
