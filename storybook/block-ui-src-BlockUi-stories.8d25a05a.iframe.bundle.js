/*! For license information please see block-ui-src-BlockUi-stories.8d25a05a.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[4990],{"./packages/block-ui/src/BlockUi.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_Template:()=>_Template,__namedExportsOrder:()=>__namedExportsOrder,default:()=>BlockUi_stories});var react=__webpack_require__("./node_modules/react/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Loader=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./packages/block-ui/src/Loader.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Loader.A,options);Loader.A&&Loader.A.locals&&Loader.A.locals;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Bullet(){return(0,jsx_runtime.jsx)("span",{className:"loading-bullet",children:"•"})}function Loader_Loader(){return(0,jsx_runtime.jsxs)("div",{className:"loading-indicator",children:[(0,jsx_runtime.jsx)(Bullet,{}),(0,jsx_runtime.jsx)(Bullet,{}),(0,jsx_runtime.jsx)(Bullet,{})]})}Bullet.displayName="Bullet",Loader_Loader.displayName="Loader";const block_ui_src_Loader=Loader_Loader;var BlockUi=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./packages/block-ui/src/BlockUi.css"),BlockUi_options={};BlockUi_options.styleTagTransform=styleTagTransform_default(),BlockUi_options.setAttributes=setAttributesWithoutAttributes_default(),BlockUi_options.insert=insertBySelector_default().bind(null,"head"),BlockUi_options.domAPI=styleDomAPI_default(),BlockUi_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(BlockUi.A,BlockUi_options);BlockUi.A&&BlockUi.A.locals&&BlockUi.A.locals;function BlockUi_BlockUi(_ref){let{blocking,children,className="",keepInView,loader=(0,jsx_runtime.jsx)(block_ui_src_Loader,{}),message,renderChildren=!0,tag:Tag="div",...rest}=_ref;const[top,setTop]=(0,react.useState)("50%"),blockerRef=(0,react.useRef)(null),topFocusRef=(0,react.useRef)(null),containerRef=(0,react.useRef)(null),messageContainerRef=(0,react.useRef)(null),handleKeepInView=(0,react.useCallback)((()=>{if(blocking&&keepInView&&containerRef.current){const containerBounds=containerRef.current.getBoundingClientRect(),windowHeight=window.innerHeight;if(containerBounds.top>windowHeight||containerBounds.bottom<0)return;if(containerBounds.top>=0&&containerBounds.bottom<=windowHeight)return void("50%"!==top&&setTop("50%"));const messageBoundsHeight=messageContainerRef.current?messageContainerRef.current.getBoundingClientRect().height:0;let newTop=Math.max(Math.min(windowHeight,containerBounds.bottom)-Math.max(containerBounds.top,0),messageBoundsHeight)/2;containerBounds.top<0&&(newTop=Math.min(newTop-containerBounds.top,containerBounds.height-messageBoundsHeight/2)),top!==newTop&&setTop(newTop)}}),[blocking,keepInView,top]);(0,react.useEffect)((()=>(window.addEventListener("scroll",handleKeepInView),()=>{window.removeEventListener("scroll",handleKeepInView)})),[handleKeepInView]);const blockingTab=function(event){let withShift=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{key,shiftKey}=event;return blocking&&"Tab"===key&&shiftKey===withShift},shouldRenderChildren=!blocking||renderChildren;return(0,jsx_runtime.jsxs)(Tag,{className:blocking?`block-ui ${className}`:className,"aria-busy":blocking,...rest,children:[blocking?(0,jsx_runtime.jsx)("div",{tabIndex:0,onKeyUp:event=>{blockerRef.current&&blockingTab(event)&&blockerRef.current.focus()},onKeyDown:event=>{blockerRef.current&&blockingTab(event)&&(event.preventDefault(),blockerRef.current.focus())},ref:topFocusRef,className:"sr-only",children:message||"loading"}):null,shouldRenderChildren?children:null,blocking?(0,jsx_runtime.jsxs)("div",{className:"block-ui-container",tabIndex:0,ref:blockerRef,onKeyUp:event=>{topFocusRef.current&&blockingTab(event,!0)&&topFocusRef.current.focus()},onKeyDown:event=>{topFocusRef.current&&blockingTab(event,!0)&&(event.preventDefault(),topFocusRef.current.focus())},children:[(0,jsx_runtime.jsx)("div",{className:"block-ui-overlay",ref:containerRef}),(0,jsx_runtime.jsx)("div",{className:"block-ui-message-container",ref:messageContainerRef,style:{top:keepInView?top:void 0},children:(0,jsx_runtime.jsxs)("div",{className:"block-ui-message",children:[message||(0,jsx_runtime.jsx)("div",{className:"sr-only",children:"loading"}),(0,react.isValidElement)(loader)?(0,jsx_runtime.jsx)("div",{"aria-hidden":!0,children:loader}):null]})})]}):null]})}BlockUi_BlockUi.displayName="BlockUi";const block_ui_src_BlockUi=BlockUi_BlockUi;try{BlockUi_BlockUi.displayName="BlockUi",BlockUi_BlockUi.__docgenInfo={description:"",displayName:"BlockUi",props:{blocking:{defaultValue:null,description:"Set whether the component should block its children",name:"blocking",required:!1,type:{name:"boolean | undefined"}},keepInView:{defaultValue:null,description:"Set whether the blocking component should follow the scroll or stay at a fixed postion",name:"keepInView",required:!1,type:{name:"boolean | undefined"}},loader:{defaultValue:{value:"<DefaultLoader />"},description:"Loader component to use",name:"loader",required:!1,type:{name:"Element | undefined"}},message:{defaultValue:null,description:"The message to display. Can also be a component.",name:"message",required:!1,type:{name:"ReactNode"}},renderChildren:{defaultValue:{value:"true"},description:"Control if the children are shown when the component is being blocked",name:"renderChildren",required:!1,type:{name:"boolean | undefined"}},tag:{defaultValue:null,description:"tag to render as container element",name:"tag",required:!1,type:{name:"ElementType | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/block-ui/src/BlockUi.tsx#BlockUi"]={docgenInfo:BlockUi_BlockUi.__docgenInfo,name:"BlockUi",path:"packages/block-ui/src/BlockUi.tsx#BlockUi"})}catch(__react_docgen_typescript_loader_error){}const BlockUi_stories={title:"Components/Block UI",component:block_ui_src_BlockUi,parameters:{docs:{description:{component:"Component for blocking sections of a User Interface"}}},args:{className:"",keepInView:!1,message:"Loading",renderChildren:!0,tag:"div"}},_Template={render:_ref=>{let{tag,...args}=_ref;const[blocking,setBlocking]=(0,react.useState)(!0),[blockedCount,setBlockedCount]=(0,react.useState)(0),[unblockedCount,setUnblockedCount]=(0,react.useState)(0);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("button",{type:"button",onClick:()=>setBlocking((prev=>!prev)),className:"mb-2 btn btn-secondary",children:blocking?"Unblock":"Block"}),(0,jsx_runtime.jsxs)("div",{style:{padding:"2rem",backgroundColor:"steelblue",color:"white"},children:[(0,jsx_runtime.jsx)("h1",{children:"Parent"}),(0,jsx_runtime.jsx)(block_ui_src_BlockUi,{...args,blocking,tag:tag||void 0,children:(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h2",{children:"Blocked Section"}),(0,jsx_runtime.jsx)("p",{children:"This content is a child of BlockUi component and will be blocked."}),(0,jsx_runtime.jsx)("p",{children:"Buttons and other HTML elements are not accessible when the component is blocking."}),(0,jsx_runtime.jsxs)("button",{type:"button",onClick:()=>setBlockedCount((prev=>prev+1)),className:"mr-2 btn btn-light",children:["Click Me ",(0,jsx_runtime.jsx)("span",{className:"badge badge-secondary",children:blockedCount})]}),(0,jsx_runtime.jsx)("button",{type:"button",onClick:()=>setBlockedCount(0),className:"btn btn-danger",children:"Reset"})]})}),(0,jsx_runtime.jsxs)("div",{style:{paddingTop:"1rem"},children:[(0,jsx_runtime.jsx)("h2",{children:"Not Blocked Section"}),(0,jsx_runtime.jsx)("p",{children:"This content is not a child of BlockUi component and will not be blocked."}),(0,jsx_runtime.jsxs)("button",{type:"button",onClick:()=>setUnblockedCount((prev=>prev+1)),className:"mr-2 btn btn-light",children:["Click Me ",(0,jsx_runtime.jsx)("span",{className:"badge badge-secondary",children:unblockedCount})]}),(0,jsx_runtime.jsx)("button",{type:"button",onClick:()=>setUnblockedCount(0),className:"btn btn-danger",children:"Reset"})]})]})]})}};_Template.parameters={..._Template.parameters,docs:{..._Template.parameters?.docs,source:{originalSource:'{\n  render: ({\n    tag,\n    ...args\n  }) => {\n    const [blocking, setBlocking] = useState(true);\n    const [blockedCount, setBlockedCount] = useState(0);\n    const [unblockedCount, setUnblockedCount] = useState(0);\n    return <>\n        <button type="button" onClick={() => setBlocking(prev => !prev)} className="mb-2 btn btn-secondary">\n          {blocking ? \'Unblock\' : \'Block\'}\n        </button>\n        <div style={{\n        padding: \'2rem\',\n        backgroundColor: \'steelblue\',\n        color: \'white\'\n      }}>\n          <h1>Parent</h1>\n          <BlockUi {...args} blocking={blocking} tag={tag || undefined}>\n            <div>\n              <h2>Blocked Section</h2>\n              <p>This content is a child of BlockUi component and will be blocked.</p>\n              <p>Buttons and other HTML elements are not accessible when the component is blocking.</p>\n              <button type="button" onClick={() => setBlockedCount(prev => prev + 1)} className="mr-2 btn btn-light">\n                Click Me <span className="badge badge-secondary">{blockedCount}</span>\n              </button>\n              <button type="button" onClick={() => setBlockedCount(0)} className="btn btn-danger">\n                Reset\n              </button>\n            </div>\n          </BlockUi>\n          <div style={{\n          paddingTop: \'1rem\'\n        }}>\n            <h2>Not Blocked Section</h2>\n            <p>This content is not a child of BlockUi component and will not be blocked.</p>\n            <button type="button" onClick={() => setUnblockedCount(prev => prev + 1)} className="mr-2 btn btn-light">\n              Click Me <span className="badge badge-secondary">{unblockedCount}</span>\n            </button>\n            <button type="button" onClick={() => setUnblockedCount(0)} className="btn btn-danger">\n              Reset\n            </button>\n          </div>\n        </div>\n      </>;\n  }\n}',..._Template.parameters?.docs?.source}}};const __namedExportsOrder=["_Template"]},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./packages/block-ui/src/BlockUi.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".block-ui {\n  position: relative;\n}\n\n.block-ui-container {\n  position: absolute;\n  z-index: 1010;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 100%;\n  min-height: 2em;\n  cursor: wait;\n  overflow: hidden;\n}\n\n.block-ui-container:focus {\n  outline: none;\n}\n\n.block-ui-overlay {\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  background-color: white;\n}\n\n.block-ui-message-container {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  text-align: center;\n  transform: translateY(-50%);\n  z-index: 10001;\n}\n\n.block-ui-message {\n  color: #333;\n  background: none;\n  z-index: 1011;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n","",{version:3,sources:["webpack://./packages/block-ui/src/BlockUi.css"],names:[],mappings:"AAAA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,OAAO;EACP,QAAQ;EACR,kBAAkB;EAClB,2BAA2B;EAC3B,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,WAAW;EACX,UAAU;EACV,YAAY;EACZ,gBAAgB;EAChB,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;AACjB",sourcesContent:[".block-ui {\n  position: relative;\n}\n\n.block-ui-container {\n  position: absolute;\n  z-index: 1010;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 100%;\n  min-height: 2em;\n  cursor: wait;\n  overflow: hidden;\n}\n\n.block-ui-container:focus {\n  outline: none;\n}\n\n.block-ui-overlay {\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  background-color: white;\n}\n\n.block-ui-message-container {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  text-align: center;\n  transform: translateY(-50%);\n  z-index: 10001;\n}\n\n.block-ui-message {\n  color: #333;\n  background: none;\n  z-index: 1011;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./packages/block-ui/src/Loader.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_storybook_builder_webpack5_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".loading-indicator {\n  text-align: center;\n}\n\n.loading-bullet {\n  display: inline-block;\n  opacity: 0;\n  font-size: 2em;\n  color: #02a17c;\n}\n\n/* CSS Animations */\n@-webkit-keyframes fadeInRTL1 {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeInRTL1 {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes fadeInRTL2 {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  40% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeInRTL2 {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  40% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes fadeInRTL3 {\n  0% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeInRTL3 {\n  0% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n.loading-bullet {\n  display: inline-block;\n  opacity: 0;\n  -webkit-animation: 3s ease 0.5s infinite fadeInRTL1;\n  animation: 3s ease 0.5s infinite fadeInRTL1;\n}\n\n.loading-bullet + .loading-bullet {\n  -webkit-animation-name: fadeInRTL2;\n  animation-name: fadeInRTL2;\n}\n\n.loading-bullet + .loading-bullet + .loading-bullet {\n  -webkit-animation-name: fadeInRTL3;\n  animation-name: fadeInRTL3;\n}\n","",{version:3,sources:["webpack://./packages/block-ui/src/Loader.css"],names:[],mappings:"AAAA;EACE,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,UAAU;EACV,cAAc;EACd,cAAc;AAChB;;AAEA,mBAAmB;AACnB;EACE;IACE,UAAU;IACV,mCAAmC;IACnC,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,kCAAkC;IAClC,0BAA0B;EAC5B;EACA;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;IACV,mCAAmC;IACnC,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,kCAAkC;IAClC,0BAA0B;EAC5B;EACA;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;IACV,mCAAmC;IACnC,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,kCAAkC;IAClC,0BAA0B;EAC5B;EACA;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;IACV,mCAAmC;IACnC,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,kCAAkC;IAClC,0BAA0B;EAC5B;EACA;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;IACV,mCAAmC;IACnC,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,kCAAkC;IAClC,0BAA0B;EAC5B;EACA;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;IACV,mCAAmC;IACnC,2BAA2B;EAC7B;EACA;IACE,UAAU;IACV,kCAAkC;IAClC,0BAA0B;EAC5B;EACA;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE,qBAAqB;EACrB,UAAU;EACV,mDAAmD;EACnD,2CAA2C;AAC7C;;AAEA;EACE,kCAAkC;EAClC,0BAA0B;AAC5B;;AAEA;EACE,kCAAkC;EAClC,0BAA0B;AAC5B",sourcesContent:[".loading-indicator {\n  text-align: center;\n}\n\n.loading-bullet {\n  display: inline-block;\n  opacity: 0;\n  font-size: 2em;\n  color: #02a17c;\n}\n\n/* CSS Animations */\n@-webkit-keyframes fadeInRTL1 {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeInRTL1 {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  30% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes fadeInRTL2 {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  40% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeInRTL2 {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  40% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes fadeInRTL3 {\n  0% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeInRTL3 {\n  0% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n  }\n  60% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 0;\n  }\n}\n\n.loading-bullet {\n  display: inline-block;\n  opacity: 0;\n  -webkit-animation: 3s ease 0.5s infinite fadeInRTL1;\n  animation: 3s ease 0.5s infinite fadeInRTL1;\n}\n\n.loading-bullet + .loading-bullet {\n  -webkit-animation-name: fadeInRTL2;\n  animation-name: fadeInRTL2;\n}\n\n.loading-bullet + .loading-bullet + .loading-bullet {\n  -webkit-animation-name: fadeInRTL3;\n  animation-name: fadeInRTL3;\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);