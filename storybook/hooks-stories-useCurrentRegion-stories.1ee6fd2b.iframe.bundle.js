"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[7478],{"./packages/hooks/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{xM:()=>useCurrentRegion,iZ:()=>useCurrentUser,FP:()=>useEffectAsync,JO:()=>useMount,Gi:()=>useOrganization,Sk:()=>usePermissions,u9:()=>useProviders,Z3:()=>useTimeout,eY:()=>useToggle,vh:()=>src_useWindowDimensions});var react=__webpack_require__("./node_modules/react/index.js");function useEffectAsync(effect,inputs){(0,react.useEffect)((()=>{effect()}),inputs)}function useMount(effect){(0,react.useEffect)(effect,[])}function useTimeout(){let ms=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;const[ready,setReady]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let unmounted=!1;const timer=setTimeout((()=>{unmounted||setReady(!0)}),ms);return()=>{unmounted=!0,clearTimeout(timer)}}),[ms]),ready}function useToggle(){let initialState=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[state,setState]=(0,react.useState)(initialState);return[state,newState=>{void 0!==newState&&newState!==state?setState(newState):void 0===newState&&setState(!state)}]}var useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),dist=__webpack_require__("./node_modules/@availity/api-axios/dist/index.mjs");async function fetchRegion(){const response=await dist.Nw.getCurrentRegion();return{code:response?.data?.regions?.[0]?.id||"",value:response?.data?.regions?.[0]?.value||""}}function useCurrentRegion(options){return(0,useQuery.I)(["region"],fetchRegion,options)}const fetchUser=async()=>dist.XG.me();function useCurrentUser(options){return(0,useQuery.I)(["user"],fetchUser,options)}const fetchProviders=async config=>dist.Ml.getProviders(config.customerId,config);function useProviders(config,options){return(0,useQuery.I)(["providers",config],(()=>fetchProviders(config)),options)}const fetchPermissions=async config=>dist.Kl.getPermissions(config);function usePermissions(config,options){return(0,useQuery.I)(["permissions",config],(()=>fetchPermissions(config)),options)}const fetchOrganization=async config=>dist.US.getOrganizations(config);function useOrganization(config,options){return(0,useQuery.I)(["organizations",config],(()=>fetchOrganization(config)),options)}__webpack_require__("./node_modules/@availity/message-core/dist/index.mjs");const getWindowDimensions=()=>{const{innerWidth:width,innerHeight:height}=window;return{width,height}},src_useWindowDimensions=()=>{const[windowDimensions,setWindowDimensions]=(0,react.useState)(getWindowDimensions());return(0,react.useEffect)((()=>{const handleResize=()=>{setWindowDimensions(getWindowDimensions())};return window.addEventListener("resize",handleResize),()=>window.removeEventListener("resize",handleResize)}),[]),windowDimensions}},"./packages/hooks/stories/ResourceComponent.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var reactstrap__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/reactstrap/es/Card.js"),reactstrap__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/reactstrap/es/CardTitle.js"),reactstrap__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/reactstrap/es/CardBody.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ResourceComponent=_ref=>{let{data,loading,title=""}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(reactstrap__WEBPACK_IMPORTED_MODULE_2__.A,{body:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(reactstrap__WEBPACK_IMPORTED_MODULE_3__.A,{className:"text-center",tag:"h4",children:title}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(reactstrap__WEBPACK_IMPORTED_MODULE_4__.A,{children:loading?"Loading...":(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("pre",{children:JSON.stringify(data,null,2)})})]})};ResourceComponent.displayName="ResourceComponent";const __WEBPACK_DEFAULT_EXPORT__=ResourceComponent;try{ResourceComponent.displayName="ResourceComponent",ResourceComponent.__docgenInfo={description:"",displayName:"ResourceComponent",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"Record<string, unknown>"}},loading:{defaultValue:null,description:"",name:"loading",required:!0,type:{name:"boolean"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/hooks/stories/ResourceComponent.tsx#ResourceComponent"]={docgenInfo:ResourceComponent.__docgenInfo,name:"ResourceComponent",path:"packages/hooks/stories/ResourceComponent.tsx#ResourceComponent"})}catch(__react_docgen_typescript_loader_error){}},"./packages/hooks/stories/useCurrentRegion.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryClient.mjs"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/hooks/index.js"),_ResourceComponent__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/hooks/stories/ResourceComponent.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Hooks/useCurrentRegion",parameters:{docs:{description:{component:"Hook that returns the user's current region."}}},decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.Ht,{client:new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.E,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Story,{})})]},Default=()=>{const{data,isLoading}=(0,___WEBPACK_IMPORTED_MODULE_1__.xM)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ResourceComponent__WEBPACK_IMPORTED_MODULE_2__.A,{title:"Region",data,loading:isLoading})};Default.displayName="Default",Default.storyName="default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => {\n  const {\n    data,\n    isLoading\n  } = useCurrentRegion();\n  return <ResourceComponent title="Region" data={data} loading={isLoading} />;\n}',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]}}]);