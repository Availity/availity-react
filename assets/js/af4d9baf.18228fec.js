"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[5866],{6174:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"form/components/feedback","title":"<Feedback />","description":"Error message container for an input","source":"@site/docs/form/components/feedback.md","sourceDirName":"form/components","slug":"/form/components/feedback","permalink":"/availity-react/form/components/feedback","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/form/components/feedback.md","tags":[],"version":"current","frontMatter":{"title":"<Feedback />"},"sidebar":"someSidebar","previous":{"title":"<Checkbox />","permalink":"/availity-react/form/components/checkbox"},"next":{"title":"<Field />","permalink":"/availity-react/form/components/field"}}');var r=t(4848),a=t(8453);const i={title:"<Feedback />"},s=void 0,c={},l=[{value:"Example",id:"example",level:3},{value:"Props",id:"props",level:3},{value:"<code>name: string</code>",id:"name-string",level:4}];function m(e){const n={code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Error message container for an input"}),"\n",(0,r.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { Form, Input, Feedback as FormFeedback } from '@availity/form';\nimport { Button, Label, FormGroup } from 'reactstrap';\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      hello: '',\n    }}\n    onSubmit={() => ({})}\n    validationSchema={yup.object().shape({\n      hello: yup.string().required('Oops'),\n    })}\n  >\n    <FormGroup>\n      <Label>Hello Field</Label>\n      <Input name=\"hello\" feedback=\"true\" />\n      <FormFeedback name=\"hello\" />\n    </FormGroup>\n    <Button type=\"submit\" color=\"primary\">\n      Submit\n    </Button>\n  </Form>\n);\n"})}),"\n",(0,r.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,r.jsx)(n.h4,{id:"name-string",children:(0,r.jsx)(n.code,{children:"name: string"})}),"\n",(0,r.jsx)(n.p,{children:"Name used to match the validation schema to the message."})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>s});var o=t(6540);const r={},a=o.createContext(r);function i(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);