"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[2193],{4857:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var l=t(4848),d=t(8453);const i={title:"<Field />"},o=void 0,a={id:"form/components/field",title:"<Field />",description:"Input field wrapped in additional features such as label, feedback, grid options, etc",source:"@site/docs/form/components/field.md",sourceDirName:"form/components",slug:"/form/components/field",permalink:"/availity-react/form/components/field",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/form/components/field.md",tags:[],version:"current",frontMatter:{title:"<Field />"},sidebar:"someSidebar",previous:{title:"<Feedback />",permalink:"/availity-react/form/components/feedback"},next:{title:"<FormGroup />",permalink:"/availity-react/form/components/form-group"}},r={},c=[{value:"Example",id:"example",level:3},{value:"Live example: Storybook",id:"live-example-storybook",level:4},{value:"Props",id:"props",level:3},{value:"<code>name: string</code>",id:"name-string",level:4},{value:"<code>tag?: React.ComponentType | string</code>",id:"tag-reactcomponenttype--string",level:4},{value:"<code>label?: React.ReactNode</code>",id:"label-reactreactnode",level:4},{value:"<code>labelHidden? boolean</code>",id:"labelhidden-boolean",level:4},{value:"<code>required? boolean</code>",id:"required-boolean",level:4},{value:"<code>disabled? boolean</code>",id:"disabled-boolean",level:4},{value:"<code>readOnly? boolean</code>",id:"readonly-boolean",level:4},{value:"<code>size? string</code>",id:"size-string",level:4},{value:"<code>inputClass?: string</code>",id:"inputclass-string",level:4},{value:"<code>labelClass?: string</code>",id:"labelclass-string",level:4},{value:"<code>helpId?: string</code>",id:"helpid-string",level:4},{value:"<code>helpMessage?: React.ReactNode</code>",id:"helpmessage-reactreactnode",level:4},{value:"<code>labelAttrs?: React.HTMLAttributes&lt;HTMLLabelElement&gt;</code>",id:"labelattrs-reacthtmlattributeshtmllabelelement",level:4},{value:"<code>groupAttrs?: FormGroupProps</code>",id:"groupattrs-formgroupprops",level:4},{value:"<code>grid?: object</code>",id:"grid-object",level:4},{value:"<code>children?: ({ input: React.ReactNode, feedback: React.ReactNode }) =&gt; React.ReactNode</code>",id:"children--input-reactreactnode-feedback-reactreactnode---reactreactnode",level:4},{value:"<code>append?: React.ReactNode | string</code>",id:"append-reactreactnode--string",level:4},{value:"<code>prepend?: React.ReactNode | string</code>",id:"prepend-reactreactnode--string",level:4},{value:"<code>isHelpVideoType?: boolean</code>",id:"ishelpvideotype-boolean",level:4}];function s(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,d.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.p,{children:"Input field wrapped in additional features such as label, feedback, grid options, etc"}),"\n",(0,l.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { Form, Field } from '@availity/form';\nimport { Button } from 'reactstrap';\nimport * as yup from 'yup';\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      hello: '',\n    }}\n    onSubmit={(values) => alert(JSON.stringify(values))}\n    validationSchema={yup.object({\n      hello: yup.string().isRequired(true),\n    })}\n  >\n    <Field name=\"hello\" label=\"Greeting\" required />\n    <Button type=\"submit\" color=\"primary\">\n      Submit\n    </Button>\n  </Form>\n);\n"})}),"\n",(0,l.jsxs)(n.h4,{id:"live-example-storybook",children:["Live example: ",(0,l.jsx)(n.a,{href:"https://availity.github.io/availity-react/storybook/?path=/docs/form-components-form-field--docs",children:"Storybook"})]}),"\n",(0,l.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,l.jsx)(n.h4,{id:"name-string",children:(0,l.jsx)(n.code,{children:"name: string"})}),"\n",(0,l.jsx)(n.p,{children:"Identifies the field and matches the validation schema."}),"\n",(0,l.jsx)(n.h4,{id:"tag-reactcomponenttype--string",children:(0,l.jsx)(n.code,{children:"tag?: React.ComponentType | string"})}),"\n",(0,l.jsxs)(n.p,{children:["The Node or tag to substitute as the input field. Default is reactstrap ",(0,l.jsx)(n.code,{children:"Input"})," tag."]}),"\n",(0,l.jsx)(n.h4,{id:"label-reactreactnode",children:(0,l.jsx)(n.code,{children:"label?: React.ReactNode"})}),"\n",(0,l.jsxs)(n.p,{children:["Contents of the field label. Renders within a Reactstrap ",(0,l.jsx)(n.code,{children:"<Label />"}),"."]}),"\n",(0,l.jsx)(n.h4,{id:"labelhidden-boolean",children:(0,l.jsx)(n.code,{children:"labelHidden? boolean"})}),"\n",(0,l.jsx)(n.p,{children:"Used to hide the label."}),"\n",(0,l.jsx)(n.h4,{id:"required-boolean",children:(0,l.jsx)(n.code,{children:"required? boolean"})}),"\n",(0,l.jsxs)(n.p,{children:["Will add ",(0,l.jsx)(n.code,{children:"aria-required"})," to input, will add ",(0,l.jsx)(n.code,{children:"<RequiredAsterisk />"})," to label."]}),"\n",(0,l.jsx)(n.h4,{id:"disabled-boolean",children:(0,l.jsx)(n.code,{children:"disabled? boolean"})}),"\n",(0,l.jsxs)(n.p,{children:["Disable the ",(0,l.jsx)(n.code,{children:"<Field />"}),"."]}),"\n",(0,l.jsx)(n.h4,{id:"readonly-boolean",children:(0,l.jsx)(n.code,{children:"readOnly? boolean"})}),"\n",(0,l.jsx)(n.p,{children:"Mark the field as read only."}),"\n",(0,l.jsx)(n.h4,{id:"size-string",children:(0,l.jsx)(n.code,{children:"size? string"})}),"\n",(0,l.jsxs)(n.p,{children:["Size of the input field. Potential values: ",(0,l.jsx)(n.code,{children:'"lg"'}),", ",(0,l.jsx)(n.code,{children:'"sm"'})]}),"\n",(0,l.jsx)(n.h4,{id:"inputclass-string",children:(0,l.jsx)(n.code,{children:"inputClass?: string"})}),"\n",(0,l.jsx)(n.p,{children:"Class names passed to the input tag."}),"\n",(0,l.jsx)(n.h4,{id:"labelclass-string",children:(0,l.jsx)(n.code,{children:"labelClass?: string"})}),"\n",(0,l.jsx)(n.p,{children:"Class names passed to the label tag."}),"\n",(0,l.jsx)(n.h4,{id:"helpid-string",children:(0,l.jsx)(n.code,{children:"helpId?: string"})}),"\n",(0,l.jsxs)(n.p,{children:["Help topic id, adds ",(0,l.jsx)(n.code,{children:"<FieldHelpIcon/>"})," next to the label (should not be within label for accessibility)."]}),"\n",(0,l.jsx)(n.h4,{id:"helpmessage-reactreactnode",children:(0,l.jsx)(n.code,{children:"helpMessage?: React.ReactNode"})}),"\n",(0,l.jsx)(n.p,{children:"Display info text below the field"}),"\n",(0,l.jsx)(n.h4,{id:"labelattrs-reacthtmlattributeshtmllabelelement",children:(0,l.jsx)(n.code,{children:"labelAttrs?: React.HTMLAttributes<HTMLLabelElement>"})}),"\n",(0,l.jsx)(n.p,{children:"Pass additional attributes to the label"}),"\n",(0,l.jsx)(n.h4,{id:"groupattrs-formgroupprops",children:(0,l.jsx)(n.code,{children:"groupAttrs?: FormGroupProps"})}),"\n",(0,l.jsxs)(n.p,{children:["Pass additional attributes to ",(0,l.jsx)(n.a,{href:"/form/components/form-group/#props",children:"Form Group"})]}),"\n",(0,l.jsx)(n.h4,{id:"grid-object",children:(0,l.jsx)(n.code,{children:"grid?: object"})}),"\n",(0,l.jsx)(n.p,{children:"Object mapping number of columns to the label and input."}),"\n",(0,l.jsx)(n.h4,{id:"children--input-reactreactnode-feedback-reactreactnode---reactreactnode",children:(0,l.jsx)(n.code,{children:"children?: ({ input: React.ReactNode, feedback: React.ReactNode }) => React.ReactNode"})}),"\n",(0,l.jsx)(n.p,{children:"Optionally override the way the input is rendered with child render prop."}),"\n",(0,l.jsx)(n.h4,{id:"append-reactreactnode--string",children:(0,l.jsx)(n.code,{children:"append?: React.ReactNode | string"})}),"\n",(0,l.jsx)(n.p,{children:"Append an InputAddon to the end of the Input."}),"\n",(0,l.jsx)(n.h4,{id:"prepend-reactreactnode--string",children:(0,l.jsx)(n.code,{children:"prepend?: React.ReactNode | string"})}),"\n",(0,l.jsx)(n.p,{children:"Append an InputAddon to the start of the Input."}),"\n",(0,l.jsx)(n.h4,{id:"ishelpvideotype-boolean",children:(0,l.jsx)(n.code,{children:"isHelpVideoType?: boolean"})}),"\n",(0,l.jsxs)(n.p,{children:["Allows the type of ",(0,l.jsx)(n.code,{children:"<FieldHelpIcon/>"})," to be changed between help-icon and video-help"]})]})}function p(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(s,{...e})}):s(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var l=t(6540);const d={},i=l.createContext(d);function o(e){const n=l.useContext(i);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:o(e.components),l.createElement(i.Provider,{value:n},e.children)}}}]);