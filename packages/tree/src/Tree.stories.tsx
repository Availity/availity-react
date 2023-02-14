import { useCallback, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import cloneDeep from 'lodash/cloneDeep';
import Tree, { buildTree } from '.';

import '../styles.scss';
import TreeItem from './TreeItem';
import { Button } from 'reactstrap';

export default {
  title: 'Components/Tree',
  parameters: {
    docs: {
      description: {
        component:
          'This component builds out a hierarchical tree of objects, with the ability to expand/collapse, select, and search.',
      },
    },
  },
} as Meta;

export const Default: Story = ({ enableSearch, searchLabel, expandAll, selectable, expandParent }) => {
  const [newSelectedList, setNewSelectedList] = useState<TreeItem[]>([]);
  const [isTreeVisible, setIsTreeVisible] = useState(true);

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
    {
      id: '8',
      name: 'Child Test 5',
      parentId: '7',
    },
    {
      id: '9',
      name: '2nd Root',
    },
    {
      id: '10',
      name: '2nd Root Child',
      parentId: '9',
    },
  ];

  const tree = buildTree(flatTreeItems, [flatTreeItems.find((o) => !o.parentId)?.id || '']);
  const [items, setItems] = useState(tree);
  const [initialState] = useState<TreeItem[]>(cloneDeep(tree));

  const [selectedItems] = useState<TreeItem[]>([items[0]]);

  const onItemsSelected = useCallback((selected: TreeItem[]): void => {
    setNewSelectedList(selected);
  }, []);

  const resetTree = async () => {
    await setNewSelectedList([]);
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
          />
        )}
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
('');
export const hidden_TreeItemComponent = ({
  isExpanded = false,
  isSelected = false,
  isHidden = false,
  isDisabled = false,
}: TreeItem): JSX.Element => {
  return <></>;
};

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Tree</h5>
    <ArgsTable of={Tree} />

    <h4>Tree Item</h4>
    <ArgsTable of={hidden_TreeItemComponent} />
  </>
);
Default.storyName = 'default';
Default.args = {
  enableSearch: true,
  searchLabel: 'Search Me',
  expandAll: false,
  selectable: true,
};
