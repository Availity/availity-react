import React, { ReactNode } from 'react';
import { Provider, Root, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';
import css from './FavoritesTooltip.module.scss';

const Tooltip = ({
  children,
  content,
  'data-testid': dataTestId,
}: {
  children: ReactNode;
  content: string;
  'data-testid'?: string;
}): JSX.Element => (
  <Provider>
    <Root>
      <Trigger asChild>{children}</Trigger>
      <Content side="top" className={css.content} data-testid={dataTestId}>
        {content}
        <Arrow className={css.arrow} offset={7} />
      </Content>
    </Root>
  </Provider>
);

export default Tooltip;
