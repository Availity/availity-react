"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[6273],{5538:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"components/tree","title":"Tree","description":"Version","source":"@site/docs/components/tree.mdx","sourceDirName":"components","slug":"/components/tree","permalink":"/availity-react/components/tree","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/tree.mdx","tags":[],"version":"current","frontMatter":{"title":"Tree"},"sidebar":"someSidebar","previous":{"title":"Training Link","permalink":"/availity-react/components/training-link"},"next":{"title":"Getting Started","permalink":"/availity-react/components/typography/"}}');var l=n(4848),d=n(8453);const s={title:"Tree"},a=void 0,r={},o=[{value:"Installation",id:"installation",level:3},{value:"Usage",id:"usage",level:3},{value:"Example",id:"example",level:4},{value:"Storybook",id:"storybook",level:4},{value:"Props",id:"props",level:3},{value:"<code>items: TreeItem[]</code>",id:"items-treeitem",level:4},{value:"<code>enableSearch?: boolean</code>",id:"enablesearch-boolean",level:4},{value:"<code>searchLabel?: string</code>",id:"searchlabel-string",level:4},{value:"<code>expandAll?: boolean</code>",id:"expandall-boolean",level:4},{value:"<code>displayDisabledItems?: boolean</code>",id:"displaydisableditems-boolean",level:4},{value:"<code>onItemsSelected?: (selectedIds: TreeItem[]) =&gt; void</code>",id:"onitemsselected-selectedids-treeitem--void",level:4},{value:"<code>onItemsExpanded?: (expandedItems: TreeItem[]) =&gt; void</code>",id:"onitemsexpanded-expandeditems-treeitem--void",level:4},{value:"Functions",id:"functions",level:3},{value:"buildTree(data: any, expandedIds: string[], selectedIds: string[])",id:"buildtreedata-any-expandedids-string-selectedids-string",level:4},{value:"Types",id:"types",level:3},{value:"TreeItem",id:"treeitem",level:4},{value:"<code>id: string</code>",id:"id-string",level:5},{value:"<code>parentId: string</code>",id:"parentid-string",level:5},{value:"<code>isExpanded: boolean</code>",id:"isexpanded-boolean",level:5},{value:"<code>isSelected: boolean</code>",id:"isselected-boolean",level:5},{value:"<code>isHidden: boolean</code>",id:"ishidden-boolean",level:5},{value:"<code>isDisabled: boolean</code>",id:"isdisabled-boolean",level:5},{value:"<code>name: string</code>",id:"name-string",level:5},{value:"<code>children: TreeItem[]</code>",id:"children-treeitem",level:5},{value:"<code>areAllChildrenSelected: boolean</code>",id:"areallchildrenselected-boolean",level:5}];function c(e){const t={a:"a",code:"code",h3:"h3",h4:"h4",h5:"h5",img:"img",p:"p",pre:"pre",...(0,d.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.p,{children:(0,l.jsx)(t.a,{href:"https://www.npmjs.com/package/@availity/tree",children:(0,l.jsx)(t.img,{src:"https://img.shields.io/npm/v/@availity/tree.svg?style=for-the-badge",alt:"Version"})})}),"\n",(0,l.jsx)(t.p,{children:"This component builds out a hierarchical tree of objects, with the ability to expand/collapse, select, and search."}),"\n",(0,l.jsx)(t.h3,{id:"installation",children:"Installation"}),"\n",(0,l.jsx)(t.p,{children:"npm"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-bash",children:"npm install @availity/tree\n"})}),"\n",(0,l.jsx)(t.p,{children:"Yarn"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-bash",children:"yarn add @availity/tree\n"})}),"\n",(0,l.jsx)(t.h3,{id:"usage",children:"Usage"}),"\n",(0,l.jsx)(t.h4,{id:"example",children:"Example"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-jsx",children:"import React from 'react';\nimport Tree, { buildTree, TreeItem } from '@availity/tree';\n\nconst Example = ({ myData }: Props) => (\n  const [valueList, setValueList] = useState<TreeItem[]>([]);\n  const [tree, setTree] = useState<TreeItem[]>([]);\n  const [initialState, setInitialState] = useState<TreeItem[]>([]);\n\n  const onSelected = (selectedItems: TreeItem[]) => {\n    setTentativeSelectList(selectedItems.map((item) => ({ code: item.id, value: item.name })));\n  };\n\n  const reset = () => {\n    setTentativeSelectList([]);\n    setTree(cloneDeep(initialState));\n  };\n\n  useEffect(() => {\n    // buildTree will construct a list of TreeItems as expected by the tree component\n    // this optionally allows you to pass an array of expandedIds and selectedIds\n    const tree = buildTree(myData, expandedIds, selectedIds);\n    await setInitialState(cloneDeep(tree));\n    await setTree(tree);\n  }, []);\n\n   return (\n        <>\n            <Tree\n                items={tree}\n                expandAll\n                enableSearch\n                selectedItems={valueList}\n                onItemsSelected={onSelected}\n            />\n            <Button id=\"btnResetTree\" onClick={() => reset()}>Reset Tree</Button>\n        </>\n    );\n);\n"})}),"\n",(0,l.jsx)(t.h4,{id:"storybook",children:"Storybook"}),"\n",(0,l.jsxs)(t.p,{children:["Checkout the ",(0,l.jsx)(t.a,{href:"https://availity.github.io/availity-react/storybook/?path=/story/components-tree--default",children:"Storybook"})," for interactive examples"]}),"\n",(0,l.jsx)(t.h3,{id:"props",children:"Props"}),"\n",(0,l.jsx)(t.h4,{id:"items-treeitem",children:(0,l.jsx)(t.code,{children:"items: TreeItem[]"})}),"\n",(0,l.jsx)(t.p,{children:"Required. The list of items to display in the tree."}),"\n",(0,l.jsx)(t.h4,{id:"enablesearch-boolean",children:(0,l.jsx)(t.code,{children:"enableSearch?: boolean"})}),"\n",(0,l.jsx)(t.p,{children:"Defaults to false. When enabled, there is a search input box that will display and allow for the user to limit the items in the tree based on the typed search value."}),"\n",(0,l.jsx)(t.h4,{id:"searchlabel-string",children:(0,l.jsx)(t.code,{children:"searchLabel?: string"})}),"\n",(0,l.jsx)(t.p,{children:"The label that displays above the text box."}),"\n",(0,l.jsx)(t.h4,{id:"expandall-boolean",children:(0,l.jsx)(t.code,{children:"expandAll?: boolean"})}),"\n",(0,l.jsx)(t.p,{children:"Defaults to false. When true, the tree view will be entirely expanded on initial load."}),"\n",(0,l.jsx)(t.h4,{id:"displaydisableditems-boolean",children:(0,l.jsx)(t.code,{children:"displayDisabledItems?: boolean"})}),"\n",(0,l.jsx)(t.p,{children:"Defaults to true. When true, disabled items will be hidden in the tree."}),"\n",(0,l.jsx)(t.h4,{id:"onitemsselected-selectedids-treeitem--void",children:(0,l.jsx)(t.code,{children:"onItemsSelected?: (selectedIds: TreeItem[]) => void"})}),"\n",(0,l.jsx)(t.p,{children:"Whenever an item is selected in the tree, it fires this event to let the parent know of the items that are selected."}),"\n",(0,l.jsx)(t.h4,{id:"onitemsexpanded-expandeditems-treeitem--void",children:(0,l.jsx)(t.code,{children:"onItemsExpanded?: (expandedItems: TreeItem[]) => void"})}),"\n",(0,l.jsx)(t.p,{children:"Whenever an item is expanded in the tree, it fires this event."}),"\n",(0,l.jsx)(t.h3,{id:"functions",children:"Functions"}),"\n",(0,l.jsx)(t.h4,{id:"buildtreedata-any-expandedids-string-selectedids-string",children:"buildTree(data: any, expandedIds: string[], selectedIds: string[])"}),"\n",(0,l.jsx)(t.p,{children:"Whenever the items are in a flat array, call this method to build the hierarchical list that is ready for the tree."}),"\n",(0,l.jsx)(t.h3,{id:"types",children:"Types"}),"\n",(0,l.jsx)(t.h4,{id:"treeitem",children:"TreeItem"}),"\n",(0,l.jsx)(t.h5,{id:"id-string",children:(0,l.jsx)(t.code,{children:"id: string"})}),"\n",(0,l.jsx)(t.h5,{id:"parentid-string",children:(0,l.jsx)(t.code,{children:"parentId: string"})}),"\n",(0,l.jsx)(t.h5,{id:"isexpanded-boolean",children:(0,l.jsx)(t.code,{children:"isExpanded: boolean"})}),"\n",(0,l.jsx)(t.h5,{id:"isselected-boolean",children:(0,l.jsx)(t.code,{children:"isSelected: boolean"})}),"\n",(0,l.jsx)(t.h5,{id:"ishidden-boolean",children:(0,l.jsx)(t.code,{children:"isHidden: boolean"})}),"\n",(0,l.jsx)(t.h5,{id:"isdisabled-boolean",children:(0,l.jsx)(t.code,{children:"isDisabled: boolean"})}),"\n",(0,l.jsx)(t.h5,{id:"name-string",children:(0,l.jsx)(t.code,{children:"name: string"})}),"\n",(0,l.jsx)(t.h5,{id:"children-treeitem",children:(0,l.jsx)(t.code,{children:"children: TreeItem[]"})}),"\n",(0,l.jsx)(t.h5,{id:"areallchildrenselected-boolean",children:(0,l.jsx)(t.code,{children:"areAllChildrenSelected: boolean"})})]})}function h(e={}){const{wrapper:t}={...(0,d.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>a});var i=n(6540);const l={},d=i.createContext(l);function s(e){const t=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),i.createElement(d.Provider,{value:t},e.children)}}}]);