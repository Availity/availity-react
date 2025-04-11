/*! For license information please see hooks-stories-useEffectAsync-stories.a10cb82a.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[4308],{"./node_modules/@availity/message-core/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>index_default});var _lastId,__defProp=Object.defineProperty,__typeError=msg=>{throw TypeError(msg)},__publicField=(obj,key,value)=>((obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value)(obj,"symbol"!=typeof key?key+"":key,value),__accessCheck=(obj,member,msg)=>member.has(obj)||__typeError("Cannot "+msg),__privateGet=(obj,member,getter)=>(__accessCheck(obj,member,"read from private field"),getter?getter.call(obj):member.get(obj));_lastId=new WeakMap;var index_default=new class{constructor(){var obj,member,value;__publicField(this,"subscribers",{}),__publicField(this,"getEventData",(event=>{const isSameWindow=event.source===window;if(!(this.isEnabled&&event&&event.data&&event.origin&&event.source&&this.isDomain(event.origin)))return;let{data}=event;if("string"==typeof data)try{data=JSON.parse(data)}catch(e){}"string"==typeof data?(event=data,data=void 0):event=data&&data.event||this.DEFAULT_EVENT;const metadata={isSameWindow};this.onMessage(event,data,metadata)})),obj=this,value=0,(member=_lastId).has(obj)?__typeError("Cannot add the same private member more than once"):member instanceof WeakSet?member.add(obj):member.set(obj,value),this.isEnabled=!0,this.DEFAULT_EVENT="avMessage",this.DOMAIN=/https?:\/\/([\w-]+\.)?availity\.(com|net)/,window.addEventListener("message",this.getEventData)}enabled(value){return arguments.length>0&&(this.isEnabled=!!value),this.isEnabled}subscribe(event,callback,options){var _a,obj,member,value,setter;this.subscribers[event]||(this.subscribers[event]=[]),obj=this,member=_lastId,value=__privateGet(this,_lastId)+1,__accessCheck(obj,member,"write to private field"),setter?setter.call(obj,value):member.set(obj,value);const id=__privateGet(this,_lastId),ignoreSameWindow=null==(_a=null==options?void 0:options.ignoreSameWindow)||_a,subscriber={id,callback,options:{ignoreSameWindow}};return this.subscribers[event].push(subscriber),()=>{this.subscribers[event]=this.subscribers[event].filter((subscriber2=>subscriber2.id!==id))}}unsubscribe(event){delete this.subscribers[event]}unsubscribeAll(){this.subscribers={}}onMessage(event,data,metadata){const{isSameWindow}=metadata;if(this.subscribers[event])for(const subscriber of this.subscribers[event]){const{ignoreSameWindow}=subscriber.options;isSameWindow&&ignoreSameWindow||subscriber.callback(data)}}isDomain(url){return!this.DOMAIN.test(this.domain())||this.DOMAIN.test(url)}getOriginFromTop(){try{return window.top.location.origin}catch(e){return null}}swapDomain(url){return url.includes("essentials")?url.replace("essentials","apps"):url.replace("apps","essentials")}domain(){if(this.getOriginFromTop())return window.location.origin;if(window.location.origin){const url=window.location.origin;return this.swapDomain(url)}if(window.location.hostname){const url=`${window.location.protocol}//${window.location.hostname}${window.location.port?`:${window.location.port}`:""}`;return this.swapDomain(url)}return"*"}send(payload,target=window.top){if(this.isEnabled&&payload)try{const message="string"==typeof payload?payload:JSON.stringify(payload);target.postMessage(message,this.domain())}catch(error){console.warn("AvMessage.send()",error)}}}},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}__webpack_require__.d(__webpack_exports__,{A:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}__webpack_require__.d(__webpack_exports__,{A:()=>_objectWithoutPropertiesLoose})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/reactstrap/es/Card.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__),classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/reactstrap/es/utils.js"),_excluded=["className","cssModule","color","body","inverse","outline","tag","innerRef"],propTypes={tag:_utils__WEBPACK_IMPORTED_MODULE_2__.tagPropType,inverse:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,color:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,body:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,outline:prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool,className:prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,cssModule:prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,innerRef:prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default().object,prop_types__WEBPACK_IMPORTED_MODULE_3___default().string,prop_types__WEBPACK_IMPORTED_MODULE_3___default().func])},Card=function Card(props){var className=props.className,cssModule=props.cssModule,color=props.color,body=props.body,inverse=props.inverse,outline=props.outline,Tag=props.tag,innerRef=props.innerRef,attributes=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_4__.A)(props,_excluded),classes=(0,_utils__WEBPACK_IMPORTED_MODULE_2__.mapToCssModules)(classnames__WEBPACK_IMPORTED_MODULE_1___default()(className,"card",!!inverse&&"text-white",!!body&&"card-body",!!color&&(outline?"border":"bg")+"-"+color),cssModule);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_5__.A)({},attributes,{className:classes,ref:innerRef}))};Card.propTypes=propTypes,Card.defaultProps={tag:"div"};const __WEBPACK_DEFAULT_EXPORT__=Card},"./node_modules/reactstrap/es/utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DOMElement:()=>DOMElement,PopperPlacements:()=>PopperPlacements,TransitionPropTypeKeys:()=>TransitionPropTypeKeys,TransitionStatuses:()=>TransitionStatuses,TransitionTimeouts:()=>TransitionTimeouts,addMultipleEventListeners:()=>addMultipleEventListeners,canUseDOM:()=>canUseDOM,conditionallyUpdateScrollbar:()=>conditionallyUpdateScrollbar,defaultToggleEvents:()=>defaultToggleEvents,deprecated:()=>deprecated,findDOMElements:()=>findDOMElements,focusableElements:()=>focusableElements,getOriginalBodyPadding:()=>getOriginalBodyPadding,getScrollbarWidth:()=>getScrollbarWidth,getTarget:()=>getTarget,isArrayOrNodeList:()=>isArrayOrNodeList,isBodyOverflowing:()=>isBodyOverflowing,isFunction:()=>isFunction,isObject:()=>isObject,isReactRefObj:()=>isReactRefObj,keyCodes:()=>keyCodes,mapToCssModules:()=>mapToCssModules,omit:()=>omit,pick:()=>pick,setGlobalCssModule:()=>setGlobalCssModule,setScrollbarWidth:()=>setScrollbarWidth,tagPropType:()=>tagPropType,targetPropType:()=>targetPropType,toNumber:()=>toNumber,warnOnce:()=>warnOnce});var globalCssModule,prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);function getScrollbarWidth(){var scrollDiv=document.createElement("div");scrollDiv.style.position="absolute",scrollDiv.style.top="-9999px",scrollDiv.style.width="50px",scrollDiv.style.height="50px",scrollDiv.style.overflow="scroll",document.body.appendChild(scrollDiv);var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;return document.body.removeChild(scrollDiv),scrollbarWidth}function setScrollbarWidth(padding){document.body.style.paddingRight=padding>0?padding+"px":null}function isBodyOverflowing(){return document.body.clientWidth<window.innerWidth}function getOriginalBodyPadding(){var style=window.getComputedStyle(document.body,null);return parseInt(style&&style.getPropertyValue("padding-right")||0,10)}function conditionallyUpdateScrollbar(){var scrollbarWidth=getScrollbarWidth(),fixedContent=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],bodyPadding=fixedContent?parseInt(fixedContent.style.paddingRight||0,10):0;isBodyOverflowing()&&setScrollbarWidth(bodyPadding+scrollbarWidth)}function setGlobalCssModule(cssModule){globalCssModule=cssModule}function mapToCssModules(className,cssModule){return void 0===className&&(className=""),void 0===cssModule&&(cssModule=globalCssModule),cssModule?className.split(" ").map((function(c){return cssModule[c]||c})).join(" "):className}function omit(obj,omitKeys){var result={};return Object.keys(obj).forEach((function(key){-1===omitKeys.indexOf(key)&&(result[key]=obj[key])})),result}function pick(obj,keys){for(var key,pickKeys=Array.isArray(keys)?keys:[keys],length=pickKeys.length,result={};length>0;)result[key=pickKeys[length-=1]]=obj[key];return result}var warned={};function warnOnce(message){warned[message]||("undefined"!=typeof console&&console.error(message),warned[message]=!0)}function deprecated(propType,explanation){return function validate(props,propName,componentName){null!==props[propName]&&void 0!==props[propName]&&warnOnce('"'+propName+'" property of "'+componentName+'" has been deprecated.\n'+explanation);for(var _len=arguments.length,rest=new Array(_len>3?_len-3:0),_key=3;_key<_len;_key++)rest[_key-3]=arguments[_key];return propType.apply(void 0,[props,propName,componentName].concat(rest))}}var Element="object"==typeof window&&window.Element||function(){};function DOMElement(props,propName,componentName){if(!(props[propName]instanceof Element))return new Error("Invalid prop `"+propName+"` supplied to `"+componentName+"`. Expected prop to be an instance of Element. Validation failed.")}var targetPropType=prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,prop_types__WEBPACK_IMPORTED_MODULE_0___default().func,DOMElement,prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({current:prop_types__WEBPACK_IMPORTED_MODULE_0___default().any})]),tagPropType=prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default().func,prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({$$typeof:prop_types__WEBPACK_IMPORTED_MODULE_0___default().symbol,render:prop_types__WEBPACK_IMPORTED_MODULE_0___default().func}),prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default().func,prop_types__WEBPACK_IMPORTED_MODULE_0___default().string,prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({$$typeof:prop_types__WEBPACK_IMPORTED_MODULE_0___default().symbol,render:prop_types__WEBPACK_IMPORTED_MODULE_0___default().func})]))]),TransitionTimeouts={Fade:150,Collapse:350,Modal:300,Carousel:600},TransitionPropTypeKeys=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],TransitionStatuses={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},keyCodes={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},PopperPlacements=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement);function isReactRefObj(target){return!(!target||"object"!=typeof target)&&"current"in target}function getTag(value){return null==value?void 0===value?"[object Undefined]":"[object Null]":Object.prototype.toString.call(value)}function toNumber(value){var type=typeof value;if("number"===type)return value;if("symbol"===type||"object"===type&&"[object Symbol]"===getTag(value))return NaN;if(isObject(value)){var other="function"==typeof value.valueOf?value.valueOf():value;value=isObject(other)?""+other:other}if("string"!==type)return 0===value?value:+value;value=value.replace(/^\s+|\s+$/g,"");var isBinary=/^0b[01]+$/i.test(value);return isBinary||/^0o[0-7]+$/i.test(value)?parseInt(value.slice(2),isBinary?2:8):/^[-+]0x[0-9a-f]+$/i.test(value)?NaN:+value}function isObject(value){var type=typeof value;return null!=value&&("object"===type||"function"===type)}function isFunction(value){if(!isObject(value))return!1;var tag=getTag(value);return"[object Function]"===tag||"[object AsyncFunction]"===tag||"[object GeneratorFunction]"===tag||"[object Proxy]"===tag}function findDOMElements(target){if(isReactRefObj(target))return target.current;if(isFunction(target))return target();if("string"==typeof target&&canUseDOM){var selection=document.querySelectorAll(target);if(selection.length||(selection=document.querySelectorAll("#"+target)),!selection.length)throw new Error("The target '"+target+"' could not be identified in the dom, tip: check spelling");return selection}return target}function isArrayOrNodeList(els){return null!==els&&(Array.isArray(els)||canUseDOM&&"number"==typeof els.length)}function getTarget(target,allElements){var els=findDOMElements(target);return allElements?isArrayOrNodeList(els)?els:null===els?[]:[els]:isArrayOrNodeList(els)?els[0]:els}var defaultToggleEvents=["touchstart","click"];function addMultipleEventListeners(_els,handler,_events,useCapture){var els=_els;isArrayOrNodeList(els)||(els=[els]);var events=_events;if("string"==typeof events&&(events=events.split(/\s+/)),!isArrayOrNodeList(els)||"function"!=typeof handler||!Array.isArray(events))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(events,(function(event){Array.prototype.forEach.call(els,(function(el){el.addEventListener(event,handler,useCapture)}))})),function removeEvents(){Array.prototype.forEach.call(events,(function(event){Array.prototype.forEach.call(els,(function(el){el.removeEventListener(event,handler,useCapture)}))}))}}var focusableElements=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},"./packages/hooks/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{xM:()=>useCurrentRegion,iZ:()=>useCurrentUser,FP:()=>useEffectAsync,JO:()=>useMount,Gi:()=>useOrganization,Sk:()=>usePermissions,u9:()=>useProviders,Z3:()=>useTimeout,eY:()=>useToggle,vh:()=>src_useWindowDimensions});var react=__webpack_require__("./node_modules/react/index.js");function useEffectAsync(effect,inputs){(0,react.useEffect)((()=>{effect()}),inputs)}function useMount(effect){(0,react.useEffect)(effect,[])}function useTimeout(){let ms=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;const[ready,setReady]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let unmounted=!1;const timer=setTimeout((()=>{unmounted||setReady(!0)}),ms);return()=>{unmounted=!0,clearTimeout(timer)}}),[ms]),ready}function useToggle(){let initialState=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const[state,setState]=(0,react.useState)(initialState);return[state,newState=>{void 0!==newState&&newState!==state?setState(newState):void 0===newState&&setState(!state)}]}var useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),dist=__webpack_require__("./node_modules/@availity/api-axios/dist/index.mjs");async function fetchRegion(){const response=await dist.Nw.getCurrentRegion();return{code:response?.data?.regions?.[0]?.id||"",value:response?.data?.regions?.[0]?.value||""}}function useCurrentRegion(options){return(0,useQuery.I)(["region"],fetchRegion,options)}const fetchUser=async()=>dist.XG.me();function useCurrentUser(options){return(0,useQuery.I)(["user"],fetchUser,options)}const fetchProviders=async config=>dist.Ml.getProviders(config.customerId,config);function useProviders(config,options){return(0,useQuery.I)(["providers",config],(()=>fetchProviders(config)),options)}const fetchPermissions=async config=>dist.Kl.getPermissions(config);function usePermissions(config,options){return(0,useQuery.I)(["permissions",config],(()=>fetchPermissions(config)),options)}const fetchOrganization=async config=>dist.US.getOrganizations(config);function useOrganization(config,options){return(0,useQuery.I)(["organizations",config],(()=>fetchOrganization(config)),options)}__webpack_require__("./node_modules/@availity/message-core/dist/index.mjs");const getWindowDimensions=()=>{const{innerWidth:width,innerHeight:height}=window;return{width,height}},src_useWindowDimensions=()=>{const[windowDimensions,setWindowDimensions]=(0,react.useState)(getWindowDimensions());return(0,react.useEffect)((()=>{const handleResize=()=>{setWindowDimensions(getWindowDimensions())};return window.addEventListener("resize",handleResize),()=>window.removeEventListener("resize",handleResize)}),[]),windowDimensions}},"./packages/hooks/stories/useEffectAsync.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),reactstrap__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/reactstrap/es/Card.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/hooks/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const AsyncComponent=_ref=>{let{mockData}=_ref;const[loading,toggle]=(0,___WEBPACK_IMPORTED_MODULE_1__.eY)(!0),[state,setState]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);return(0,___WEBPACK_IMPORTED_MODULE_1__.FP)((async()=>{loading||toggle();const newState=await(data=mockData,new Promise((resolve=>{setInterval((()=>resolve(data)),1e3)})));var data;setState(newState),toggle()}),[mockData]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(reactstrap__WEBPACK_IMPORTED_MODULE_3__.A,{body:!0,children:loading?"Loading...":state})};AsyncComponent.displayName="AsyncComponent";const __WEBPACK_DEFAULT_EXPORT__={title:"Hooks/useEffectAsync",parameters:{docs:{description:{component:"Hook that allows asynchronous functions to be called in the standard useEffect hook."}}}},Default=_ref2=>{let{data}=_ref2;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(AsyncComponent,{mockData:data})};Default.displayName="Default",Default.args={data:"Test Data"},Default.storyName="default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  data\n}) => <AsyncComponent mockData={data} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]}}]);