/*! For license information please see progress-src-Progress-stories.e3e33f20.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[7733],{"./packages/progress/src/Progress.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_Default:()=>_Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Progress_stories});__webpack_require__("./node_modules/react/index.js");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),toNumber=__webpack_require__("./node_modules/lodash/toNumber.js"),toNumber_default=__webpack_require__.n(toNumber),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Progress=_ref=>{let{tag:Tag="div",animated,striped,complete,value=0,max=100,className:classes,color="success",...rest}=_ref;const percent=toNumber_default()(value)/toNumber_default()(max)*100;return(0,jsx_runtime.jsx)(Tag,{className:classnames_default()(classes,"progress",{"progress-complete":complete}),"data-testid":"progress-outer",role:"progressbar","aria-valuenow":value,"aria-valuemin":"0","aria-valuemax":max,...rest,children:(0,jsx_runtime.jsx)("span",{className:classnames_default()("progress-bar",`bg-${color}`,{"progress-bar-striped":striped},{"progress-bar-animated":animated}),style:{width:`${percent}%`},"data-testid":"progress-inner"})})};Progress.displayName="Progress";const src_Progress=Progress;try{Progress.displayName="Progress",Progress.__docgenInfo={description:"",displayName:"Progress",props:{tag:{defaultValue:null,description:"The tag to render the progress bar as.",name:"tag",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},animated:{defaultValue:null,description:'Triggers the "animated" style in the progress bar.',name:"animated",required:!1,type:{name:"boolean | undefined"}},striped:{defaultValue:null,description:'Triggers the "striped" style in the progress bar.',name:"striped",required:!1,type:{name:"boolean | undefined"}},complete:{defaultValue:null,description:'Triggers the "complete" style in the progress bar. When true, a checkmark appears at the end of the progress bar',name:"complete",required:!1,type:{name:"boolean | undefined"}},value:{defaultValue:{value:"0"},description:"The amount of the progress bar that should be filled (relative to the max)",name:"value",required:!1,type:{name:"string | number | undefined"}},max:{defaultValue:{value:"100"},description:"The maximum amount of the progress bar.",name:"max",required:!1,type:{name:"string | number | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},color:{defaultValue:{value:"success"},description:"The color of the progress bar.",name:"color",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/progress/src/Progress.tsx#Progress"]={docgenInfo:Progress.__docgenInfo,name:"Progress",path:"packages/progress/src/Progress.tsx#Progress"})}catch(__react_docgen_typescript_loader_error){}const Progress_stories={title:"Components/Progress",component:src_Progress},_Default={render:_ref=>{let{value,max,animated,striped,complete,color}=_ref;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsxs)("p",{children:[Math.round(value/max*100),"% Complete"]}),(0,jsx_runtime.jsx)(src_Progress,{animated,striped,complete,color,value,max})]})},args:{value:50,max:100,animated:!1,striped:!1,complete:!1,color:"success"}};_Default.parameters={..._Default.parameters,docs:{..._Default.parameters?.docs,source:{originalSource:"{\n  render: ({\n    value,\n    max,\n    animated,\n    striped,\n    complete,\n    color\n  }) => <div>\n      <p>{Math.round(value / max * 100)}% Complete</p>\n      <Progress animated={animated} striped={striped} complete={complete} color={color} value={value} max={max} />\n    </div>,\n  args: {\n    value: 50,\n    max: 100,\n    animated: false,\n    striped: false,\n    complete: false,\n    color: 'success'\n  }\n}",..._Default.parameters?.docs?.source}}};const __namedExportsOrder=["_Default"]},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/lodash/_baseTrim.js":(module,__unused_webpack_exports,__webpack_require__)=>{var trimmedEndIndex=__webpack_require__("./node_modules/lodash/_trimmedEndIndex.js"),reTrimStart=/^\s+/;module.exports=function baseTrim(string){return string?string.slice(0,trimmedEndIndex(string)+1).replace(reTrimStart,""):string}},"./node_modules/lodash/_trimmedEndIndex.js":module=>{var reWhitespace=/\s/;module.exports=function trimmedEndIndex(string){for(var index=string.length;index--&&reWhitespace.test(string.charAt(index)););return index}},"./node_modules/lodash/toNumber.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseTrim=__webpack_require__("./node_modules/lodash/_baseTrim.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js"),isSymbol=__webpack_require__("./node_modules/lodash/isSymbol.js"),reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt;module.exports=function toNumber(value){if("number"==typeof value)return value;if(isSymbol(value))return NaN;if(isObject(value)){var other="function"==typeof value.valueOf?value.valueOf():value;value=isObject(other)?other+"":other}if("string"!=typeof value)return 0===value?value:+value;value=baseTrim(value);var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NaN:+value}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);