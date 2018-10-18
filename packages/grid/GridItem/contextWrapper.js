import React from 'react';

import { GridUpdaterContext, GridCardContext } from '../constants';

const { Consumer: GridUpdaterConsumer } = GridUpdaterContext;
const { Consumer: GridCardConsumer } = GridCardContext;

const contextWrapper = Component => props => (
  <GridUpdaterConsumer>
    {fn => (
      <GridCardConsumer>
        {gridValues => (
          <Component {...props} updateItem={fn} gridValues={gridValues} />
        )}
      </GridCardConsumer>
    )}
  </GridUpdaterConsumer>
);

export default contextWrapper;
