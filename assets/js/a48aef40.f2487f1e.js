"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[9240],{908:(e,s,o)=>{o.r(s),o.d(s,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var n=o(4848),i=o(8453);const t={title:"<AvOrganizationSelect />"},r=void 0,a={id:"form/select/components/organization-select",title:"<AvOrganizationSelect />",description:"A select list that automatically loads and pages through organizations when the user scrolls down.",source:"@site/docs/form/select/components/organization-select.md",sourceDirName:"form/select/components",slug:"/form/select/components/organization-select",permalink:"/availity-react/form/select/components/organization-select",draft:!1,unlisted:!1,editUrl:"https://github.com/availity/availity-react/edit/master/docusaurus/docs/form/select/components/organization-select.md",tags:[],version:"current",frontMatter:{title:"<AvOrganizationSelect />"},sidebar:"someSidebar",previous:{title:"<AvRegionSelect />",permalink:"/availity-react/form/select/components/region-select"},next:{title:"<AvPayerSelect />",permalink:"/availity-react/form/select/components/payer-select"}},c={},d=[{value:"Example",id:"example",level:3},{value:"Live example: Storybook",id:"live-example-storybook",level:4},{value:"Props",id:"props",level:3},{value:"<code>resourceIds?: string | string[]</code>",id:"resourceids-string--string",level:4},{value:"<code>permissionIds: string | string[]</code>",id:"permissionids-string--string",level:4},{value:"Additional notes on production usage",id:"additional-notes-on-production-usage",level:3}];function l(e){const s={a:"a",code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"A select list that automatically loads and pages through organizations when the user scrolls down."}),"\n",(0,n.jsx)(s.h3,{id:"example",children:"Example"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-jsx",children:"import React from 'react';\nimport { Form } from '@availity/form';\nimport { AvOrganizationSelect } from '@availity/select';\nimport { Button } from 'reactstrap';\nimport * as yup from 'yup';\nimport '@availity/yup';\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      organizations: '',\n    }}\n    onSubmit={(values) => apiResource.submit(values)}\n    validationSchema={yup.object().shape({\n      organizations: yup.string().isRequired('This field is required.'),\n    })}\n  >\n    <AvOrganizationSelect\n      id=\"organizations\"\n      name=\"organizations\"\n      parameters={{\n        regionId: 'FL',\n        // permissionId can still be used here if\n        // the additionalPostGetArgs logic is not being used\n        permissionId: ['1111', '2222'],\n      }}\n      // permission 1111 OR 2222, with resource\n      // 1234 OR 4321 is required for each organization\n      permissionIds={['1111', '2222']}\n      resourceIds={['1234', '4321']}\n    />\n    <Button color=\"primary\" type=\"submit\">\n      Submit\n    </Button>\n  </Form>\n);\n"})}),"\n",(0,n.jsxs)(s.h4,{id:"live-example-storybook",children:["Live example: ",(0,n.jsx)(s.a,{href:"https://availity.github.io/availity-react/storybook/?path=/story/form-components-select-async-selects--organization-select",children:"Storybook"})]}),"\n",(0,n.jsx)(s.h3,{id:"props",children:"Props"}),"\n",(0,n.jsxs)(s.p,{children:["Extends ",(0,n.jsx)(s.a,{href:"/form/select/components/resource-select/#props",children:"ResourceSelect Props"}),"."]}),"\n",(0,n.jsx)(s.h4,{id:"resourceids-string--string",children:(0,n.jsx)(s.code,{children:"resourceIds?: string | string[]"})}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"organizations"})," API from ",(0,n.jsx)(s.code,{children:"sdk-js"})," accepts a ",(0,n.jsx)(s.code,{children:"resourceIds"})," prop inside of ",(0,n.jsx)(s.code,{children:"additionalPostGetArgs"})," that can be either a string or nested array of strings. When ",(0,n.jsx)(s.code,{children:"AvOrganizationSelect"})," has a ",(0,n.jsx)(s.code,{children:"resourceIds"})," prop, then the results of the ",(0,n.jsx)(s.code,{children:"postGet"})," call to ",(0,n.jsx)(s.code,{children:"organizations"})," will be filtered, containing only organizations that have the specified permissions and resources. This is useful when a payer space app is restricted to permission ",(0,n.jsx)(s.code,{children:"A"})," and resource ",(0,n.jsx)(s.code,{children:"B"}),", a user can pass ",(0,n.jsx)(s.code,{children:"A"})," and ",(0,n.jsx)(s.code,{children:"B"})," as ",(0,n.jsx)(s.code,{children:"permissionIds"})," and ",(0,n.jsx)(s.code,{children:"resourceIds"})," into ",(0,n.jsx)(s.code,{children:"AvOrganizationSelect"})," and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to. AND logic is enforced by putting resources in an array together."]}),"\n",(0,n.jsxs)(s.p,{children:["Example: resource ",(0,n.jsx)(s.code,{children:"A"})," or ",(0,n.jsx)(s.code,{children:"B"})," are required under permission ",(0,n.jsx)(s.code,{children:"C"})," -> permissionIds: ['C'], resourcesIds: ['A', 'B']"]}),"\n",(0,n.jsx)(s.h4,{id:"permissionids-string--string",children:(0,n.jsx)(s.code,{children:"permissionIds: string | string[]"})}),"\n",(0,n.jsxs)(s.p,{children:["The ",(0,n.jsx)(s.code,{children:"organizations"})," API from ",(0,n.jsx)(s.code,{children:"sdk-js"})," accepts a ",(0,n.jsx)(s.code,{children:"permissionIds"})," prop inside of ",(0,n.jsx)(s.code,{children:"additionalPostGetArgs"})," that can be either a string or nested array of strings. When used with ",(0,n.jsx)(s.code,{children:"resourceIds"}),", the results of the ",(0,n.jsx)(s.code,{children:"postGet"})," call to ",(0,n.jsx)(s.code,{children:"organizations"})," will be filtered, containing only organizations that have the specified permissions and resources. If ",(0,n.jsx)(s.code,{children:"additionalPostGetArgs.permissionsIds"})," exists, these values will be used over ",(0,n.jsx)(s.code,{children:"parameters.permissionId"}),". This is useful when a payer space app is restricted to permission ",(0,n.jsx)(s.code,{children:"A"})," and resource ",(0,n.jsx)(s.code,{children:"B"}),", a user can pass ",(0,n.jsx)(s.code,{children:"A"})," and ",(0,n.jsx)(s.code,{children:"B"})," as ",(0,n.jsx)(s.code,{children:"permissionIds"})," and ",(0,n.jsx)(s.code,{children:"resourceIds"})," into ",(0,n.jsx)(s.code,{children:"AvOrganizationSelect"})," and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to. AND logic is enforced by putting permissions in an array together."]}),"\n",(0,n.jsxs)(s.p,{children:["Example: resource ",(0,n.jsx)(s.code,{children:"A"})," under permission ",(0,n.jsx)(s.code,{children:"C"})," AND resource ",(0,n.jsx)(s.code,{children:"B"})," under permission ",(0,n.jsx)(s.code,{children:"D"})," are required -> permissionIds: [ ['C', 'D'] ], resourceIds: [ ['A', 'B'] ]"]}),"\n",(0,n.jsx)(s.h3,{id:"additional-notes-on-production-usage",children:"Additional notes on production usage"}),"\n",(0,n.jsx)(s.p,{children:"Based on our experience using this component in production environments with high volume usage, we have a few additional suggestions for developers."}),"\n",(0,n.jsx)(s.p,{children:"Consider that while the overwhelming majority of your users may only belong to a handful of organizations, in production you will also have users who belong to >100 organizations. This may make use of this component more difficult and result in subtle and difficult to diagnose behaviors. Consider that if users navigate to a page with an orgId pre-populated from the URL, that organization may not be in the first page of responses from the backend. If we are fetching one page at a time our response callback may not have access to the complete set of results."}),"\n",(0,n.jsxs)(s.p,{children:["There would typically be two ways to work around this limitation. Developers might be tempted to use the pageAll prop (see ",(0,n.jsx)(s.a,{href:"/form/select/components/resource-select/#props",children:"ResourceSelect docs"}),"), but this will prevent passing in any api search parameters and leads to duplicating filtering logic that already exists on the backend. Additionally, developers should avoid this method if at all possible due to performance considerations of repeatedly fetching large numbers of user orgs up front as opposed to waiting for when that the information is needed."]}),"\n",(0,n.jsx)(s.p,{children:"Secondly, developers may decide to store a local copy of the http responses as they come in and use their own custom logic to perform any automated selection or matching after a complete set of responses has been received. This is likely the safest approach at this time, but comes with some obvious drawbacks of having to maintain additional state and duplicate some information in places."}),"\n",(0,n.jsx)(s.p,{children:"If you run into similar problems with this or any other ResourceSelect component, PRs and suggestions are welcome. Work to improve and mitigate these limitations is currently underway."})]})}function h(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,s,o)=>{o.d(s,{R:()=>r,x:()=>a});var n=o(6540);const i={},t=n.createContext(i);function r(e){const s=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(t.Provider,{value:s},e.children)}}}]);