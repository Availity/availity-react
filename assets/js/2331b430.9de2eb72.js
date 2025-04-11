"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[1257],{2076:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>p});const o=JSON.parse('{"id":"components/pagination/context","title":"PaginationContext","description":"If you are using a class component, you can subscribe to the pagination by using this context.","source":"@site/docs/components/pagination/context.md","sourceDirName":"components/pagination","slug":"/components/pagination/context","permalink":"/availity-react/components/pagination/context","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/pagination/context.md","tags":[],"version":"current","frontMatter":{"title":"PaginationContext"},"sidebar":"someSidebar","previous":{"title":"usePagination","permalink":"/availity-react/components/pagination/hook"},"next":{"title":"Badge","permalink":"/availity-react/components/badge"}}');var a=e(4848),i=e(8453);const s={title:"PaginationContext"},c=void 0,r={},p=[{value:"Example",id:"example",level:3}];function l(t){const n={code:"code",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...t.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"If you are using a class component, you can subscribe to the pagination by using this context."}),"\n",(0,a.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { PaginationContext } from '@availity/pagination';\n\nclass PageSetter extends React.Component {\n  render() {\n    const { page, setPage } = this.context;\n\n    return (\n      <input\n        type=\"text\"\n        value={page}\n        onChange={({ target }) => setPage(target.value)}\n      />\n    );\n  }\n}\n\nPageSetter.contextType = PaginationContext;\n"})})]})}function u(t={}){const{wrapper:n}={...(0,i.R)(),...t.components};return n?(0,a.jsx)(n,{...t,children:(0,a.jsx)(l,{...t})}):l(t)}},8453:(t,n,e)=>{e.d(n,{R:()=>s,x:()=>c});var o=e(6540);const a={},i=o.createContext(a);function s(t){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function c(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(a):t.components||a:s(t.components),o.createElement(i.Provider,{value:n},t.children)}}}]);