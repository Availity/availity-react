"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[1538],{8453:(e,o,n)=>{n.d(o,{R:()=>i,x:()=>c});var t=n(6540);const s={},r=t.createContext(s);function i(e){const o=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function c(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(r.Provider,{value:o},e.children)}},8985:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>i,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"components/hooks/use-region","title":"useCurrentRegion","description":"Hook that returns the user\'s current region.","source":"@site/docs/components/hooks/use-region.md","sourceDirName":"components/hooks","slug":"/components/hooks/use-region","permalink":"/availity-react/components/hooks/use-region","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/hooks/use-region.md","tags":[],"version":"current","frontMatter":{"title":"useCurrentRegion"},"sidebar":"someSidebar","previous":{"title":"useMount","permalink":"/availity-react/components/hooks/use-mount"},"next":{"title":"useTimeout","permalink":"/availity-react/components/hooks/use-timeout"}}');var s=n(4848),r=n(8453);const i={title:"useCurrentRegion"},c=void 0,a={},u=[{value:"Example",id:"example",level:3},{value:"Props",id:"props",level:2},{value:"<code>options?: QueryConfig</code>",id:"options-queryconfig",level:3}];function l(e){const o={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.p,{children:"Hook that returns the user's current region."}),"\n",(0,s.jsx)(o.h3,{id:"example",children:"Example"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-jsx",children:"import React from 'react';\nimport { useCurrentRegion } from '@availity/hooks';\n\nconst Example = () => {\n  const { data: region, isFetching } = useCurrentRegion();\n\n  return <div>{isFetching ? 'Loading...' : region?.value || 'Nowhere'}</div>;\n};\n"})}),"\n",(0,s.jsx)(o.h2,{id:"props",children:"Props"}),"\n",(0,s.jsx)(o.h3,{id:"options-queryconfig",children:(0,s.jsx)(o.code,{children:"options?: QueryConfig"})}),"\n",(0,s.jsxs)(o.p,{children:["Options to be passed to the ",(0,s.jsx)(o.code,{children:"useQuery"})," hook such as ",(0,s.jsx)(o.code,{children:"enabled"}),", ",(0,s.jsx)(o.code,{children:"retry"}),", and ",(0,s.jsx)(o.code,{children:"onSuccess"}),"."]}),"\n",(0,s.jsxs)(o.blockquote,{children:["\n",(0,s.jsxs)(o.p,{children:["More information on the options can be found ",(0,s.jsx)(o.a,{href:"https://react-query.tanstack.com/docs/api/#usequery",children:"here"})]}),"\n"]})]})}function d(e={}){const{wrapper:o}={...(0,r.R)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}}}]);