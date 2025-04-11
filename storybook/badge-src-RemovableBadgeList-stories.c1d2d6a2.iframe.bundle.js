(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[1331,9946],{"./node_modules/lodash/_arrayIncludes.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseIndexOf=__webpack_require__("./node_modules/lodash/_baseIndexOf.js");module.exports=function arrayIncludes(array,value){return!!(null==array?0:array.length)&&baseIndexOf(array,value,0)>-1}},"./node_modules/lodash/_arrayIncludesWith.js":module=>{module.exports=function arrayIncludesWith(array,value,comparator){for(var index=-1,length=null==array?0:array.length;++index<length;)if(comparator(value,array[index]))return!0;return!1}},"./node_modules/lodash/_baseFindIndex.js":module=>{module.exports=function baseFindIndex(array,predicate,fromIndex,fromRight){for(var length=array.length,index=fromIndex+(fromRight?1:-1);fromRight?index--:++index<length;)if(predicate(array[index],index,array))return index;return-1}},"./node_modules/lodash/_baseIndexOf.js":(module,__unused_webpack_exports,__webpack_require__)=>{var baseFindIndex=__webpack_require__("./node_modules/lodash/_baseFindIndex.js"),baseIsNaN=__webpack_require__("./node_modules/lodash/_baseIsNaN.js"),strictIndexOf=__webpack_require__("./node_modules/lodash/_strictIndexOf.js");module.exports=function baseIndexOf(array,value,fromIndex){return value==value?strictIndexOf(array,value,fromIndex):baseFindIndex(array,baseIsNaN,fromIndex)}},"./node_modules/lodash/_baseIsNaN.js":module=>{module.exports=function baseIsNaN(value){return value!=value}},"./node_modules/lodash/_strictIndexOf.js":module=>{module.exports=function strictIndexOf(array,value,fromIndex){for(var index=fromIndex-1,length=array.length;++index<length;)if(array[index]===value)return index;return-1}},"./packages/badge/src/RemovableBadgeList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_Default:()=>_Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),reactstrap__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/reactstrap/es/Button.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/badge/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Badge/Removable Badge/List",component:___WEBPACK_IMPORTED_MODULE_1__.B,parameters:{docs:{description:{component:"This component allows you to specify a list of badges and handles removing the badge from the badge list."}}}},_Default={render:()=>{const defaultBadgeList=[{value:"1",color:"primary",displayText:"Test 1"},{value:"2",color:"success",displayText:"Test 2"},{value:"3",color:"danger",displayText:"Test 3"},{value:"4",color:"warning",displayText:"Test 4"},{value:"5",color:"info",displayText:"Test 5"},{value:"6",color:"light",displayText:"Test 6"},{value:"7",color:"dark",displayText:"Test 7"},{value:"8",displayText:"Test 9"}],[badgeList,setBadgeList]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultBadgeList);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.B,{badges:badgeList,onRemove:badgeList=>{setBadgeList(badgeList)}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("section",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(reactstrap__WEBPACK_IMPORTED_MODULE_3__.A,{color:"secondary",onClick:()=>{setBadgeList(defaultBadgeList)},children:"Reset Badges"})})]})}};_Default.parameters={..._Default.parameters,docs:{..._Default.parameters?.docs,source:{originalSource:"{\n  render: () => {\n    const defaultBadgeList: BadgeItem[] = [{\n      value: '1',\n      color: 'primary',\n      displayText: 'Test 1'\n    }, {\n      value: '2',\n      color: 'success',\n      displayText: 'Test 2'\n    }, {\n      value: '3',\n      color: 'danger',\n      displayText: 'Test 3'\n    }, {\n      value: '4',\n      color: 'warning',\n      displayText: 'Test 4'\n    }, {\n      value: '5',\n      color: 'info',\n      displayText: 'Test 5'\n    }, {\n      value: '6',\n      color: 'light',\n      displayText: 'Test 6'\n    }, {\n      value: '7',\n      color: 'dark',\n      displayText: 'Test 7'\n    }, {\n      value: '8',\n      displayText: 'Test 9'\n    }];\n    const [badgeList, setBadgeList] = useState<BadgeItem[]>(defaultBadgeList);\n    const remove = () => {\n      setBadgeList(defaultBadgeList);\n    };\n    const onRemoveBadge = (badgeList: BadgeItem[]) => {\n      setBadgeList(badgeList);\n    };\n    return <>\n        <RemovableBadgeList badges={badgeList} onRemove={onRemoveBadge} />\n        <section>\n          <Button color=\"secondary\" onClick={remove}>\n            Reset Badges\n          </Button>\n        </section>\n      </>;\n  }\n}",..._Default.parameters?.docs?.source}}};const __namedExportsOrder=["_Default"]},"./packages/badge/src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{z:()=>src_RemovableBadge,B:()=>src_RemovableBadgeList});var react=__webpack_require__("./node_modules/react/index.js"),Badge=__webpack_require__("./node_modules/reactstrap/es/Badge.js"),dist=__webpack_require__("./packages/icon/dist/index.js"),dist_default=__webpack_require__.n(dist),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RemovableBadge=_ref=>{let{children,value,onRemove,...rest}=_ref;return(0,jsx_runtime.jsxs)(Badge.A,{"data-testid":"removable_badge",...rest,children:[(0,jsx_runtime.jsx)(dist_default(),{"data-testid":"removable_badge_remove",name:"cancel",onClick:()=>onRemove(value)}),children]})};RemovableBadge.displayName="RemovableBadge";const src_RemovableBadge=RemovableBadge;try{RemovableBadge.displayName="RemovableBadge",RemovableBadge.__docgenInfo={description:"",displayName:"RemovableBadge",props:{value:{defaultValue:null,description:"This is a unique value for the badge, which is passed up to the onRemove function to describe which badge is being removed.",name:"value",required:!0,type:{name:"string"}},onRemove:{defaultValue:null,description:"This is the function that is called whenever the 'X' icon is clicked. It passes the value of the specified badge to the parent component.",name:"onRemove",required:!0,type:{name:"(value: string) => void"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string | undefined"}},pill:{defaultValue:null,description:"",name:"pill",required:!1,type:{name:"boolean | undefined"}},tag:{defaultValue:null,description:"",name:"tag",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},innerRef:{defaultValue:null,description:"",name:"innerRef",required:!1,type:{name:"Ref<HTMLElement> | undefined"}},cssModule:{defaultValue:null,description:"",name:"cssModule",required:!1,type:{name:"CSSModule | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/badge/src/RemovableBadge.tsx#RemovableBadge"]={docgenInfo:RemovableBadge.__docgenInfo,name:"RemovableBadge",path:"packages/badge/src/RemovableBadge.tsx#RemovableBadge"})}catch(__react_docgen_typescript_loader_error){}var find=__webpack_require__("./node_modules/lodash/find.js"),find_default=__webpack_require__.n(find),without=__webpack_require__("./node_modules/lodash/without.js"),without_default=__webpack_require__.n(without),orderBy=__webpack_require__("./node_modules/lodash/orderBy.js"),orderBy_default=__webpack_require__.n(orderBy);const RemovableBadgeList=_ref=>{let{badges,id,onRemove,...rest}=_ref;const[badgeList,setBadgeList]=(0,react.useState)(badges);(0,react.useEffect)((()=>{setBadgeList(badges)}),[badges]);const handleBadgeRemoved=value=>{const badgeToRemove=find_default()(badgeList,(badge=>badge.value===value)),newBadges=without_default()(badgeList,badgeToRemove);setBadgeList(newBadges),onRemove&&onRemove(newBadges)};return(0,jsx_runtime.jsx)("section",{"data-testid":"removable_badge_list_section",...rest,children:orderBy_default()(badgeList,["order"],["asc"]).map(((badge,key)=>(0,jsx_runtime.jsx)(src_RemovableBadge,{"data-testid":"removable_badge_list_item",id:`${id||"removable_badge_list"}_${badge.value}`,color:badge.color,className:"ml-1",value:badge.value,onRemove:handleBadgeRemoved,children:badge.displayText},`${badge.value}${key.toString()}`)))})};RemovableBadgeList.displayName="RemovableBadgeList";const src_RemovableBadgeList=RemovableBadgeList;try{RemovableBadgeList.displayName="RemovableBadgeList",RemovableBadgeList.__docgenInfo={description:"",displayName:"RemovableBadgeList",props:{badges:{defaultValue:null,description:"",name:"badges",required:!0,type:{name:"BadgeItem[]"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},onRemove:{defaultValue:null,description:"This is the function that is called whenever a badge in the list has been removed. It passes in the current badge list, after the badge has been removed.",name:"onRemove",required:!1,type:{name:"((badgeList: BadgeItem[]) => void) | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/badge/src/RemovableBadgeList.tsx#RemovableBadgeList"]={docgenInfo:RemovableBadgeList.__docgenInfo,name:"RemovableBadgeList",path:"packages/badge/src/RemovableBadgeList.tsx#RemovableBadgeList"})}catch(__react_docgen_typescript_loader_error){}},"./packages/icon/dist/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var mod,__create=Object.create,__defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toESM=(mod,isNodeMode,target)=>(target=null!=mod?__create(__getProtoOf(mod)):{},__copyProps(!isNodeMode&&mod&&mod.__esModule?target:__defProp(target,"default",{value:mod,enumerable:!0}),mod)),index_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(index_exports,{default:()=>Icon_default}),module.exports=(mod=index_exports,__copyProps(__defProp({},"__esModule",{value:!0}),mod));var import_react=__toESM(__webpack_require__("./node_modules/react/index.js")),import_classnames=__toESM(__webpack_require__("./node_modules/classnames/index.js")),import_jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),pointerStyles={cursor:"pointer"},Icon_default=import_react.default.forwardRef(((_a,ref)=>{var a,_b=_a,{name,size,color,onClick,className,children}=_b,rest=((source,exclude)=>{var target={};for(var prop in source)__hasOwnProp.call(source,prop)&&exclude.indexOf(prop)<0&&(target[prop]=source[prop]);if(null!=source&&__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(source))exclude.indexOf(prop)<0&&__propIsEnum.call(source,prop)&&(target[prop]=source[prop]);return target})(_b,["name","size","color","onClick","className","children"]);return(0,import_jsx_runtime.jsx)("i",(a=((a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a})({ref,"aria-hidden":"true",className:(0,import_classnames.default)("icon",`icon-${name}`,size&&`icon-${size}`,color&&`text-${color}`,className),onClick,style:onClick?pointerStyles:void 0},rest),__defProps(a,__getOwnPropDescs({children}))))}))}}]);