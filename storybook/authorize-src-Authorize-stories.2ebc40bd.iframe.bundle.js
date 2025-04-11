"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[2955],{"./node_modules/reactstrap/es/Alert.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),classnames__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/reactstrap/es/utils.js"),_Fade__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/reactstrap/es/Fade.js"),_excluded=["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.A)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_3___default().node,className:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,closeClassName:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,closeAriaLabel:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,cssModule:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,color:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,fade:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,isOpen:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,toggle:prop_types__WEBPACK_IMPORTED_MODULE_3___default().func,tag:_utils__WEBPACK_IMPORTED_MODULE_4__.tagPropType,transition:prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape(_Fade__WEBPACK_IMPORTED_MODULE_5__.A.propTypes),innerRef:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,prop_types__WEBPACK_IMPORTED_MODULE_3___default().func])},defaultProps={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:_objectSpread(_objectSpread({},_Fade__WEBPACK_IMPORTED_MODULE_5__.A.defaultProps),{},{unmountOnExit:!0})};function Alert(props){var className=props.className,closeClassName=props.closeClassName,closeAriaLabel=props.closeAriaLabel,cssModule=props.cssModule,Tag=props.tag,color=props.color,isOpen=props.isOpen,toggle=props.toggle,children=props.children,transition=props.transition,fade=props.fade,innerRef=props.innerRef,attributes=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__.A)(props,_excluded),classes=(0,_utils__WEBPACK_IMPORTED_MODULE_4__.mapToCssModules)(classnames__WEBPACK_IMPORTED_MODULE_2___default()(className,"alert","alert-"+color,{"alert-dismissible":toggle}),cssModule),closeClasses=(0,_utils__WEBPACK_IMPORTED_MODULE_4__.mapToCssModules)(classnames__WEBPACK_IMPORTED_MODULE_2___default()("close",closeClassName),cssModule),alertTransition=_objectSpread(_objectSpread(_objectSpread({},_Fade__WEBPACK_IMPORTED_MODULE_5__.A.defaultProps),transition),{},{baseClass:fade?transition.baseClass:"",timeout:fade?transition.timeout:0});return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Fade__WEBPACK_IMPORTED_MODULE_5__.A,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__.A)({},attributes,alertTransition,{tag:Tag,className:classes,in:isOpen,role:"alert",innerRef}),toggle?react__WEBPACK_IMPORTED_MODULE_1__.createElement("button",{type:"button",className:closeClasses,"aria-label":closeAriaLabel,onClick:toggle},react__WEBPACK_IMPORTED_MODULE_1__.createElement("span",{"aria-hidden":"true"},"×")):null,children)}Alert.propTypes=propTypes,Alert.defaultProps=defaultProps;const __WEBPACK_DEFAULT_EXPORT__=Alert},"./packages/authorize/src/Authorize.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_Authorize:()=>_Authorize,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var reactstrap__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/reactstrap/es/Alert.js"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryClient.mjs"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/authorize/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Authorize/Authorize",component:___WEBPACK_IMPORTED_MODULE_1__.A,decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.Ht,{client:new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.E,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Story,{})})],tags:["autodocs"],args:{permissions:["1234"],organizationId:"1111",region:!0,unauthorized:"You are not authorized to see this content.",children:"You are authorized to see this content.",negate:!1,loader:!0},argTypes:{children:{control:"text"},unauthorized:{control:"text"}},parameters:{docs:{description:{component:"Component for showing content based on the user's permissions. Wrap this component around content you only want specific users to see.\n\nThe `useAuthorize` hook utilizes [react-query](https://tanstack.com/query/v4/docs/framework/react/overview) to handle data fetching.\nThis means you must add a [QueryClientProvider](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider)\nto your app if you do not already have one.\n\nThe default setup should cover most use-cases. However, there are 2 query options we recommend looking into\nin order to determine what is correct for your app. These settings are `refetchOnWindowFocus` and\n`staleTime`. The first option sets whether the to refetch the query when the window is focused, and\nthe other is the default marker for how long the query is valid."}}}},_Authorize={render:_ref=>{let{children,unauthorized,...args}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs to see what the component will do when you set the required permissions to various things."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("hr",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{unauthorized:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(reactstrap__WEBPACK_IMPORTED_MODULE_5__.A,{color:"danger",children:unauthorized}),...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(reactstrap__WEBPACK_IMPORTED_MODULE_5__.A,{color:"success",children})})]})}};_Authorize.parameters={..._Authorize.parameters,docs:{..._Authorize.parameters?.docs,source:{originalSource:'{\n  render: ({\n    children,\n    unauthorized,\n    ...args\n  }) => <div>\n      <p>\n        For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs\n        to see what the component will do when you set the required permissions to various things.\n      </p>\n      <hr />\n      <Authorize unauthorized={<Alert color="danger">{unauthorized}</Alert>} {...args}>\n        <Alert color="success">{children}</Alert>\n      </Authorize>\n    </div>\n}',..._Authorize.parameters?.docs?.source}}};const __namedExportsOrder=["_Authorize"]},"./packages/authorize/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>src_Authorize,r:()=>src_useAuthorize});__webpack_require__("./node_modules/react/index.js");var dist=__webpack_require__("./packages/block-ui/dist/index.js"),dist_default=__webpack_require__.n(dist),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),api_axios_dist=__webpack_require__("./node_modules/@availity/api-axios/dist/index.mjs");const checkPermission=(permission,resources,organizationId,customerId)=>{if(!permission)return!1;let isAuthorizedForCustomerId=!0,isAuthorizedForOrganizationId=!0,isAuthorizedForResources=!0;if(organizationId&&(isAuthorizedForOrganizationId=permission.organizations.some((_ref=>{let{id:orgId}=_ref;return orgId===organizationId}))),customerId&&(isAuthorizedForCustomerId=permission.organizations.some((_ref2=>{let{customerId:orgCustomerId}=_ref2;return orgCustomerId===customerId}))),void 0!==resources){const resourceSets=Array.isArray(resources)?resources:[resources];isAuthorizedForResources=0===resourceSets.length||resourceSets.some((resourceSet=>Array.isArray(resourceSet)?resourceSet.every((resource=>permission.organizations.some((_ref3=>{let{resources:orgResources=[]}=_ref3;return orgResources.some((_ref4=>{let{id}=_ref4;return`${id}`==`${resource}`}))})))):permission.organizations.some((_ref5=>{let{resources:orgResources=[]}=_ref5;return orgResources.some((_ref6=>{let{id}=_ref6;return`${id}`==`${resourceSet}`}))}))))}return isAuthorizedForCustomerId&&isAuthorizedForOrganizationId&&isAuthorizedForResources},checkPermissions=async(permissions,region,resources,organizationId,customerId)=>{if(!permissions)return!1;permissions=Array.isArray(permissions)?permissions:[permissions];const response=await(async(permissions,region)=>permissions?(await api_axios_dist.z9.getPermissions(permissions,region)).reduce(((prev,cur)=>(prev[cur.id]=cur,prev)),{}):{})(permissions,region);return permissions.some((permissionSet=>Array.isArray(permissionSet)?permissionSet.every((permission=>checkPermission(response[permission],resources,organizationId,customerId))):checkPermission(response[permissionSet],resources,organizationId,customerId)))},src_useAuthorize=function(permissions){let parameters=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},options=arguments.length>2?arguments[2]:void 0;const queryClient=(0,QueryClientProvider.jE)(),{organizationId,customerId,region=!0,resources}=parameters,{data:authorized=!1,isLoading}=(0,useQuery.I)(["useAuthorize",permissions,region,resources,organizationId,customerId],(async()=>{const currentRegion=await queryClient.fetchQuery(["region"],(()=>(async region=>{if(!0===region){const resp=await api_axios_dist.Nw.getCurrentRegion();return resp?.data?.regions?.[0]?.id}return region||void 0})(region)));return checkPermissions(permissions,currentRegion,resources,organizationId,customerId)}),{enabled:permissions.length>0,...options});return{authorized,isLoading}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Authorize=_ref=>{let{permissions,resources,customerId,organizationId,region=!0,loader,negate,children=null,unauthorized=null,queryOptions}=_ref;const{authorized,isLoading}=src_useAuthorize(permissions,{customerId,organizationId,region,resources},queryOptions);return isLoading?loader?!0===loader?(0,jsx_runtime.jsx)(dist_default(),{blocking:!0}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:loader}):null:!authorized&&!negate||authorized&&negate?(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:unauthorized}):(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children})},src_Authorize=Authorize;try{Authorize.displayName="Authorize",Authorize.__docgenInfo={description:"",displayName:"Authorize",props:{children:{defaultValue:{value:"null"},description:"The content that renders when the user does have the permissions required.",name:"children",required:!1,type:{name:"ReactNode"}},loader:{defaultValue:null,description:"When true, BlockUi is used when loading the permissions. When a node, that node is rendered instead of BlockUi when loading the permissions. When false, nothing is rendered when loading the permissions. Default: true.",name:"loader",required:!1,type:{name:"ReactNode"}},negate:{defaultValue:null,description:'Negate the authorization. If the user does have the permissions specified, they are considered "unauthorized" (shown the unauthorized prop content). If the user does not have the permissions specified, they are considered "authorized" (shown the children prop content)',name:"negate",required:!1,type:{name:"boolean | undefined"}},unauthorized:{defaultValue:{value:"null"},description:"The content that renders when the user does not have the permissions required.",name:"unauthorized",required:!1,type:{name:"ReactNode"}},permissions:{defaultValue:null,description:"- **string**: The permission ID, eg: '1234'\n- **array**: The array can contain Permission ID's as well as other arrays which contain Permission ID's\neg: ['1234', '2345', ['3456', '4567'], ['5678', '6789']]. The items in a nested array indicate\nPermission ID's that must all be granted to the user to be considered authorized - they act as an \"AND\".\nThe items in the top of the array act as an \"OR\" - if any are granted to the user, the user is considered\nauthorized. For example, ['1234', '2345', ['3456', '4567'], ['5678', '6789']] is equivalent to\n'1234' || '2345' || ('3456' && '4567') || ('5678' && '6789').",name:"permissions",required:!0,type:{name:"(string | string[])[]"}},queryOptions:{defaultValue:null,description:"React Query Options",name:"queryOptions",required:!1,type:{name:'Omit<UseQueryOptions<boolean, unknown, boolean, (string | boolean | (string | string[])[] | undefined)[]>, "queryKey" | "queryFn"> | undefined'}},organizationId:{defaultValue:null,description:"When present, the permission is validated to ensure it is assigned to the organization.",name:"organizationId",required:!1,type:{name:"string | undefined"}},customerId:{defaultValue:null,description:"When present, the permission is validated to ensure it is assigned to the customer.",name:"customerId",required:!1,type:{name:"string | undefined"}},region:{defaultValue:{value:"true"},description:"When a string, the permission is validated to ensure it is assigned in the provided region.\nWhen true, the permission is validated to ensure it is assigned in the current region.",name:"region",required:!1,type:{name:"string | boolean | undefined"}},resources:{defaultValue:null,description:"- **string**: The permission ID, eg: `'1234'`\n- **array**: The array can contain Permission ID's as well as other arrays which contain Permission ID's\neg: `['1234', '2345', ['3456', '4567'], ['5678', '6789']]`. The items in a nested array indicate\nPermission ID's that must all be granted to the user to be considered authorized - they act as an `\"AND\"`.\nThe items in the top of the array act as an `\"OR\"` - if any are granted to the user, the user is considered\nauthorized. For example, `['1234', '2345', ['3456', '4567'], ['5678', '6789']]` is equivalent to\n`'1234' || '2345' || ('3456' && '4567') || ('5678' && '6789')`.",name:"resources",required:!1,type:{name:"(string | string[])[] | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/authorize/src/Authorize.tsx#Authorize"]={docgenInfo:Authorize.__docgenInfo,name:"Authorize",path:"packages/authorize/src/Authorize.tsx#Authorize"})}catch(__react_docgen_typescript_loader_error){}},"./packages/block-ui/dist/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var mod,__defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value,index_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(index_exports,{default:()=>BlockUi_default}),module.exports=(mod=index_exports,((to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to})(__defProp({},"__esModule",{value:!0}),mod));var import_react=__webpack_require__("./node_modules/react/index.js"),import_jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Bullet(){return(0,import_jsx_runtime.jsx)("span",{className:"loading-bullet",children:"•"})}var Loader_default=function Loader(){return(0,import_jsx_runtime.jsxs)("div",{className:"loading-indicator",children:[(0,import_jsx_runtime.jsx)(Bullet,{}),(0,import_jsx_runtime.jsx)(Bullet,{}),(0,import_jsx_runtime.jsx)(Bullet,{})]})},import_jsx_runtime2=__webpack_require__("./node_modules/react/jsx-runtime.js");var BlockUi_default=function BlockUi(_a){var _b=_a,{blocking,children,className="",keepInView,loader=(0,import_jsx_runtime2.jsx)(Loader_default,{}),message,renderChildren=!0,tag:Tag="div"}=_b,rest=((source,exclude)=>{var target={};for(var prop in source)__hasOwnProp.call(source,prop)&&exclude.indexOf(prop)<0&&(target[prop]=source[prop]);if(null!=source&&__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(source))exclude.indexOf(prop)<0&&__propIsEnum.call(source,prop)&&(target[prop]=source[prop]);return target})(_b,["blocking","children","className","keepInView","loader","message","renderChildren","tag"]);const[top,setTop]=(0,import_react.useState)("50%"),blockerRef=(0,import_react.useRef)(null),topFocusRef=(0,import_react.useRef)(null),containerRef=(0,import_react.useRef)(null),messageContainerRef=(0,import_react.useRef)(null),handleKeepInView=(0,import_react.useCallback)((()=>{if(blocking&&keepInView&&containerRef.current){const containerBounds=containerRef.current.getBoundingClientRect(),windowHeight=window.innerHeight;if(containerBounds.top>windowHeight||containerBounds.bottom<0)return;if(containerBounds.top>=0&&containerBounds.bottom<=windowHeight)return void("50%"!==top&&setTop("50%"));const messageBoundsHeight=messageContainerRef.current?messageContainerRef.current.getBoundingClientRect().height:0;let newTop=Math.max(Math.min(windowHeight,containerBounds.bottom)-Math.max(containerBounds.top,0),messageBoundsHeight)/2;containerBounds.top<0&&(newTop=Math.min(newTop-containerBounds.top,containerBounds.height-messageBoundsHeight/2)),top!==newTop&&setTop(newTop)}}),[blocking,keepInView,top]);(0,import_react.useEffect)((()=>(window.addEventListener("scroll",handleKeepInView),()=>{window.removeEventListener("scroll",handleKeepInView)})),[handleKeepInView]);const blockingTab=function(event){let withShift=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{key,shiftKey}=event;return blocking&&"Tab"===key&&shiftKey===withShift},shouldRenderChildren=!blocking||renderChildren;return(0,import_jsx_runtime2.jsxs)(Tag,(a=((a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a})({className:blocking?`block-ui ${className}`:className,"aria-busy":blocking},rest),b={children:[blocking?(0,import_jsx_runtime2.jsx)("div",{tabIndex:0,onKeyUp:event=>{blockerRef.current&&blockingTab(event)&&blockerRef.current.focus()},onKeyDown:event=>{blockerRef.current&&blockingTab(event)&&(event.preventDefault(),blockerRef.current.focus())},ref:topFocusRef,className:"sr-only",children:message||"loading"}):null,shouldRenderChildren?children:null,blocking?(0,import_jsx_runtime2.jsxs)("div",{className:"block-ui-container",tabIndex:0,ref:blockerRef,onKeyUp:event=>{topFocusRef.current&&blockingTab(event,!0)&&topFocusRef.current.focus()},onKeyDown:event=>{topFocusRef.current&&blockingTab(event,!0)&&(event.preventDefault(),topFocusRef.current.focus())},children:[(0,import_jsx_runtime2.jsx)("div",{className:"block-ui-overlay",ref:containerRef}),(0,import_jsx_runtime2.jsx)("div",{className:"block-ui-message-container",ref:messageContainerRef,style:{top:keepInView?top:void 0},children:(0,import_jsx_runtime2.jsxs)("div",{className:"block-ui-message",children:[message||(0,import_jsx_runtime2.jsx)("div",{className:"sr-only",children:"loading"}),(0,import_react.isValidElement)(loader)?(0,import_jsx_runtime2.jsx)("div",{"aria-hidden":!0,children:loader}):null]})})]}):null]},__defProps(a,__getOwnPropDescs(b))));var a,b}}}]);