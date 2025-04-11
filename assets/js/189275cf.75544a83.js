"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[8626],{189:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>i,default:()=>l,frontMatter:()=>c,metadata:()=>s,toc:()=>u});const s=JSON.parse('{"id":"components/hooks/use-current-user","title":"useCurrentUser","description":"Hook that returns the current user.","source":"@site/docs/components/hooks/use-current-user.md","sourceDirName":"components/hooks","slug":"/components/hooks/use-current-user","permalink":"/availity-react/components/hooks/use-current-user","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/hooks/use-current-user.md","tags":[],"version":"current","frontMatter":{"title":"useCurrentUser"},"sidebar":"someSidebar","previous":{"title":"Getting Started","permalink":"/availity-react/components/hooks/"},"next":{"title":"useEffectAsync","permalink":"/availity-react/components/hooks/use-effect-async"}}');var o=n(4848),r=n(8453);const c={title:"useCurrentUser"},i=void 0,a={},u=[{value:"Example",id:"example",level:3},{value:"Props",id:"props",level:2},{value:"<code>options?: QueryConfig</code>",id:"options-queryconfig",level:3}];function d(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"Hook that returns the current user."}),"\n",(0,o.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",children:"import React from 'react';\nimport { useCurrentUser } from '@availity/hooks';\n\nconst Example = () => {\n  const { data: user, isFetching } = useCurrentUser();\n\n  return <div>{isFetching ? 'Loading...' : user?.id}</div>;\n};\n"})}),"\n",(0,o.jsx)(t.h2,{id:"props",children:"Props"}),"\n",(0,o.jsx)(t.h3,{id:"options-queryconfig",children:(0,o.jsx)(t.code,{children:"options?: QueryConfig"})}),"\n",(0,o.jsxs)(t.p,{children:["Options to be passed to the ",(0,o.jsx)(t.code,{children:"useQuery"})," hook such as ",(0,o.jsx)(t.code,{children:"enabled"}),", ",(0,o.jsx)(t.code,{children:"retry"}),", and ",(0,o.jsx)(t.code,{children:"onSuccess"}),"."]}),"\n",(0,o.jsxs)(t.blockquote,{children:["\n",(0,o.jsxs)(t.p,{children:["More information on the options can be found ",(0,o.jsx)(t.a,{href:"https://react-query.tanstack.com/docs/api/#usequery",children:"here"})]}),"\n"]})]})}function l(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>i});var s=n(6540);const o={},r=s.createContext(o);function c(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);