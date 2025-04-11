"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[3866],{853:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>l,toc:()=>a});const l=JSON.parse('{"id":"form/components/label","title":"<Label />","description":"Label that handles required indicator and field help icon. Uses Reactstrap Label.","source":"@site/docs/form/components/label.md","sourceDirName":"form/components","slug":"/form/components/label","permalink":"/availity-react/form/components/label","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/form/components/label.md","tags":[],"version":"current","frontMatter":{"title":"<Label />"},"sidebar":"someSidebar","previous":{"title":"<Input />","permalink":"/availity-react/form/components/input"},"next":{"title":"<FieldHelpIcon />","permalink":"/availity-react/form/components/help-icon"}}');var o=i(4848),t=i(8453);const r={title:"<Label />"},s=void 0,d={},a=[{value:"Additional Components",id:"additional-components",level:3},{value:"Example",id:"example",level:3},{value:"Live example: Storybook",id:"live-example-storybook",level:4},{value:"Props",id:"props",level:3},{value:"<code>id?: string</code>",id:"id-string",level:4},{value:"<code>helpId?: string</code>",id:"helpid-string",level:4},{value:"<code>required?: boolean</code>",id:"required-boolean",level:4},{value:"<code>isHelpVideoType?: boolean</code>",id:"ishelpvideotype-boolean",level:4}];function c(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Label that handles required indicator and field help icon. Uses Reactstrap Label."}),"\n",(0,o.jsx)(n.h3,{id:"additional-components",children:"Additional Components"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"<RequiredAsterisk />"})}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"<RequiredKey />"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:['Explains Asterisk Meaning - "Fields marked with an asterisk ',(0,o.jsx)(n.code,{children:"<RequiredAsterisk />"}),' are required."']}),"\n",(0,o.jsxs)(n.li,{children:["Should be at top of form when using ",(0,o.jsx)(n.code,{children:"<RequiredAsterisk />"})," indicators."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:'import React from \'react\';\nimport { Form, Input, Label } from \'@availity/form\';\nimport { Button } from \'reacstrap\';\nimport * as yup from \'yup\';\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      hello: \'\',\n    }}\n    onSubmit={(values) => alert(JSON.stringify(values))}\n    validationSchema={yup.object({\n      hello: yup.string().required(),\n    })}\n    className="d-flex"\n  >\n    <RequiredKey />\n\n    <Label for="hello" helpId="hello-help-id" required>\n      Hello\n    </Label>\n    <Input name="hello" />\n    <Button type="submit" className="ml-1" color="primary">\n      Submit\n    </Button>\n  </Form>\n);\n'})}),"\n",(0,o.jsxs)(n.h4,{id:"live-example-storybook",children:["Live example: ",(0,o.jsx)(n.a,{href:"https://availity.github.io/availity-react/storybook/?path=/docs/form-components-form-label--docs",children:"Storybook"})]}),"\n",(0,o.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,o.jsxs)(n.p,{children:["Extends Reactstrap v8 Label Props (",(0,o.jsx)(n.code,{children:"for"}),", ",(0,o.jsx)(n.code,{children:"tag"}),", ",(0,o.jsx)(n.code,{children:"className"}),", ",(0,o.jsx)(n.code,{children:"hidden"}),", etc)"]}),"\n",(0,o.jsx)(n.h4,{id:"id-string",children:(0,o.jsx)(n.code,{children:"id?: string"})}),"\n",(0,o.jsx)(n.p,{children:"Id of the label element. Default is generated UUID."}),"\n",(0,o.jsx)(n.h4,{id:"helpid-string",children:(0,o.jsx)(n.code,{children:"helpId?: string"})}),"\n",(0,o.jsxs)(n.p,{children:["Help topic id, adds ",(0,o.jsx)(n.code,{children:"<FieldHelpIcon/>"})," next to the label (should not be within label for accessibility)."]}),"\n",(0,o.jsx)(n.h4,{id:"required-boolean",children:(0,o.jsx)(n.code,{children:"required?: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["Will add ",(0,o.jsx)(n.code,{children:"<RequiredAsterisk />"})," to label."]}),"\n",(0,o.jsx)(n.h4,{id:"ishelpvideotype-boolean",children:(0,o.jsx)(n.code,{children:"isHelpVideoType?: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["Allows the type of ",(0,o.jsx)(n.code,{children:"<FieldHelpIcon/>"})," to be changed between help-icon and video-help"]})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>s});var l=i(6540);const o={},t=l.createContext(o);function r(e){const n=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);