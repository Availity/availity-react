"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[4517],{6647:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>c,metadata:()=>o,toc:()=>r});const o=JSON.parse('{"id":"components/app-icon","title":"App Icon","description":"A component which outputs one of the \\"App Icons\\" from Availity UI Kit","source":"@site/docs/components/app-icon.mdx","sourceDirName":"components","slug":"/components/app-icon","permalink":"/availity-react/components/app-icon","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/components/app-icon.mdx","tags":[],"version":"current","frontMatter":{"title":"App Icon","summary":"Availity UI Kit application icon react component."},"sidebar":"someSidebar","previous":{"title":"useAnalytics","permalink":"/availity-react/components/analytics/hook"},"next":{"title":"App Tiles","permalink":"/availity-react/components/app-tiles"}}');var t=i(4848),s=i(8453);const c={title:"App Icon",summary:"Availity UI Kit application icon react component."},a=void 0,l={},r=[{value:"Installation",id:"installation",level:3},{value:"Example",id:"example",level:3},{value:"Live example",id:"live-example",level:4},{value:"Props",id:"props",level:3},{value:"<code>size? string</code>",id:"size-string",level:4},{value:"<code>color?: string</code>",id:"color-string",level:4},{value:"<code>branded?: boolean</code>",id:"branded-boolean",level:4},{value:"<code>src?: string</code>",id:"src-string",level:4},{value:"<code>alt?: string</code>",id:"alt-string",level:4}];function d(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:['A component which outputs one of the "App Icons" from ',(0,t.jsx)(n.a,{href:"http://availity.github.io/availity-uikit/v3/components#App-Icons",children:"Availity UI Kit"})]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://www.npmjs.com/package/@availity/app-icon",children:(0,t.jsx)(n.img,{src:"https://img.shields.io/npm/v/@availity/app-icon.svg?style=for-the-badge",alt:"Version"})})}),"\n",(0,t.jsx)(n.h3,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.p,{children:"npm"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install @availity/app-icon --save\n"})}),"\n",(0,t.jsx)(n.p,{children:"Yarn"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"yarn add @availity/app-icon\n"})}),"\n",(0,t.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'import React from \'react\';\nimport AppIcon from \'@availity/app-icon\';\n\nconst Example = () => (\n  <>\n    <AppIcon title="Payer Space" color="blue" branded size="xl">\n      PS\n    </AppIcon>\n    <AppIcon title="Payer Space" color="red" size="xl">\n      PS\n    </AppIcon>\n    <AppIcon title="Payer Space" color="orange">\n      PS\n    </AppIcon>\n  </>\n);\n'})}),"\n",(0,t.jsx)(n.h4,{id:"live-example",children:"Live example"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://availity.github.io/availity-react/storybook/?path=/docs/components-appicon--docs",children:"Storybook"})}),"\n",(0,t.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,t.jsx)(n.h4,{id:"size-string",children:(0,t.jsx)(n.code,{children:"size? string"})}),"\n",(0,t.jsxs)(n.p,{children:["Potential values: ",(0,t.jsx)(n.code,{children:'"lg"'}),", ",(0,t.jsx)(n.code,{children:'"xl"'})]}),"\n",(0,t.jsx)(n.h4,{id:"color-string",children:(0,t.jsx)(n.code,{children:"color?: string"})}),"\n",(0,t.jsxs)(n.p,{children:["Potential values: ",(0,t.jsx)(n.code,{children:'"black"'}),", ",(0,t.jsx)(n.code,{children:'"blue"'}),", ",(0,t.jsx)(n.code,{children:'"green"'}),", ",(0,t.jsx)(n.code,{children:'"orange"'}),", ",(0,t.jsx)(n.code,{children:'"red"'}),". ",(0,t.jsx)(n.strong,{children:"Default:"})," ",(0,t.jsx)(n.code,{children:'"black"'})]}),"\n",(0,t.jsx)(n.h4,{id:"branded-boolean",children:(0,t.jsx)(n.code,{children:"branded?: boolean"})}),"\n",(0,t.jsx)(n.p,{children:'Triggers "branded" styles'}),"\n",(0,t.jsx)(n.h4,{id:"src-string",children:(0,t.jsx)(n.code,{children:"src?: string"})}),"\n",(0,t.jsx)(n.p,{children:"If image source is provided, it will render this instead of children."}),"\n",(0,t.jsx)(n.h4,{id:"alt-string",children:(0,t.jsx)(n.code,{children:"alt?: string"})}),"\n",(0,t.jsxs)(n.p,{children:["For ",(0,t.jsx)(n.code,{children:"src"})," prop. the alt property for your image source is not found or is loading."]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>a});var o=i(6540);const t={},s=o.createContext(t);function c(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);