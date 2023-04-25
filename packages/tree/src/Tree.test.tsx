import React from 'react';
import { render, waitFor, fireEvent, screen, cleanup } from '@testing-library/react';
import cloneDeep from 'lodash/cloneDeep';
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
  {
    id: '8',
    name: '2nd Root',
    children: [
      {
        id: '9',
        name: '2nd Root Child',
        parentId: '8',
        children: [],
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

  beforeEach(() => {
    cleanup();
    jest.resetModules();
  });

  test('should render parent with children', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} expandAll />);

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
    const items = cloneDeep(buildTree(flatTreeItems));

    const onItemsSelected = jest.fn();

    render(
      <Tree
        items={items}
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
    const items = cloneDeep(buildTree(flatTreeItems));

    const { queryByTestId } = render(<Tree items={items} expandAll />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    expect(queryByTestId('chk-tree-view-item-select-3')).toBeNull();

    expect(screen.getByTestId('tree-view-item-3-label')).toHaveClass('text-muted');
  });

  test('should expand item on click', async () => {
    const onItemExpanded = jest.fn();

    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} expandAll={false} onItemsExpanded={onItemExpanded} />);

    /** Check to see that the tre view is even rendered. */
    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    /** Root items should be displayed. */
    expect(queryByTestId('tree-view-item-1')).not.toBeNull();
    expect(queryByTestId('tree-view-item-8')).not.toBeNull();

    /** Going to expand first root item - first root child items should not be displayed. */
    expect(queryByTestId('tree-view-1')).toBeNull();
    expect(queryByTestId('tree-view-7')).toBeNull();

    /** Expand the first root element. */
    fireEvent.click(screen.getByTestId('btn-expand-all-1'));

    await waitFor(async () => {
      /** First root item should be displayed. */
      expect(queryByTestId('tree-view-1')).not.toBeNull();

      /** Child Items of first root item should be displayed */
      expect(queryByTestId('tree-view-6')).toBeNull();
      expect(queryByTestId('tree-view-3')).toBeNull();

      expect(onItemExpanded).toHaveBeenCalledTimes(1);

      expect(queryByTestId('tree-view-2')).toBeNull();

      fireEvent.click(screen.getByTestId('btn-expand-all-2'));

      await waitFor(async () => {
        expect(queryByTestId('tree-view-2')).not.toBeNull();
      });
    });

    /** Collapse the first root element. */
    fireEvent.click(screen.getByTestId('btn-expand-all-1'));

    await waitFor(async () => {
      expect(queryByTestId('tree-view-2')).toBeNull();
      expect(onItemExpanded).toHaveBeenCalledTimes(3);
    });
  });

  test('should collapse item on click when item is expanded', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));

    const { queryByTestId } = render(<Tree items={...items} expandAll />);

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

    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} expandAll selectable onItemsSelected={onItemsSelected} />);

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
    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} expandAll={false} />);

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

    const items = cloneDeep(buildTree(flatTreeItems));

    render(<Tree items={items} expandAll={false} selectable onItemsSelected={onItemsSelected} />);

    expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Deselect All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(8);
    });

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(0);
    });
  });

  test('should only show Select All Link on first item on root level', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} expandAll={false} selectable />);
    await waitFor(async () => {
      expect(screen.getAllByTestId('btn-select-all').length).toBe(1);
    });
  });

  test('should show search input when enableSearch is true', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} expandAll={false} enableSearch />);
    expect(queryByTestId('tree-search-input')).not.toBeNull();
  });

  test('should hide search input when enableSearch is false', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} expandAll={false} enableSearch={false} />);
    expect(queryByTestId('tree-search-input')).toBeNull();
  });

  test('should search and filter results', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();
    expect(queryByTestId('tree-view-item-6-label')).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Validation' } });

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe('Validation');
    });

    await waitFor(async () => {
      expect(queryByTestId('tree-view-item-6-label')).not.toBeNull();
      expect(queryByTestId('tree-view-item-2-label')).toBeNull();
      fireEvent.change(input, { target: { value: '' } });
    });
  });

  test('should select all children on click that are not disabled', async () => {
    const onItemsSelected = jest.fn();

    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} expandAll selectable onItemsSelected={onItemsSelected} selectedItems={[]} />);

    const selectAllChildren = await waitFor(() => screen.getByTestId('chkSelectAllChildren_2'));

    await waitFor(async () => {
      fireEvent.click(selectAllChildren);
    });

    await waitFor(async () => {
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.find((item: TreeItem) => item.id === '3')).toBeUndefined();
      expect(response.length).toEqual(3);
    });
  });

  test('should clear search term when items change', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { rerender } = render(<Tree items={items} expandAll enableSearch />);

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
    const hierarchicalTreeItems = cloneDeep(buildTree(flatTreeItems, [], ['5']));

    render(<Tree items={hierarchicalTreeItems} expandAll enableSearch selectable />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    const checkedItem = await waitFor(() => screen.getByTestId('chk-tree-view-item-select-5') as HTMLInputElement);
    expect(checkedItem.checked).toBeTruthy();
  });

  test('should expand tree items by id when provided', async () => {
    const hierarchicalTreeItems = cloneDeep(buildTree(flatTreeItems, ['1', '7']));

    const { queryByTestId } = render(<Tree items={hierarchicalTreeItems} enableSearch selectable />);

    const treeElement = await waitFor(() => screen.getByTestId('tree-view-parent'));
    expect(treeElement).not.toBeNull();

    expect(queryByTestId('tree-view-1')).not.toBeNull();
    expect(queryByTestId('tree-view-7')).not.toBeNull();

    expect(queryByTestId('tree-view-3')).toBeNull();
    expect(queryByTestId('tree-view-4')).toBeNull();
    expect(queryByTestId('tree-view-5')).toBeNull();
  });

  test('should show disabled items when displayDisabledItems = true', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} expandAll displayDisabledItems />);

    expect(screen.getByTestId('tree-view-item-3')).not.toBeNull();
  });

  test('should not show disabled items when displayDisabledItems = false', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} expandAll displayDisabledItems={false} />);
    await waitFor(async () => {
      expect(queryByTestId('tree-view-item-3')).toBeNull();
    });
  });

  test('select all should only select items that are filtered', async () => {
    const onItemsSelected = jest.fn();

    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} selectable expandAll enableSearch onItemsSelected={onItemsSelected} />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();
    expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Deselect All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(8);
    });

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(0);
    });

    fireEvent.change(input, { target: { value: 'Validation' } });

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe('Validation');
    });

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Deselect All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(1);
    });
  });

  test('de-select all should only select items that are filtered', async () => {
    const onItemsSelected = jest.fn();

    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(
      <Tree items={items} selectable expandAll enableSearch onItemsSelected={onItemsSelected} />
    );

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();
    expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');

    fireEvent.click(screen.getByTestId('btn-select-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Deselect All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(8);
    });

    fireEvent.change(input, { target: { value: 'Validation' } });

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe('Validation');
      expect(queryByTestId('chk-tree-view-item-select-6')).toBeChecked();
      fireEvent.click(screen.getByTestId('btn-select-all'));
    });

    await waitFor(async () => {
      expect(screen.getByTestId('btn-select-all').textContent).toBe('Select All');
      const response = onItemsSelected.mock.lastCall[0];
      expect(response.length).toEqual(7);
    });
  });

  test('should show Expand All text when filtered items have children that are collapsed', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} selectable expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();
    expect(screen.getByTestId('btn-expand-all').textContent).toBe('Collapse All');

    fireEvent.click(screen.getByTestId('btn-expand-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Expand All');
    });

    fireEvent.change(input, { target: { value: '2nd Root' } });

    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Collapse All');
      fireEvent.click(screen.getByTestId('btn-expand-all-8'));
    });

    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Expand All');
    });
  });

  test('should show Collapse All text when filtered items have children that are expanded', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    render(<Tree items={items} selectable expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();
    expect(screen.getByTestId('btn-expand-all').textContent).toBe('Collapse All');

    fireEvent.click(screen.getByTestId('btn-expand-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Expand All');
    });

    fireEvent.change(input, { target: { value: '2nd Root' } });

    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Collapse All');
    });
  });

  test('should not show expand all or collapse all if filtered items do not have children', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} selectable expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();
    expect(screen.getByTestId('btn-expand-all').textContent).toBe('Collapse All');

    fireEvent.click(screen.getByTestId('btn-expand-all'));
    await waitFor(async () => {
      expect(screen.getByTestId('btn-expand-all').textContent).toBe('Expand All');
    });

    fireEvent.change(input, { target: { value: '2nd Root Child' } });

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe('2nd Root Child');

      expect(queryByTestId('btn-expand-all')).toBeNull();
    });
  });

  test('should not show expand all/collapse all text or select all/deselect all if filtered items are empty', async () => {
    const items = cloneDeep(buildTree(flatTreeItems));
    const { queryByTestId } = render(<Tree items={items} selectable expandAll enableSearch />);

    const input = screen.getByTestId('tree-search-input');
    expect(input).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Not here!' } });

    await waitFor(async () => {
      const input = screen.getByTestId('tree-search-input') as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe('Not here!');

      expect(queryByTestId('btn-expand-all')).toBeNull();
      expect(queryByTestId('btn-select-all')).toBeNull();
    });
  });
});
