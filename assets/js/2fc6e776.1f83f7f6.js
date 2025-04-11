"use strict";(self.webpackChunk_availity_dinosaurdocs=self.webpackChunk_availity_dinosaurdocs||[]).push([[5691],{5206:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"form/select/components/resource-select","title":"<ResourceSelect />","description":"A select list that automatically loads and pages through a resource when the user scrolls down.","source":"@site/docs/form/select/components/resource-select.md","sourceDirName":"form/select/components","slug":"/form/select/components/resource-select","permalink":"/availity-react/form/select/components/resource-select","draft":false,"unlisted":false,"editUrl":"https://github.com/availity/availity-react/edit/master/docusaurus/docs/form/select/components/resource-select.md","tags":[],"version":"current","frontMatter":{"title":"<ResourceSelect />"},"sidebar":"someSidebar","previous":{"title":"<SelectField />","permalink":"/availity-react/form/select/components/select-field"},"next":{"title":"<AvRegionSelect />","permalink":"/availity-react/form/select/components/region-select"}}');var o=t(4848),s=t(8453);const i={title:"<ResourceSelect />"},a=void 0,l={},c=[{value:"Example",id:"example",level:3},{value:"Live example: Storybook",id:"live-example-storybook",level:4},{value:"Props",id:"props",level:3},{value:"<code>name: string</code>",id:"name-string",level:4},{value:"<code>requestConfig?: object</code>",id:"requestconfig-object",level:4},{value:"<code>parameters?: object | (params: any): any</code>",id:"parameters-object--params-any-any",level:4},{value:"<code>method?: POST | GET</code>",id:"method-post--get",level:4},{value:"<code>customerId?: string</code>",id:"customerid-string",level:4},{value:"<code>requiredParams?: string[]</code>",id:"requiredparams-string",level:4},{value:"<code>cacheUniq?: any</code>",id:"cacheuniq-any",level:4},{value:"<code>watchParams?: string[]</code>",id:"watchparams-string",level:4},{value:"<code>resource: AxiosResource</code>",id:"resource-axiosresource",level:4},{value:"<code>getResult?: (data: object) =&gt; object[]</code>",id:"getresult-data-object--object",level:4},{value:"<code>debounceTimeout?: number</code>",id:"debouncetimeout-number",level:4},{value:"<code>delay?: number</code>",id:"delay-number",level:4},{value:"<code>itemsPerPage?: number</code>",id:"itemsperpage-number",level:4},{value:"<code>onPageChange?: (inputValue: string | object, page: number) =&gt; void</code>",id:"onpagechange-inputvalue-string--object-page-number--void",level:4},{value:"<code>hasMore?: boolean | (data: object) =&gt; boolean</code>",id:"hasmore-boolean--data-object--boolean",level:4},{value:"<code>additional?: object</code>",id:"additional-object",level:4},{value:"<code>graphqlConfig?: object</code>",id:"graphqlconfig-object",level:4},{value:"<code>minCharsToSearch?: number</code>",id:"mincharstosearch-number",level:4},{value:"<code>waitUntilFocused?: boolean</code>",id:"waituntilfocused-boolean",level:4},{value:"<code>defaultToOnlyOption?: boolean</code>",id:"defaulttoonlyoption-boolean",level:4},{value:"<code>defaultToFirstOption?: boolean</code>",id:"defaulttofirstoption-boolean",level:4},{value:"<code>shouldSearch?: boolean | (inputValue: string, prevOptions: OptionType, additional: any) =&gt; boolean</code>",id:"shouldsearch-boolean--inputvalue-string-prevoptions-optiontype-additional-any--boolean",level:4},{value:"<code>pageAll: boolean</code>",id:"pageall-boolean",level:4},{value:"<code>pageAllSearchBy: (previousOptions: any[], inputValue: string) =&gt; any[]</code>",id:"pageallsearchby-previousoptions-any-inputvalue-string--any",level:4},{value:"<code>onError: (error: Error) =&gt; void</code>",id:"onerror-error-error--void",level:4},{value:"<code>additionalPostGetArgs?: object</code>",id:"additionalpostgetargs-object",level:4},{value:"<code>searchTerm?: string</code>",id:"searchterm-string",level:4},{value:"Pre-made Resource Selects",id:"pre-made-resource-selects",level:3},{value:"Example",id:"example-1",level:4}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"A select list that automatically loads and pages through a resource when the user scrolls down."}),"\n",(0,o.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport { Form } from '@availity/form';\nimport { ResourceSelect } from '@availity/select';\nimport { Button } from 'reactstrap';\nimport * as yup from 'yup';\nimport '@availity/yup';\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      resourceSelect: '',\n    }}\n    onSubmit={(values) => apiResource.submit(values)}\n    validationSchema={yup.object().shape({\n      resourceSelect: yup.string().required('This field is required.'),\n    })}\n  >\n    <ResourceSelect\n      id=\"resourceSelect\"\n      name=\"resourceSelect\"\n      labelKey=\"name\"\n      label=\"Resource Select\"\n      resource={avCustomResource}\n      isMulti={false}\n    />\n    <Button color=\"primary\" type=\"submit\">\n      Submit\n    </Button>\n  </Form>\n);\n"})}),"\n",(0,o.jsxs)(n.h4,{id:"live-example-storybook",children:["Live example: ",(0,o.jsx)(n.a,{href:"https://availity.github.io/availity-react/storybook/?path=/docs/form-components-select-async-selects--docs",children:"Storybook"})]}),"\n",(0,o.jsx)(n.h3,{id:"props",children:"Props"}),"\n",(0,o.jsxs)(n.p,{children:["Extends ",(0,o.jsx)(n.a,{href:"/form/select/components/select-field/#props",children:"SelectField Props"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Note: the ",(0,o.jsx)(n.code,{children:"valueKey"})," prop will only work if you also pass ",(0,o.jsx)(n.code,{children:"false"})," to the ",(0,o.jsx)(n.code,{children:"raw"})," prop."]}),"\n",(0,o.jsx)(n.h4,{id:"name-string",children:(0,o.jsx)(n.code,{children:"name: string"})}),"\n",(0,o.jsxs)(n.p,{children:["The name of the field. Will be the key of the selected date that comes through in the values of the ",(0,o.jsx)(n.code,{children:"onSubmit"})," callback."]}),"\n",(0,o.jsx)(n.h4,{id:"requestconfig-object",children:(0,o.jsx)(n.code,{children:"requestConfig?: object"})}),"\n",(0,o.jsx)(n.p,{children:"Configuration object used in the query method on the resource. Useful for defining headers to be sent with the request."}),"\n",(0,o.jsx)(n.h4,{id:"parameters-object--params-any-any",children:(0,o.jsx)(n.code,{children:"parameters?: object | (params: any): any"})}),"\n",(0,o.jsx)(n.p,{children:"Object used to create querystring parameters in the request. If function, will return new object with params for request."}),"\n",(0,o.jsx)(n.h4,{id:"method-post--get",children:(0,o.jsx)(n.code,{children:"method?: POST | GET"})}),"\n",(0,o.jsxs)(n.p,{children:["Override method to use ",(0,o.jsx)(n.code,{children:"POST"})," request on REST calls with ",(0,o.jsx)(n.code,{children:"graphqlConfig"}),". When method = 'GET', on populating the options it will call the ",(0,o.jsx)(n.code,{children:"query"})," function on the API Resource rather then default to a POST GET for cases when not using graphql."]}),"\n",(0,o.jsx)(n.h4,{id:"customerid-string",children:(0,o.jsx)(n.code,{children:"customerId?: string"})}),"\n",(0,o.jsx)(n.p,{children:"The value of the customer ID, which is sent in the parameters. Useful for restricting the loaded options to be related to the organization the user has in context."}),"\n",(0,o.jsx)(n.h4,{id:"requiredparams-string",children:(0,o.jsx)(n.code,{children:"requiredParams?: string[]"})}),"\n",(0,o.jsx)(n.p,{children:"If present, the network request is not made until all of the required parameters specified in the array have a truthy value."}),"\n",(0,o.jsx)(n.h4,{id:"cacheuniq-any",children:(0,o.jsx)(n.code,{children:"cacheUniq?: any"})}),"\n",(0,o.jsxs)(n.p,{children:["When this prop changes, all cached options are cleared. (see ",(0,o.jsx)(n.a,{href:"https://github.com/vtaits/react-select-async-paginate#cacheuniq",children:"react-select-async-paginate"}),")"]}),"\n",(0,o.jsx)(n.h4,{id:"watchparams-string",children:(0,o.jsx)(n.code,{children:"watchParams?: string[]"})}),"\n",(0,o.jsxs)(n.p,{children:["Provide a list of properties to listen to from the parameters prop. If present, the options reset when any of the parameters specified in the array change value. This is useful for when a customerId changes and you need to load a new list of options for the user to choose from. This list will be used to derive cacheUniq when the cacheUniq prop is not provided. When using ",(0,o.jsx)(n.code,{children:"watchParams"}),", the ",(0,o.jsx)(n.code,{children:"parameters"})," prop must must be populated with values that are in the ",(0,o.jsx)(n.code,{children:"watchParams"})," object."]}),"\n",(0,o.jsx)(n.h4,{id:"resource-axiosresource",children:(0,o.jsx)(n.code,{children:"resource: AxiosResource"})}),"\n",(0,o.jsxs)(n.p,{children:["Availity API resource (see ",(0,o.jsx)(n.a,{href:"https://github.com/Availity/sdk-js/tree/master/packages/api-axios",children:"@availity/api-axios"}),")."]}),"\n",(0,o.jsx)(n.h4,{id:"getresult-data-object--object",children:(0,o.jsx)(n.code,{children:"getResult?: (data: object) => object[]"})}),"\n",(0,o.jsx)(n.p,{children:'When a function, the function is called with the response body from the API call and is expected to return an array. When a string, the string is expected to be a simple key used to get the value from the response. ("simple" means dot notation is not supported for grabbing values from nested objects. If your result is deeply nested, provide a function.)'}),"\n",(0,o.jsx)(n.h4,{id:"debouncetimeout-number",children:(0,o.jsx)(n.code,{children:"debounceTimeout?: number"})}),"\n",(0,o.jsxs)(n.p,{children:["The amount of time (in milliseconds) to wait after the user has stopped typing before making the network request (debounced input). ",(0,o.jsx)(n.strong,{children:"Default"}),": ",(0,o.jsx)(n.code,{children:"350"})]}),"\n",(0,o.jsx)(n.h4,{id:"delay-number",children:(0,o.jsx)(n.code,{children:"delay?: number"})}),"\n",(0,o.jsxs)(n.p,{children:["Set to ",(0,o.jsx)(n.code,{children:"debounceTimeout"})," if ",(0,o.jsx)(n.code,{children:"debounceTimeout"})," is not provided. (see ",(0,o.jsx)(n.a,{href:"https://github.com/vtaits/react-select-async-paginate#debouncetimeout",children:"react-select-async-paginate"}),")"]}),"\n",(0,o.jsx)(n.h4,{id:"itemsperpage-number",children:(0,o.jsx)(n.code,{children:"itemsPerPage?: number"})}),"\n",(0,o.jsx)(n.p,{children:"the number of items to fetch at a time and display per page when the user scrolls down."}),"\n",(0,o.jsx)(n.h4,{id:"onpagechange-inputvalue-string--object-page-number--void",children:(0,o.jsx)(n.code,{children:"onPageChange?: (inputValue: string | object, page: number) => void"})}),"\n",(0,o.jsx)(n.p,{children:"A callback function to inform you that the user has scrolled to the bottom of the list and more items are loaded. The current input value and the page the user wants to go to are provided as arguments to the callback function."}),"\n",(0,o.jsx)(n.h4,{id:"hasmore-boolean--data-object--boolean",children:(0,o.jsx)(n.code,{children:"hasMore?: boolean | (data: object) => boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["If true, ",(0,o.jsx)(n.code,{children:"ResourceSelect"})," attempts to retrieve the next page of results. ",(0,o.jsx)(n.code,{children:"response.data"})," from the axios response is passed as the only argument to ",(0,o.jsx)(n.code,{children:"hasMore"})," when ",(0,o.jsx)(n.code,{children:"hasMore"})," is a function. Defaults to: ",(0,o.jsx)(n.code,{children:"({ totalCount, limit, offset }) => totalCount > offset + limit;"})," for non-GraphQL apis. Defaults to ",(0,o.jsx)(n.code,{children:"(data) => data.data[${this.props.graphqlConfig.type}Pagination].pageInfo.hasNextPage"})," for GraphQL apis."]}),"\n",(0,o.jsx)(n.h4,{id:"additional-object",children:(0,o.jsx)(n.code,{children:"additional?: object"})}),"\n",(0,o.jsxs)(n.p,{children:["Additional properties to pass to ",(0,o.jsx)(n.code,{children:"AsyncPaginate"})," (see ",(0,o.jsx)(n.a,{href:"https://github.com/vtaits/react-select-async-paginate#additional",children:"react-select-async-paginate"}),")"]}),"\n",(0,o.jsx)(n.h4,{id:"graphqlconfig-object",children:(0,o.jsx)(n.code,{children:"graphqlConfig?: object"})}),"\n",(0,o.jsxs)(n.p,{children:["Object containing ",(0,o.jsx)(n.code,{children:"type"})," (String) and ",(0,o.jsx)(n.code,{children:"query"})," (String) properties. ",(0,o.jsx)(n.code,{children:"type"})," is the type of asset returned. ",(0,o.jsx)(n.code,{children:"query"})," is the GraphQL query to use in the request."]}),"\n",(0,o.jsx)(n.h4,{id:"mincharstosearch-number",children:(0,o.jsx)(n.code,{children:"minCharsToSearch?: number"})}),"\n",(0,o.jsxs)(n.p,{children:["The minimum number of characters the user must input before ",(0,o.jsx)(n.code,{children:"ResourceSelect"})," makes the network request. If the user has not inputted any characters, the network request will still be made. Useful for relieving pressure on the api the ",(0,o.jsx)(n.code,{children:"resource"})," is calling."]}),"\n",(0,o.jsx)(n.h4,{id:"waituntilfocused-boolean",children:(0,o.jsx)(n.code,{children:"waitUntilFocused?: boolean"})}),"\n",(0,o.jsx)(n.p,{children:"When true, the network request is not made until the dropdown has been focused."}),"\n",(0,o.jsx)(n.h4,{id:"defaulttoonlyoption-boolean",children:(0,o.jsx)(n.code,{children:"defaultToOnlyOption?: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["When true, if the ",(0,o.jsx)(n.code,{children:"resource"})," only returns one result the first time it is called, the value is defaulted to the single result. Note: if ",(0,o.jsx)(n.code,{children:"waitUntilFocused"})," is ",(0,o.jsx)(n.code,{children:"true"}),", this prop is ignored."]}),"\n",(0,o.jsx)(n.h4,{id:"defaulttofirstoption-boolean",children:(0,o.jsx)(n.code,{children:"defaultToFirstOption?: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["When true, if the ",(0,o.jsx)(n.code,{children:"resource"})," returns at least one result the first time it is called, the value is defaulted to the first result. Note: if ",(0,o.jsx)(n.code,{children:"waitUntilFocused"})," is ",(0,o.jsx)(n.code,{children:"true"}),", this prop is ignored."]}),"\n",(0,o.jsx)(n.h4,{id:"shouldsearch-boolean--inputvalue-string-prevoptions-optiontype-additional-any--boolean",children:(0,o.jsx)(n.code,{children:"shouldSearch?: boolean | (inputValue: string, prevOptions: OptionType, additional: any) => boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["When false or a function that returns false, the network request won't be made. Defaults to ",(0,o.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,o.jsx)(n.h4,{id:"pageall-boolean",children:(0,o.jsx)(n.code,{children:"pageAll: boolean"})}),"\n",(0,o.jsxs)(n.p,{children:["When true, ",(0,o.jsx)(n.code,{children:"resource.all()"})," is called to fetch all the results, and search strings will filter by the label values instead of making another network call. DebounceTimeout is set to zero in this case. ",(0,o.jsx)(n.strong,{children:"This should only be used for resources with a consistently small result set and no api search params"})]}),"\n",(0,o.jsx)(n.p,{children:"Example: AvRegionsSelect has a limited number of results and no api search param"}),"\n",(0,o.jsx)(n.h4,{id:"pageallsearchby-previousoptions-any-inputvalue-string--any",children:(0,o.jsx)(n.code,{children:"pageAllSearchBy: (previousOptions: any[], inputValue: string) => any[]"})}),"\n",(0,o.jsxs)(n.p,{children:["A method to specify what to filter the results by when ",(0,o.jsx)(n.code,{children:"pageAll"})," is true. The list of options and search string is passed in, and an array of similar options is expected to be returned."]}),"\n",(0,o.jsx)(n.h4,{id:"onerror-error-error--void",children:(0,o.jsx)(n.code,{children:"onError: (error: Error) => void"})}),"\n",(0,o.jsx)(n.p,{children:"Function that is called when the api call returned an error. The error is returned in the callback"}),"\n",(0,o.jsx)(n.h4,{id:"additionalpostgetargs-object",children:(0,o.jsx)(n.code,{children:"additionalPostGetArgs?: object"})}),"\n",(0,o.jsxs)(n.p,{children:["This object can be used to pass additional arguments to a resource's ",(0,o.jsx)(n.code,{children:"postGet"})," call. These additional arguments are separate from the ",(0,o.jsx)(n.code,{children:"parameters"})," that are supported by an API and may be used for filtering or other methods called inside a resource's ",(0,o.jsx)(n.code,{children:"postGet"})," method. Example for the ",(0,o.jsx)(n.code,{children:"organizations"})," resource that supports ",(0,o.jsx)(n.code,{children:"additionalPostGetArgs"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"async function postGet(data, config, additionalPostGetArgs) {\n  if (additionalPostGetArgs) {\n    const { data: organizationsData } = await super.postGet(data, config);\n\n    return this.getFilteredOrganizations(\n      organizationsData,\n      additionalPostGetArgs,\n      data\n    );\n  }\n\n  // Else return normal organizations call\n  return super.postGet(data, config);\n}\n"})}),"\n",(0,o.jsx)(n.h4,{id:"searchterm-string",children:(0,o.jsx)(n.code,{children:"searchTerm?: string"})}),"\n",(0,o.jsxs)(n.p,{children:["If present, this will serve as the argument name for the typed search value when sending the request to the API. This defaults to ",(0,o.jsx)(n.code,{children:"q"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"pre-made-resource-selects",children:"Pre-made Resource Selects"}),"\n",(0,o.jsx)(n.admonition,{type:"important",children:(0,o.jsxs)(n.p,{children:["The imports were changed in version 3.0.0. In previous versions, you had to import the components from ",(0,o.jsx)(n.code,{children:"@availity/select/resources"}),". You can now import them from the base package. eg: ",(0,o.jsx)(n.code,{children:"import { AvProviderSelect } from '@availity/select';"})]})}),"\n",(0,o.jsxs)(n.p,{children:["The following components can be imported by name from ",(0,o.jsx)(n.code,{children:"@availity/select"})]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"AvProviderSelect"}),"\n",(0,o.jsx)(n.li,{children:"AvOrganizationSelect"}),"\n",(0,o.jsx)(n.li,{children:"AvPermissionSelect"}),"\n",(0,o.jsx)(n.li,{children:"AvNavigationSelect"}),"\n",(0,o.jsx)(n.li,{children:"AvUserSelect"}),"\n",(0,o.jsx)(n.li,{children:"AvCodeSelect"}),"\n",(0,o.jsx)(n.li,{children:"AvPayerSelect"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["These components use the ",(0,o.jsx)(n.code,{children:"ResourceSelect"})," component with pre-configured ",(0,o.jsx)(n.code,{children:"resource"}),", ",(0,o.jsx)(n.code,{children:"valueKey"}),", and ",(0,o.jsx)(n.code,{children:"labelKey"})," props. All of the props for ",(0,o.jsx)(n.code,{children:"ResourceSelect"})," can be provided to override the defaults of these pre-made components. For some of these components, you must provide the ",(0,o.jsx)(n.code,{children:"customerId"})," prop."]}),"\n",(0,o.jsx)(n.h4,{id:"example-1",children:"Example"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import React from 'react';\nimport AvApi from '@availity/api-axios';\nimport { Form } from '@availity/form';\nimport {\n  AvProviderSelect,\n  AvOrganizationSelect,\n  AvPermissionSelect,\n  AvNavigationSelect,\n  AvUserSelect,\n  AvCodeSelect,\n  AvPayerSelect,\n} from '@availity/select';\nimport * as yup from 'yup';\n\nconst schema = yup.object().shape({\n  provider: yup.string().required('This field is required.'),\n  organization: yup.string().required('This field is required.'),\n  region: yup.string().required('This field is required.'),\n  permissions: yup.string().required('This field is required.'),\n  payerSpace: yup.string().required('This field is required.'),\n  user: yup.string().required('This field is required.'),\n  code: yup.string().required('This field is required.'),\n  patient: yup.string().required('This field is required.'),\n  payer: yup.string().required('This field is required.'),\n});\n\nconst Example = () => (\n  <Form\n    initialValues={{\n      provider: null,\n      organization: null,\n      region: null,\n      permissions: null,\n      payerSpace: null,\n      user: null,\n      code: null,\n      patient: null,\n      payer: null,\n    }}\n    onSubmit={(values) => apiResource.submit(values)}\n    validationSchema={schema}\n  >\n    <AvProviderSelect\n      name=\"provider\"\n      customerId=\"1234\"\n      requiredParams={['customerId']}\n      watchParams={['customerId']}\n      label=\"Select a provider\"\n      customerId={customerId}\n      required\n    />\n    <AvOrganizationSelect\n      name=\"organization\"\n      label=\"Select a Organization\"\n      required\n    />\n    <AvPermissionSelect\n      name=\"permissions\"\n      label=\"Select a provider\"\n      customerId={customerId}\n      isMulti\n      required\n    />\n    <AvNavigationSelect\n      name=\"payerSpace\"\n      label=\"Select a Payer Space\"\n      customerId={customerId}\n      required\n    />\n    <AvUserSelect name=\"user\" label=\"Select a User\" customerId={customerId} />\n    <AvCodeSelect name=\"code\" label=\"Select a Code\" />\n    <AvPayerSelect\n      name=\"payer\"\n      requiredParams={['region', 'tranTypeCode']}\n      watchParams={['region', 'tranTypeCode']}\n      customerId={customerId}\n      parameters={{\n        region: 'FL',\n        tranTypeCode: '1',\n      }}\n      label=\"Select a Payer\"\n      required\n    />\n  </Form>\n);\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(6540);const o={},s=r.createContext(o);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);