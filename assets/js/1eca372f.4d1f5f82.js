"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[2259],{4450:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var a=e(4848),o=e(8453);const i={title:"useAnalytics"},s=void 0,c={id:"components/analytics/hook",title:"useAnalytics",description:"Hook giving you access to the instance of @availity/analytics-core for manually tracking events, and changing different variables.",source:"@site/docs/components/analytics/hook.md",sourceDirName:"components/analytics",slug:"/components/analytics/hook",permalink:"/availity-react/components/analytics/hook",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/analytics/hook.md",tags:[],version:"current",frontMatter:{title:"useAnalytics"},sidebar:"someSidebar",previous:{title:"<Analytics />",permalink:"/availity-react/components/analytics/analytics"},next:{title:"App Icon",permalink:"/availity-react/components/app-icon"}},r={},l=[{value:"Example",id:"example",level:3}];function u(t){const n={code:"code",h3:"h3",p:"p",pre:"pre",...(0,o.R)(),...t.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["Hook giving you access to the instance of ",(0,a.jsx)(n.code,{children:"@availity/analytics-core"})," for manually tracking events, and changing different variables."]}),"\n",(0,a.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { Button } from 'reactstrap';\nimport { useAnalytics } from '@availity/analytics';\n\nconst Example = () => {\n  const { trackEvent } = useAnalytics();\n\n  return (\n    <Button onClick={() => trackEvent({ url: '/test', data: 'some-data' })}>\n      Click Me\n    </Button>\n  );\n};\n"})})]})}function p(t={}){const{wrapper:n}={...(0,o.R)(),...t.components};return n?(0,a.jsx)(n,{...t,children:(0,a.jsx)(u,{...t})}):u(t)}},8453:(t,n,e)=>{e.d(n,{R:()=>s,x:()=>c});var a=e(6540);const o={},i=a.createContext(o);function s(t){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function c(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:s(t.components),a.createElement(i.Provider,{value:n},t.children)}}}]);