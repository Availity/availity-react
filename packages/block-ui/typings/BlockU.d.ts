import * as React from 'react';
export interface BlockUIProps extends React.HTMLAttributes<HTMLDivElement> {
  blocking?: boolean;
  keepInView?: boolean;
}

declare const BlockUI: React.FunctionComponent<BlockUIProps>;

export default BlockUI;
