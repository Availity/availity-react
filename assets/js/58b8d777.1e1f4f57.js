"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[7847],{3250:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>c,metadata:()=>a,toc:()=>l});var o=t(4848),i=t(8453);const c={title:"<PaginationContent />"},r=void 0,a={id:"components/pagination/content",title:"<PaginationContent />",description:"This is the container of all the items rendered to the DOM when the Pagination provider receives items. Must be /nested inside a Pagination component.",source:"@site/docs/components/pagination/content.md",sourceDirName:"components/pagination",slug:"/components/pagination/content",permalink:"/availity-react/components/pagination/content",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/pagination/content.md",tags:[],version:"current",frontMatter:{title:"<PaginationContent />"},sidebar:"someSidebar",previous:{title:"<PaginationControls />",permalink:"/availity-react/components/pagination/controls"},next:{title:"<AvResourcePagination />",permalink:"/availity-react/components/pagination/resource"}},s={},l=[{value:"Example",id:"example",level:3},{value:"Props",id:"props",level:3},{value:"<code>component? React.ComponentType</code>",id:"component-reactcomponenttype",level:4},{value:"<code>itemKey: string</code>",id:"itemkey-string",level:4},{value:"<code>loadingMessage?: string</code>",id:"loadingmessage-string",level:4},{value:"<code>loader?: boolean</code>",id:"loader-boolean",level:4},{value:"<code>containerProps?: React.HTMLAttributes&lt;HTMLDivElement&gt;</code>",id:"containerprops-reacthtmlattributeshtmldivelement",level:4},{value:"<code>containerTag?: React.ComponentType | string</code>",id:"containertag-reactcomponenttype--string",level:4},{value:"<code>infiniteScroll?: boolean</code>",id:"infinitescroll-boolean",level:4},{value:"<code>infiniteScrollProps?: InfiniteScrollProps</code>",id:"infinitescrollprops-infinitescrollprops",level:4},{value:"<code>children?: React.ReactNode | ({ items?: ReactNode }) =&gt; ReactNode</code>",id:"children-reactreactnode---items-reactnode---reactnode",level:4}];function d(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["This is the container of all the items rendered to the DOM when the ",(0,o.jsx)(n.code,{children:"Pagination"})," provider receives items. Must be /nested inside a ",(0,o.jsx)(n.code,{children:"Pagination"})," component."]}),"\n",(0,o.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { PaginationContent } from '@availity/pagination';\n\nconst Example = () => (\n  <PaginationContent\n    loadingMessage=\"loading\"\n    component={Component}\n    itemKey=\"id\"\n  />\n);\n"})}),"\n",(0,o.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,o.jsx)(n.h4,{id:"component-reactcomponenttype",children:(0,o.jsx)(n.code,{children:"component? React.ComponentType"})}),"\n",(0,o.jsx)(n.p,{children:"The component to render when iterating through the current page of items. The contents of the item will be spread on the props of the component when rendered."}),"\n",(0,o.jsx)(n.h4,{id:"itemkey-string",children:(0,o.jsx)(n.code,{children:"itemKey: string"})}),"\n",(0,o.jsx)(n.p,{children:"The key of the object rendered in the component to be used during mapping."}),"\n",(0,o.jsx)(n.h4,{id:"loadingmessage-string",children:(0,o.jsx)(n.code,{children:"loadingMessage?: string"})}),"\n",(0,o.jsx)(n.p,{children:"The message to render with the loading bar when in the loading state."}),"\n",(0,o.jsx)(n.h4,{id:"loader-boolean",children:(0,o.jsx)(n.code,{children:"loader?: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["If ",(0,o.jsx)(n.code,{children:"true"}),", calls ",(0,o.jsx)(n.code,{children:"BlockUI"})," to simulate a loading state if the provider is loading."]}),"\n",(0,o.jsx)(n.h4,{id:"containerprops-reacthtmlattributeshtmldivelement",children:(0,o.jsx)(n.code,{children:"containerProps?: React.HTMLAttributes<HTMLDivElement>"})}),"\n",(0,o.jsxs)(n.p,{children:["Props to be spread onto the ",(0,o.jsx)(n.code,{children:"<BlockUI />"})," tag."]}),"\n",(0,o.jsx)(n.h4,{id:"containertag-reactcomponenttype--string",children:(0,o.jsx)(n.code,{children:"containerTag?: React.ComponentType | string"})}),"\n",(0,o.jsxs)(n.p,{children:["The tag to render the ",(0,o.jsx)(n.code,{children:"<BlockUI />"})," as. ",(0,o.jsx)(n.strong,{children:"Default:"})," ",(0,o.jsx)(n.code,{children:"div"}),"."]}),"\n",(0,o.jsx)(n.h4,{id:"infinitescroll-boolean",children:(0,o.jsx)(n.code,{children:"infiniteScroll?: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["If ",(0,o.jsx)(n.code,{children:"true"}),", renders pagination content inside an infinite scroll component"]}),"\n",(0,o.jsx)(n.h4,{id:"infinitescrollprops-infinitescrollprops",children:(0,o.jsx)(n.code,{children:"infiniteScrollProps?: InfiniteScrollProps"})}),"\n",(0,o.jsxs)(n.p,{children:["Only used when ",(0,o.jsx)(n.code,{children:"infiniteScroll"})," is true. See ",(0,o.jsx)(n.a,{href:"https://github.com/ankeetmaini/react-infinite-scroll-component#props",children:"react-infinite-scroll-component"})]}),"\n",(0,o.jsx)(n.h4,{id:"children-reactreactnode---items-reactnode---reactnode",children:(0,o.jsx)(n.code,{children:"children?: React.ReactNode | ({ items?: ReactNode }) => ReactNode"})}),"\n",(0,o.jsx)(n.p,{children:"Customize the contents of what gets rendered. Children can be a react child or a function that accepts the pagination items"})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var o=t(6540);const i={},c=o.createContext(i);function r(e){const n=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(c.Provider,{value:n},e.children)}}}]);