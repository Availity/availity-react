"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[7738],{4495:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>a,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var t=i(4848),s=i(8453);const l={title:"App Tiles",summary:"Availity UI Kit application tiles react component."},a=void 0,o={id:"components/app-tiles",title:"App Tiles",description:"A component which outputs an Icon made of tiles.",source:"@site/docs/components/app-tiles.mdx",sourceDirName:"components",slug:"/components/app-tiles",permalink:"/availity-react/components/app-tiles",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/app-tiles.mdx",tags:[],version:"current",frontMatter:{title:"App Tiles",summary:"Availity UI Kit application tiles react component."},sidebar:"someSidebar",previous:{title:"App Icon",permalink:"/availity-react/components/app-icon"},next:{title:"Getting Started",permalink:"/availity-react/components/authorize/"}},r={},c=[{value:"Installation",id:"installation",level:3},{value:"Example",id:"example",level:3},{value:"Live example",id:"live-example",level:4},{value:"Props",id:"props",level:3},{value:"<code>size? string</code>",id:"size-string",level:4},{value:"<code>color?: string</code>",id:"color-string",level:4},{value:"<code>branded?: boolean</code>",id:"branded-boolean",level:4},{value:"<code>image?: string</code>",id:"image-string",level:4},{value:"<code>alt?: string</code>",id:"alt-string",level:4},{value:"<code>parents?: object[]</code>",id:"parents-object",level:4}];function d(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"A component which outputs an Icon made of tiles."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://www.npmjs.com/package/@availity/app-tiles",children:(0,t.jsx)(n.img,{src:"https://img.shields.io/npm/v/@availity/app-tiles.svg?style=for-the-badge",alt:"Version"})})}),"\n",(0,t.jsx)(n.h3,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.p,{children:"npm"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install @availity/app-tiles --save\n"})}),"\n",(0,t.jsx)(n.p,{children:"Yarn"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yarn add @availity/app-tiles\n"})}),"\n",(0,t.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'import React from \'react\';\nimport AppTiles from \'@availity/app-tiles\';\n\nconst Example = () => (\n  <>\n    <AppTiles\n      shortName="SN"\n      color="blue"\n      image="/path/to/image"\n      branded\n      size="sm"\n    />\n    <AppTiles\n      shortName="SN"\n      color="red"\n      size="xl"\n      parents={[{ images: { tile: \'/path/to/image\' } }, { shortName: \'SN\' }]}\n    />\n    <AppTiles shortName="SN" />\n  </>\n);\n'})}),"\n",(0,t.jsx)(n.h4,{id:"live-example",children:"Live example"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://availity.github.io/availity-react/storybook/?path=/docs/components-apptiles--docs",children:"Storybook"})}),"\n",(0,t.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,t.jsx)(n.h4,{id:"size-string",children:(0,t.jsx)(n.code,{children:"size? string"})}),"\n",(0,t.jsxs)(n.p,{children:["Potential values: ",(0,t.jsx)(n.code,{children:'"lg"'}),", ",(0,t.jsx)(n.code,{children:'"xl"'})]}),"\n",(0,t.jsx)(n.h4,{id:"color-string",children:(0,t.jsx)(n.code,{children:"color?: string"})}),"\n",(0,t.jsxs)(n.p,{children:["Potential values: ",(0,t.jsx)(n.code,{children:'"black"'}),", ",(0,t.jsx)(n.code,{children:'"blue"'}),", ",(0,t.jsx)(n.code,{children:'"green"'}),", ",(0,t.jsx)(n.code,{children:'"orange"'}),", ",(0,t.jsx)(n.code,{children:'"red"'}),". ",(0,t.jsx)(n.strong,{children:"Default:"})," ",(0,t.jsx)(n.code,{children:'"black"'})]}),"\n",(0,t.jsx)(n.h4,{id:"branded-boolean",children:(0,t.jsx)(n.code,{children:"branded?: boolean"})}),"\n",(0,t.jsx)(n.p,{children:'Triggers "branded" styles'}),"\n",(0,t.jsx)(n.h4,{id:"image-string",children:(0,t.jsx)(n.code,{children:"image?: string"})}),"\n",(0,t.jsx)(n.p,{children:"If image source is provided, it will render this instead of parents."}),"\n",(0,t.jsx)(n.h4,{id:"alt-string",children:(0,t.jsx)(n.code,{children:"alt?: string"})}),"\n",(0,t.jsxs)(n.p,{children:["For ",(0,t.jsx)(n.code,{children:"src"})," prop. the alt property for your image source is not found or is loading."]}),"\n",(0,t.jsx)(n.h4,{id:"parents-object",children:(0,t.jsx)(n.code,{children:"parents?: object[]"})}),"\n",(0,t.jsx)(n.p,{children:"If parents are provided, it will render up to the first in the icon, ether images.tile or shortName."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>o});var t=i(6540);const s={},l=t.createContext(s);function a(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);