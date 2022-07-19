import { useCallback, useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Tree, { buildTree } from '.';

import '../styles.scss';
import TreeItem from './TreeItem';

export default {
  title: 'Components/Tree',
} as Meta;

export const Default: Story = ({ enableSearch, searchLabel, expandAll, selectable, expandParent }) => {
  const [selectedItems] = useState<TreeItem[]>([]);
  const [newSelectedList, setNewSelectedList] = useState<TreeItem[]>([]);

  const flatTreeItems: TreeItem[] = [
    {
      id: '1',
      name: 'Parent that has some long text',
    },
    {
      id: '2',
      name: 'Second Level Parent with long text',
      parentId: '1',
    },
    {
      id: '3',
      name: 'Child Test 1',
      isDisabled: true,
      parentId: '2',
    },
    {
      id: '4',
      name: 'Child Test 2',
      parentId: '2',
    },
    {
      id: '5',
      name: 'Child Test 3',
      parentId: '4',
    },
    {
      id: '7',
      name: 'Child Test 3',
      parentId: '1',
    },
    {
      id: '6',
      name: 'Child Test 4',
      parentId: '7',
    },
  ];

  const [items] = useState(buildTree(flatTreeItems));

  useEffect(() => {
    console.log('items', items);
  }, [items]);

  const onItemsSelected = useCallback((selected: TreeItem[]): void => {
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
          expandParent={expandParent}
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
  expandAll: false,
  selectable: true,
  expandParent: true,
};
