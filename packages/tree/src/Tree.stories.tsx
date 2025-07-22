import React, { useCallback, useState } from 'react';
import { StoryObj } from '@storybook/react';
import cloneDeep from 'lodash/cloneDeep';
import { Button } from 'reactstrap';

import Tree, { buildTree, TreeItem } from '.';
import '../styles.scss';

export default {
  title: 'Bootstrap Components/Tree',
  component: Tree,
  parameters: {
    docs: {
      description: {
        component:
          'This component builds out a hierarchical tree of objects, with the ability to expand/collapse, select, and search.',
      },
    },
  },
};

type DefaultTreeProps = {
  enableSearch?: boolean;
  searchLabel?: string;
  expandAll?: boolean;
  selectable?: boolean;
  displayDisabledItems?: boolean;
};

const DefaultTree = ({ enableSearch, searchLabel, expandAll, selectable, displayDisabledItems }: DefaultTreeProps) => {
  const [isTreeVisible, setIsTreeVisible] = useState(true);

  const flatTreeItems: TreeItem[] = [
    {
      id: '1',
      name: 'Parent',
    },
    {
      id: '2',
      name: 'Second Level Parent',
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
      name: 'Availity Webinars',
      parentId: '1',
    },
    {
      id: '6',
      name: 'Validation Office',
      parentId: '7',
    },
    {
      id: '8',
      name: '2nd Root',
    },
    {
      id: '9',
      name: '2nd Root Child',
      parentId: '8',
    },
  ];

  const tree = buildTree(flatTreeItems, []);
  const [items, setItems] = useState(tree);
  const [initialState] = useState<TreeItem[]>(cloneDeep(tree));

  const [selectedItems] = useState<TreeItem[]>([items[0]]);
  const [newSelectedList, setNewSelectedList] = useState<TreeItem[]>([
    items[0],
    ...flatTreeItems.filter((item) => item.isSelected === true),
  ]);

  const onItemsSelected = useCallback((selected: TreeItem[]): void => {
    setNewSelectedList(selected);
  }, []);

  const resetTree = async () => {
    await setNewSelectedList([items[0], ...flatTreeItems.filter((item) => item.isSelected === true)]);
    await setItems(cloneDeep(initialState));
  };

  return (
    <>
      <Button className="p-2" onClick={() => resetTree()}>
        Reset Tree
      </Button>
      <Button className="p-2 ml-1" onClick={() => setIsTreeVisible(!isTreeVisible)}>
        {isTreeVisible ? 'Hide' : 'Show'} Tree
      </Button>
      <div className="p-1" style={{ width: 500 }}>
        {isTreeVisible && (
          <Tree
            expandAll={expandAll}
            enableSearch={enableSearch}
            searchLabel={searchLabel}
            items={items}
            onItemsSelected={onItemsSelected}
            selectedItems={selectedItems}
            selectable={selectable}
            displayDisabledItems={displayDisabledItems}
          />
        )}
      </div>
      <section>
        <h5>Selected Items:</h5>
        {newSelectedList
          ?.map((item) => ({ id: item.id, name: item.name }))
          .map((item) => <pre key={item.id}>{JSON.stringify(item, null, 2)}</pre>)}
      </section>
    </>
  );
};

export const _Default: StoryObj<typeof Tree> = {
  render: ({ enableSearch, searchLabel, expandAll, selectable, displayDisabledItems }) => (
    <DefaultTree
      enableSearch={enableSearch}
      searchLabel={searchLabel}
      expandAll={expandAll}
      selectable={selectable}
      displayDisabledItems={displayDisabledItems}
    />
  ),
  args: {
    enableSearch: true,
    searchLabel: 'Search Me',
    expandAll: false,
    selectable: true,
    displayDisabledItems: true,
  },
};
