import { useCallback, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Tree } from '.';

import '../styles.scss';
import TreeItem from './TreeItem';

export default {
  title: 'Components/Tree',
} as Meta;

export const Default: Story = ({ enableSearch, searchLabel, expandAll, selectable }) => {
  const [selectedItems, setSelectedItems] = useState<TreeItem[]>([]);
  const [newSelectedList, setNewSelectedList] = useState<TreeItem[]>([]);

  const [items] = useState<TreeItem[]>([
    {
      id: '1',
      name: 'Parent',
      children: [
        {
          id: '2',
          name: 'Second Level Parent',
          children: [
            {
              id: '3',
              name: 'Child Test 1',
              isDisabled: true,
            },
            {
              id: '4',

              name: 'Child Test 2',
              children: [
                {
                  id: '5',

                  name: 'Child Test 3',
                },
              ],
            },
          ],
        },
        {
          id: '7',
          name: 'Availity Webinars',
          children: [
            {
              id: '6',
              name: 'Validation Office',
            },
          ],
        },
      ],
    },
  ]);

  const onItemsSelected = useCallback((selected: TreeItem[]): void => {
    console.log(selected);
    setNewSelectedList(selected);
  }, []);

  return (
    <>
      <div style={{ width: 500 }}>
        <Tree
          expandAll={expandAll}
          enableSearch={enableSearch}
          searchLabel={searchLabel}
          items={items}
          onItemsSelected={onItemsSelected}
          selectedItems={selectedItems}
          selectable={selectable}
        />
      </div>
      <section>
        <h5>Selected Items:</h5>
        {newSelectedList
          ?.map((item) => ({ id: item.id, name: item.name }))
          .map((item) => (
            <pre key={item.id}>{JSON.stringify(item, null, 2)}</pre>
          ))}
      </section>
    </>
  );
};
Default.storyName = 'default';
Default.args = {
  enableSearch: true,
  searchLabel: 'Search Me',
  expandAll: true,
  selectable: false,
};
