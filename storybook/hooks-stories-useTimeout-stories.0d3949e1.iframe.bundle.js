"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[628],{"./packages/hooks/stories/useTimeout.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/hooks/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Hooks/useTimeout",parameters:{docs:{description:{component:"Hook that returns true after the given amount of time in milliseconds."}}}},Default=_ref=>{let{beforeTimeout,afterTimeout,timeout}=_ref;const Component=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(beforeTimeout),ready=(0,___WEBPACK_IMPORTED_MODULE_1__.Z3)(timeout);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{ready&&setValue(afterTimeout)}),[ready]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p",{children:["Timeout triggered: ",`${ready}`]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p",{children:["Value: ",value]})]})};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Component,{})};Default.displayName="Default",Default.args={beforeTimeout:"Hello",afterTimeout:"World",timeout:3e3},Default.storyName="default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  beforeTimeout,\n  afterTimeout,\n  timeout\n}) => {\n  const Component = () => {\n    const [value, setValue] = useState(beforeTimeout);\n    const ready = useTimeout(timeout);\n    useEffect(() => {\n      if (ready) {\n        setValue(afterTimeout);\n      }\n    }, [ready]);\n    return <div>\n        <p>Timeout triggered: {`${ready}`}</p>\n        <p>Value: {value}</p>\n      </div>;\n  };\n  return <Component />;\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./node_modules/@availity/message-core/dist/index.js":module=>{var mod,_lastId,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__hasOwnProp=Object.prototype.hasOwnProperty,__publicField=(obj,key,value)=>(((obj,key,value)=>{key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value})(obj,"symbol"!=typeof key?key+"":key,value),value),__accessCheck=(obj,member,msg)=>{if(!member.has(obj))throw TypeError("Cannot "+msg)},__privateGet=(obj,member,getter)=>(__accessCheck(obj,member,"read from private field"),getter?getter.call(obj):member.get(obj)),src_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(src_exports,{default:()=>src_default}),module.exports=(mod=src_exports,((to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to})(__defProp({},"__esModule",{value:!0}),mod));_lastId=new WeakMap;var src_default=new class{constructor(){__publicField(this,"subscribers",{}),__publicField(this,"getEventData",(event=>{const isSameWindow=event.source===window;if(!(this.isEnabled&&event&&event.data&&event.origin&&event.source&&this.isDomain(event.origin)))return;let{data}=event;if("string"==typeof data)try{data=JSON.parse(data)}catch(e){}"string"==typeof data?(event=data,data=void 0):event=data&&data.event||this.DEFAULT_EVENT;const metadata={isSameWindow};this.onMessage(event,data,metadata)})),((obj,member,value)=>{if(member.has(obj))throw TypeError("Cannot add the same private member more than once");member instanceof WeakSet?member.add(obj):member.set(obj,value)})(this,_lastId,0),this.isEnabled=!0,this.DEFAULT_EVENT="avMessage",this.DOMAIN=/https?:\/\/([\w-]+\.)?availity\.(com|net)/,window.addEventListener("message",this.getEventData)}enabled(value){return arguments.length>0&&(this.isEnabled=!!value),this.isEnabled}subscribe(event,callback,options){var _a,obj,member,value,setter;this.subscribers[event]||(this.subscribers[event]=[]),obj=this,member=_lastId,value=__privateGet(this,_lastId)+1,__accessCheck(obj,member,"write to private field"),setter?setter.call(obj,value):member.set(obj,value);const id=__privateGet(this,_lastId),ignoreSameWindow=null==(_a=null==options?void 0:options.ignoreSameWindow)||_a,subscriber={id,callback,options:{ignoreSameWindow}};return this.subscribers[event].push(subscriber),()=>{this.subscribers[event]=this.subscribers[event].filter((subscriber2=>subscriber2.id!==id))}}unsubscribe(event){delete this.subscribers[event]}unsubscribeAll(){this.subscribers={}}onMessage(event,data,metadata){const{isSameWindow}=metadata;if(this.subscribers[event])for(const subscriber of this.subscribers[event]){const{ignoreSameWindow}=subscriber.options;isSameWindow&&ignoreSameWindow||subscriber.callback(data)}}isDomain(url){return!this.DOMAIN.test(this.domain())||this.DOMAIN.test(url)}domain(){if(window.location.origin){return window.location.origin.replace("essentials","apps")}if(window.location.hostname){return`${window.location.protocol}//${window.location.hostname}${window.location.port?`:${window.location.port}`:""}`.replace("essentials","apps")}return"*"}send(payload){let target=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.top;if(this.isEnabled&&payload)try{const message="string"==typeof payload?payload:JSON.stringify(payload);target.postMessage(message,this.domain())}catch(error){console.warn("AvMessage.send()",error)}}}},"./packages/hooks/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{xM:()=>useCurrentRegion,iZ:()=>useCurrentUser,FP:()=>useEffectAsync,JO:()=>useMount,Gi:()=>useOrganization,Sk:()=>usePermissions,u9:()=>useProviders,Z3:()=>useTimeout,eY:()=>useToggle,vh:()=>src_useWindowDimensions});var react=__webpack_require__("./node_modules/react/index.js");function useEffectAsync(effect,inputs){(0,react.useEffect)((()=>{effect()}),inputs)}function useMount(effect){(0,react.useEffect)(effect,[])}function useTimeout(){let ms=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;const[ready,setReady]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let unmounted=!1;const timer=setTimeout((()=>{unmounted||setReady(!0)}),ms);return()=>{unmounted=!0,clearTimeout(timer)}}),[ms]),ready}function useToggle(){let initialState=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[state,setState]=(0,react.useState)(initialState);return[state,newState=>{void 0!==newState&&newState!==state?setState(newState):void 0===newState&&setState(!state)}]}var useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),dist=__webpack_require__("./node_modules/@availity/api-axios/dist/index.js");async function fetchRegion(){const response=await dist.avRegionsApi.getCurrentRegion();return{code:response?.data?.regions?.[0]?.id||"",value:response?.data?.regions?.[0]?.value||""}}function useCurrentRegion(options){return(0,useQuery.I)(["region"],fetchRegion,options)}const fetchUser=async()=>dist.avUserApi.me();function useCurrentUser(options){return(0,useQuery.I)(["user"],fetchUser,options)}const fetchProviders=async config=>dist.avProvidersApi.getProviders(config.customerId,config);function useProviders(config,options){return(0,useQuery.I)(["providers",config],(()=>fetchProviders(config)),options)}const fetchPermissions=async config=>dist.avPermissionsApi.getPermissions(config);function usePermissions(config,options){return(0,useQuery.I)(["permissions",config],(()=>fetchPermissions(config)),options)}const fetchOrganization=async config=>dist.avOrganizationsApi.getOrganizations(config);function useOrganization(config,options){return(0,useQuery.I)(["organizations",config],(()=>fetchOrganization(config)),options)}__webpack_require__("./node_modules/@availity/message-core/dist/index.js");const getWindowDimensions=()=>{const{innerWidth:width,innerHeight:height}=window;return{width,height}},src_useWindowDimensions=()=>{const[windowDimensions,setWindowDimensions]=(0,react.useState)(getWindowDimensions());return(0,react.useEffect)((()=>{const handleResize=()=>{setWindowDimensions(getWindowDimensions())};return window.addEventListener("resize",handleResize),()=>window.removeEventListener("resize",handleResize)}),[]),windowDimensions}}}]);