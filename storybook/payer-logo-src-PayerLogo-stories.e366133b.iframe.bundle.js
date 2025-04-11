"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[6526],{"./node_modules/@availity/message-core/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>index_default});var _lastId,__defProp=Object.defineProperty,__typeError=msg=>{throw TypeError(msg)},__publicField=(obj,key,value)=>((obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value)(obj,"symbol"!=typeof key?key+"":key,value),__accessCheck=(obj,member,msg)=>member.has(obj)||__typeError("Cannot "+msg),__privateGet=(obj,member,getter)=>(__accessCheck(obj,member,"read from private field"),getter?getter.call(obj):member.get(obj));_lastId=new WeakMap;var index_default=new class{constructor(){var obj,member,value;__publicField(this,"subscribers",{}),__publicField(this,"getEventData",(event=>{const isSameWindow=event.source===window;if(!(this.isEnabled&&event&&event.data&&event.origin&&event.source&&this.isDomain(event.origin)))return;let{data}=event;if("string"==typeof data)try{data=JSON.parse(data)}catch(e){}"string"==typeof data?(event=data,data=void 0):event=data&&data.event||this.DEFAULT_EVENT;const metadata={isSameWindow};this.onMessage(event,data,metadata)})),obj=this,value=0,(member=_lastId).has(obj)?__typeError("Cannot add the same private member more than once"):member instanceof WeakSet?member.add(obj):member.set(obj,value),this.isEnabled=!0,this.DEFAULT_EVENT="avMessage",this.DOMAIN=/https?:\/\/([\w-]+\.)?availity\.(com|net)/,window.addEventListener("message",this.getEventData)}enabled(value){return arguments.length>0&&(this.isEnabled=!!value),this.isEnabled}subscribe(event,callback,options){var _a,obj,member,value,setter;this.subscribers[event]||(this.subscribers[event]=[]),obj=this,member=_lastId,value=__privateGet(this,_lastId)+1,__accessCheck(obj,member,"write to private field"),setter?setter.call(obj,value):member.set(obj,value);const id=__privateGet(this,_lastId),ignoreSameWindow=null==(_a=null==options?void 0:options.ignoreSameWindow)||_a,subscriber={id,callback,options:{ignoreSameWindow}};return this.subscribers[event].push(subscriber),()=>{this.subscribers[event]=this.subscribers[event].filter((subscriber2=>subscriber2.id!==id))}}unsubscribe(event){delete this.subscribers[event]}unsubscribeAll(){this.subscribers={}}onMessage(event,data,metadata){const{isSameWindow}=metadata;if(this.subscribers[event])for(const subscriber of this.subscribers[event]){const{ignoreSameWindow}=subscriber.options;isSameWindow&&ignoreSameWindow||subscriber.callback(data)}}isDomain(url){return!this.DOMAIN.test(this.domain())||this.DOMAIN.test(url)}getOriginFromTop(){try{return window.top.location.origin}catch(e){return null}}swapDomain(url){return url.includes("essentials")?url.replace("essentials","apps"):url.replace("apps","essentials")}domain(){if(this.getOriginFromTop())return window.location.origin;if(window.location.origin){const url=window.location.origin;return this.swapDomain(url)}if(window.location.hostname){const url=`${window.location.protocol}//${window.location.hostname}${window.location.port?`:${window.location.port}`:""}`;return this.swapDomain(url)}return"*"}send(payload,target=window.top){if(this.isEnabled&&payload)try{const message="string"==typeof payload?payload:JSON.stringify(payload);target.postMessage(message,this.domain())}catch(error){console.warn("AvMessage.send()",error)}}}},"./packages/hooks/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{xM:()=>useCurrentRegion,iZ:()=>useCurrentUser,FP:()=>useEffectAsync,JO:()=>useMount,Gi:()=>useOrganization,Sk:()=>usePermissions,u9:()=>useProviders,Z3:()=>useTimeout,eY:()=>useToggle,vh:()=>src_useWindowDimensions});var react=__webpack_require__("./node_modules/react/index.js");function useEffectAsync(effect,inputs){(0,react.useEffect)((()=>{effect()}),inputs)}function useMount(effect){(0,react.useEffect)(effect,[])}function useTimeout(){let ms=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;const[ready,setReady]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let unmounted=!1;const timer=setTimeout((()=>{unmounted||setReady(!0)}),ms);return()=>{unmounted=!0,clearTimeout(timer)}}),[ms]),ready}function useToggle(){let initialState=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[state,setState]=(0,react.useState)(initialState);return[state,newState=>{void 0!==newState&&newState!==state?setState(newState):void 0===newState&&setState(!state)}]}var useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),dist=__webpack_require__("./node_modules/@availity/api-axios/dist/index.mjs");async function fetchRegion(){const response=await dist.Nw.getCurrentRegion();return{code:response?.data?.regions?.[0]?.id||"",value:response?.data?.regions?.[0]?.value||""}}function useCurrentRegion(options){return(0,useQuery.I)(["region"],fetchRegion,options)}const fetchUser=async()=>dist.XG.me();function useCurrentUser(options){return(0,useQuery.I)(["user"],fetchUser,options)}const fetchProviders=async config=>dist.Ml.getProviders(config.customerId,config);function useProviders(config,options){return(0,useQuery.I)(["providers",config],(()=>fetchProviders(config)),options)}const fetchPermissions=async config=>dist.Kl.getPermissions(config);function usePermissions(config,options){return(0,useQuery.I)(["permissions",config],(()=>fetchPermissions(config)),options)}const fetchOrganization=async config=>dist.US.getOrganizations(config);function useOrganization(config,options){return(0,useQuery.I)(["organizations",config],(()=>fetchOrganization(config)),options)}__webpack_require__("./node_modules/@availity/message-core/dist/index.mjs");const getWindowDimensions=()=>{const{innerWidth:width,innerHeight:height}=window;return{width,height}},src_useWindowDimensions=()=>{const[windowDimensions,setWindowDimensions]=(0,react.useState)(getWindowDimensions());return(0,react.useEffect)((()=>{const handleResize=()=>{setWindowDimensions(getWindowDimensions())};return window.addEventListener("resize",handleResize),()=>window.removeEventListener("resize",handleResize)}),[]),windowDimensions}},"./packages/payer-logo/src/PayerLogo.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithPayerId:()=>WithPayerId,WithSpaceId:()=>WithSpaceId,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PayerLogo_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),hooks=__webpack_require__("./packages/hooks/index.js"),dist=__webpack_require__("./node_modules/@availity/api-axios/dist/index.mjs"),get=__webpack_require__("./node_modules/lodash/get.js"),get_default=__webpack_require__.n(get),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const fetchLogo=async(query,variables,path,clientId)=>{try{const{data:{data}}=await dist.fW.create({query,variables},{headers:{"X-Client-ID":clientId}});return get_default()(data,path)}catch(error){return error}},PayerLogo=_ref=>{let{spaceId,payerId,clientId,...props}=_ref;const[url,setUrl]=(0,react.useState)(null);return(0,hooks.FP)((async()=>{const _url=await(async(spaceId,payerId,clientId)=>{if(!clientId)throw new Error("clientId is required");try{let url;if(spaceId){const variables={id:spaceId},path="configurationFindOne.images.logo";url=await fetchLogo("\nquery configurationFindById($id: ID!){\n  configurationFindOne(id: $id){\n    ...on PayerSpace{\n      images{\n        tile\n        logo\n        billboard\n      }\n    }\n  }\n}\n",variables,path,clientId)}else if(payerId){const variables={payerIDs:[payerId],types:["space"]},path="configurationPagination.items[0].images.logo";url=await fetchLogo("\nquery configurationFindMany($payerIDs: [ID!], $types: [TypeEnum!]){\n  configurationPagination(filter: { payerIds: $payerIDs, types: $types }){\n    items {\n      ...on PayerSpace {\n        images{\n          tile\n          logo\n          billboard\n        }\n      }\n    }\n  }\n}\n",variables,path,clientId),url||(url=`/public/apps/eligibility/images/value-add-logos/${payerId.replaceAll(/\s/g,"")}.gif`)}return url}catch(error){return error}})(spaceId,payerId,clientId);setUrl(_url)}),[spaceId,payerId,clientId]),clientId&&(payerId||spaceId)?(0,jsx_runtime.jsx)("img",{src:url,alt:"Payer logo",...props}):null};PayerLogo.displayName="PayerLogo",PayerLogo.propTypes={clientId:prop_types_default().string.isRequired,spaceId:prop_types_default().string,payerId:prop_types_default().string};const src_PayerLogo=PayerLogo;PayerLogo.__docgenInfo={description:"",methods:[],displayName:"PayerLogo",props:{clientId:{description:"Client ID to use to fetch the payer's logo.",type:{name:"string"},required:!0},spaceId:{description:"Required if `payerId` is not provided. The payer spaces ID for the payer for which you want a logo.",type:{name:"string"},required:!1},payerId:{description:"Required if `spaceId` is not provided. The payer ID for the payer for which you want a logo.",type:{name:"string"},required:!1}}};const PayerLogo_stories={title:"Deprecated/Payer Logo",parameters:{docs:{description:{component:"DEPRECATED: Easy to use component to display the payer's logo given the payer's ID"}}}},WithPayerId=_ref=>{let{payerId,clientId}=_ref;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(src_PayerLogo,{payerId,clientId}),(0,jsx_runtime.jsx)("p",{children:"Note: this is not a real logo. It is a sample image."})]})};WithPayerId.displayName="WithPayerId",WithPayerId.args={payerId:"PayerID",clientId:"my-client-id"},WithPayerId.storyName="with payer ID";const WithSpaceId=_ref2=>{let{spaceId,clientId}=_ref2;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(src_PayerLogo,{spaceId,clientId}),(0,jsx_runtime.jsx)("p",{children:"Note: this is not a real logo. It is a sample image."})]})};WithSpaceId.displayName="WithSpaceId",WithSpaceId.args={spaceId:"space1",clientId:"my-client-id"},WithSpaceId.storyName="with space ID",WithPayerId.parameters={...WithPayerId.parameters,docs:{...WithPayerId.parameters?.docs,source:{originalSource:"({\n  payerId,\n  clientId\n}) => <div>\n    <PayerLogo payerId={payerId} clientId={clientId} />\n    <p>Note: this is not a real logo. It is a sample image.</p>\n  </div>",...WithPayerId.parameters?.docs?.source}}},WithSpaceId.parameters={...WithSpaceId.parameters,docs:{...WithSpaceId.parameters?.docs,source:{originalSource:"({\n  spaceId,\n  clientId\n}) => <div>\n    <PayerLogo spaceId={spaceId} clientId={clientId} />\n    <p>Note: this is not a real logo. It is a sample image.</p>\n  </div>",...WithSpaceId.parameters?.docs?.source}}};const __namedExportsOrder=["WithPayerId","WithSpaceId"]}}]);