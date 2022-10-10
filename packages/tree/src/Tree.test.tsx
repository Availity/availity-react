import React from 'react';
import { render, waitFor, fireEvent, screen, cleanup } from '@testing-library/react';
import Tree, { buildTree } from './Tree';
import TreeItem from './TreeItem';

const items: TreeItem[] = [
  {
    id: '1',
    name: 'Parent',
    children: [
      {
        id: '2',
        name: 'Second Level Parent',
        parentId: '1',
        children: [
          {
            id: '3',
            name: 'Child Test 1',
            isDisabled: true,
            parentId: '2',
            children: [],
          },
          {
            id: '4',
            name: 'Child Test 2',
            parentId: '2',
            children: [
              {
                id: '5',
                name: 'Child Test 3',
                parentId: '4',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: '7',
        name: 'Availity Webinars',
        parentId: '1',
        children: [
          {
            id: '6',
            name: 'Validation Office',
            parentId: '7',
            children: [],
          },
        ],
      },
    ],
  },
];

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
];

describe('buildTree', () => {
  afterEach(() => {
    cleanup();
  });

  test('buildTree should create a a hierarchical structure from a flat list', () => {
    const hierarchicalTreeItems = buildTree(flatTreeItems);
    expect(hierarchicalTreeItems).toEqual(items);
  });
});

describe('Tree', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render parent with children', async () => {
    render(<Tree items={[...items]} expandAll />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    const treeElementParent1 = await waitFor(() => screen.getByTestId('tree-view-1'));
    expect(treeElementParent1).not.toBeNull();

    expect(treeElementParent1.querySelector('[data-testid=tree-view-item-2]')).not.toBeNull();
    expect(treeElementParent1.querySelector('[data-testid=tree-view-item-7]')).not.toBeNull();

    const treeElementParent7 = await waitFor(() => screen.getByTestId('tree-view-7'));
    expect(treeElementParent7).not.toBeNull();

    const treeElementParent4 = await waitFor(() => screen.getByTestId('tree-view-4'));
    expect(treeElementParent4).not.toBeNull();
  });

  test('should select items on load', async () => {
    const onItemsSelected = jest.fn();

    render(
      <Tree
        items={[...items]}
        expandAll
        selectable
        onItemsSelected={onItemsSelected}
        selectedItems={[
          {
            id: '7',
            name: 'Availity Webinars',
          },
        ]}
      />
    );

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    const treeItemCheckBoxSelected = await waitFor(() => screen.getByTestId('chk-tree-view-item-select-7'));
    expect(treeItemCheckBoxSelected).not.toBeNull();
    expect(treeItemCheckBoxSelected).toBeChecked();

    const treeItemCheckBoxNotSelected = await waitFor(() => screen.getByTestId('chk-tree-view-item-select-1'));
    expect(treeItemCheckBoxNotSelected).not.toBeNull();
    expect(treeItemCheckBoxNotSelected).not.toBeChecked();

    fireEvent.click(screen.getByTestId('chk-tree-view-item-select-7'));
    await waitFor(async () => {
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(0);
    });
  });

  test('should remove checkbox when item is disabled and mute text', async () => {
    const { queryByTestId } = render(<Tree items={items} expandAll />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    expect(queryByTestId('chk-tree-view-item-select-3')).toBeNull();

    expect(screen.getByTestId('tree-view-item-3-label')).toHaveClass('text-muted');
  });

  test('should expand item on click', async () => {
    const onItemExpanded = jest.fn();

    const theseItems = [...items];
    theseItems.forEach((item) => (item.isExpanded = false));
    const { queryByTestId } = render(<Tree items={[...items]} expandAll={false} onItemsExpanded={onItemExpanded} />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    expect(queryByTestId('tree-view-2')).toBeNull();
    expect(queryByTestId('tree-view-7')).toBeNull();

    fireEvent.click(screen.getByTestId('btn-expand-all-1'));

    await waitFor(async () => {
      expect(queryByTestId('tree-view-2')).not.toBeNull();
      expect(queryByTestId('tree-view-7')).not.toBeNull();

      expect(queryByTestId('tree-view-6')).toBeNull();
      expect(queryByTestId('tree-view-3')).toBeNull();

      expect(onItemExpanded).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId('btn-expand-all-1'));

      await waitFor(async () => {
        expect(queryByTestId('tree-view-2')).toBeNull();
        expect(queryByTestId('tree-view-7')).toBeNull();

        expect(onItemExpanded).toHaveBeenCalledTimes(2);
      });
    });
  });

  test('should collapse item on click when item is expanded', async () => {
    const { queryByTestId } = render(<Tree items={[...items]} expandAll />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    expect(queryByTestId('tree-view-2')).not.toBeNull();
    expect(queryByTestId('tree-view-7')).not.toBeNull();

    fireEvent.click(screen.getByTestId('btn-expand-all-1'));

    await waitFor(async () => {
      expect(queryByTestId('tree-view-2')).toBeNull();
      expect(queryByTestId('tree-view-7')).toBeNull();
    });
  });

  test('should select item on click', async () => {
    const onItemsSelected = jest.fn();

    render(<Tree items={[...items]} expandAll selectable onItemsSelected={onItemsSelected} selectedItems={[]} />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    fireEvent.click(screen.getByTestId('chk-tree-view-item-select-1'));
    await waitFor(async () => {
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(1);
      expect(response.some((item: TreeItem) => item.id === '1'));

      fireEvent.click(screen.getByTestId('chk-tree-view-item-select-1'));
    });
  });

  test('should expand and collapse all on click', async () => {
    render(<Tree items={[...items]} expandAll={false} />);

    expect(screen.getByTestId('btn-expand-all').textContent).toBe('Expand All');

    fireEvent.click(screen.getByTestId('btn-expand-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Collapse All');
    });

    fireEvent.click(screen.getByTestId('btn-expand-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Expand All');
    });
  });

  test('should select and deselect all on click', async () => {
    const onItemsSelected = jest.fn();

    render(<Tree items={[...items]} expandAll={false} selectable onItemsSelected={onItemsSelected} />);

    expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Deselect All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(7);
    });

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(0);
    });
  });

  test('should show search input when enableSearch is true', async () => {
    const { queryByTestId } = render(<Tree items={[...items]} expandAll={false} enableSearch />);
    expect(queryByTestId('tree-search-input')).not.toBeNull();
  });

  test('should hide search input when enableSearch is false', async () => {
    const { queryByTestId } = render(<Tree items={[...items]} expandAll={false} enableSearch={false} />);
    expect(queryByTestId('tree-search-input')).toBeNull();
  });

  test('should search and filter results', async () => {
    const { queryByTestId } = render(<Tree items={items} expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Validation' } });

    await waitFor(async () => {
      expect(queryByTestId('tree-view-item-6-label')).not.toBeNull();
      expect(queryByTestId('tree-view-item-2-label')).toBeNull();

      const input = screen.getByTestId('tree-search-input');
      expect(input).not.toBeNull();

      fireEvent.change(input, { target: { value: '' } });
    });
  });

  test('should select all children on click', async () => {
    const onItemsSelected = jest.fn();

    const theseItems = [...items];
    theseItems.forEach((item) => {
      item.isExpanded = true;
      item.isHidden = false;
    });

    render(<Tree items={theseItems} expandAll selectable onItemsSelected={onItemsSelected} />);

    const selectAllChildren = await waitFor(() => screen.getByTestId('chkSelectAllChildren_2'));

    await waitFor(async () => {
      fireEvent.click(selectAllChildren);
    });

    await waitFor(async () => {
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(3);
    });
  });

  test('should clear search term when items change', async () => {
    let myItems = [...items];
    const { rerender } = render(<Tree items={myItems} expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Validation' } });

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe('Validation');
    });

    rerender(<Tree items={[]} expandAll enableSearch />);

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  test('should select tree items by id when provided', async () => {
    const hierarchicalTreeItems = buildTree(flatTreeItems, [], ['5']);

    render(<Tree items={hierarchicalTreeItems} expandAll enableSearch selectable />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    const checkedItem = await waitFor(() => screen.getByTestId('chk-tree-view-item-select-5') as HTMLInputElement);
    expect(checkedItem.checked).toBeTruthy();
  });

  test('should expand tree items by id when provided', async () => {
    const hierarchicalTreeItems = buildTree(flatTreeItems, ['1', '7']);

    const { queryByTestId } = render(<Tree items={hierarchicalTreeItems} enableSearch selectable />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    expect(queryByTestId('tree-view-1')).not.toBeNull();
    expect(queryByTestId('tree-view-7')).not.toBeNull();

    expect(queryByTestId('tree-view-3')).toBeNull();
    expect(queryByTestId('tree-view-4')).toBeNull();
    expect(queryByTestId('tree-view-5')).toBeNull();
  });

  test('should appropriately expand all for all children in the chain', async () => {
    const onItemExpanded = jest.fn();

    const hierarchicalTreeItems = buildTree(flatTreeItems);
    hierarchicalTreeItems.forEach((item) => (item.isExpanded = false));

    render(<Tree items={hierarchicalTreeItems} expandAll={false} onItemsExpanded={onItemExpanded} />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    fireEvent.click(screen.getByTestId('btn-expand-all-1'));

    await waitFor(async () => {
      expect(onItemExpanded).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => screen.getByTestId('tree-view-item-2'));
    fireEvent.click(screen.getByTestId('btn-expand-all-2'));

    await waitFor(() => screen.getByTestId('tree-view-item-3'));
    expect(onItemExpanded).toHaveBeenCalledTimes(2);
  });
});
