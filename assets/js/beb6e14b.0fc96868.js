"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[8888],{9157:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>r,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>s});var o=t(4848),a=t(8453);const l={title:"<ScrollableContainer/>"},r=void 0,c={id:"components/table/scrollableContainer",title:"<ScrollableContainer/>",description:"In order to make the table scrollable within a fixed container, wrap the Table component with the ScrollableContainer.",source:"@site/docs/components/table/scrollableContainer.md",sourceDirName:"components/table",slug:"/components/table/scrollableContainer",permalink:"/availity-react/components/table/scrollableContainer",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/table/scrollableContainer.md",tags:[],version:"current",frontMatter:{title:"<ScrollableContainer/>"},sidebar:"someSidebar",previous:{title:"Getting Started",permalink:"/availity-react/components/table/"},next:{title:"<TableControls/>",permalink:"/availity-react/components/table/tableControls"}},i={},s=[];function d(e){const n={code:"code",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["In order to make the table scrollable within a fixed container, wrap the ",(0,o.jsx)(n.code,{children:"Table"})," component with the ScrollableContainer.\nThis will automatically set the ",(0,o.jsx)(n.code,{children:"scrollable"})," property to true in the ",(0,o.jsx)(n.code,{children:"Table"})," component."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport Table, { ScrollableContainer } from '@availity/table';\nimport '@availity/table/style.scss';\n\nconst columns = [\n  {\n    Header: 'Column 1',\n    accessor: 'column1',\n  },\n  {\n    Header: 'Column 2',\n    accessor: 'column2',\n  },\n  {\n    Header: 'Column 3',\n    accessor: 'column3',\n  },\n];\n\nconst Example = () => (\n  <ScrollableContainer>\n    <Table columns={columns} data={records} />\n  </ScrollableContainer>\n);\n"})})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>c});var o=t(6540);const a={},l=o.createContext(a);function r(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);