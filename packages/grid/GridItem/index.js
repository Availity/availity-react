import React from 'react';

import { Card } from 'reactstrap';

import GridItem from './GridItem';
import SimpleGridItem from './Component';

const GridCard = props => <GridItem tag={Card} {...props} />;
const SimpleGridCard = props => <SimpleGridItem tag={Card} {...props} />;

export { GridItem, SimpleGridItem, GridCard, SimpleGridCard };
