"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[3753],{173:(e,o,r)=>{r.r(o),r.d(o,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var t=r(4848),n=r(8453);const i={title:"<FormGroup />"},a=void 0,s={id:"form/components/form-group",title:"<FormGroup />",description:"Wrapper for an Input field. Uses reactstrap FormGroup.",source:"@site/docs/form/components/form-group.md",sourceDirName:"form/components",slug:"/form/components/form-group",permalink:"/availity-react/form/components/form-group",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/form/components/form-group.md",tags:[],version:"current",frontMatter:{title:"<FormGroup />"},sidebar:"someSidebar",previous:{title:"<Field />",permalink:"/availity-react/form/components/field"},next:{title:"<Form />",permalink:"/availity-react/form/components/form"}},l={},p=[{value:"Example",id:"example",level:3},{value:"Live example: Storybook",id:"live-example-storybook",level:4},{value:"Props",id:"props",level:3},{value:"<code>for: string</code>",id:"for-string",level:4}];function m(e){const o={a:"a",code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.p,{children:"Wrapper for an Input field. Uses reactstrap FormGroup."}),"\n",(0,t.jsx)(o.h3,{id:"example",children:"Example"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-jsx",children:"import React from 'react';\nimport { Form } from '@availity/form';\nimport { FormGroup, Input, Label } from 'reactstrap';\nimport * as yup from 'yup';\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      hello: '',\n    }}\n    onSubmit={() => ({})}\n    validationSchema={yup.object().shape({\n      hello: yup.string().required(),\n    })}\n  >\n    <FormGroup for=\"hello\">\n      <Label for=\"hello\">Hello Field</Label>\n      <Input name=\"hello\" />\n    </FormGroup>\n  </Form>\n);\n"})}),"\n",(0,t.jsxs)(o.h4,{id:"live-example-storybook",children:["Live example: ",(0,t.jsx)(o.a,{href:"https://availity.github.io/availity-react/storybook/?path=/docs/form-components-form-formgroup--docs",children:"Storybook"})]}),"\n",(0,t.jsx)(o.h3,{id:"props",children:"Props"}),"\n",(0,t.jsx)(o.h4,{id:"for-string",children:(0,t.jsx)(o.code,{children:"for: string"})}),"\n",(0,t.jsx)(o.p,{children:"Used to match the wrapped input. Must be the same name given to the input field."})]})}function c(e={}){const{wrapper:o}={...(0,n.R)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(m,{...e})}):m(e)}},8453:(e,o,r)=>{r.d(o,{R:()=>a,x:()=>s});var t=r(6540);const n={},i=t.createContext(n);function a(e){const o=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function s(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),t.createElement(i.Provider,{value:o},e.children)}}}]);