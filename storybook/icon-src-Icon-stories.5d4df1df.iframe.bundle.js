"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[3529],{"./packages/icon/src/Icon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_Default:()=>_Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Icon_stories});var react=__webpack_require__("./node_modules/react/index.js"),config=__webpack_require__("./node_modules/availity-uikit/fonts/config.json"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const pointerStyles={cursor:"pointer"},Icon=react.forwardRef(((_ref,ref)=>{let{name,size,color,onClick,className,children,...rest}=_ref;return(0,jsx_runtime.jsx)("i",{ref,"aria-hidden":"true",className:classnames_default()("icon",`icon-${name}`,size&&`icon-${size}`,color&&`text-${color}`,className),onClick,style:onClick?pointerStyles:void 0,...rest,children})})),src_Icon=Icon;try{Icon.displayName="Icon",Icon.__docgenInfo={description:"",displayName:"Icon",props:{name:{defaultValue:null,description:"The name of the icon.  <a href={http://availity.github.io/availity-uikit/v3/icons}>Icon List</a>",name:"name",required:!0,type:{name:"string"}},color:{defaultValue:null,description:"The text color of the icon. Uses Availity UI Kit variants.",name:"color",required:!1,type:{name:"string | undefined"}},size:{defaultValue:null,description:'The size of the icon. Potential values: "lg", "xl", "2x", "3x", "4x", "5x"',name:"size",required:!1,type:{name:"string | undefined"}},hover:{defaultValue:null,description:"hover is either true or false",name:"hover",required:!1,type:{name:"boolean | undefined"}},children:{defaultValue:null,description:"Children can be a react child or render pop.",name:"children",required:!1,type:{name:"ReactNode"}},arialabel:{defaultValue:null,description:"See: <a href={https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute}>aria-label.</a> Default: name",name:"arialabel",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/icon/src/Icon.tsx#Icon"]={docgenInfo:Icon.__docgenInfo,name:"Icon",path:"packages/icon/src/Icon.tsx#Icon"})}catch(__react_docgen_typescript_loader_error){}const iconOptions=config._J.map((glyph=>glyph.css)),Icon_stories={title:"Components/Icon",parameters:{docs:{}},component:src_Icon},_Default={render:_ref=>{let{name,size,color,hover}=_ref;return(0,jsx_runtime.jsx)("div",{className:"py-3",children:(0,jsx_runtime.jsx)(src_Icon,{name,size,color,onClick:hover?()=>({}):void 0})})},args:{name:"home",size:"3x",color:"none",hover:!1},argTypes:{name:{type:"select",options:iconOptions},size:{type:"select",options:["lg","xl","2x","3x","4x","5x"]},color:{type:"select",options:["none","primary","secondary","danger","warning","dark","white","light","success","info","muted"]},hover:{type:"select",options:!1}}};_Default.parameters={..._Default.parameters,docs:{..._Default.parameters?.docs,source:{originalSource:"{\n  render: ({\n    name,\n    size,\n    color,\n    hover\n  }) => <div className=\"py-3\">\n      <Icon name={name} size={size} color={color} onClick={hover ? () => ({}) : undefined} />\n    </div>,\n  args: {\n    name: 'home',\n    size: '3x',\n    color: 'none',\n    hover: false\n  },\n  argTypes: {\n    name: {\n      type: 'select',\n      options: iconOptions\n    },\n    size: {\n      type: 'select',\n      options: sizes\n    },\n    color: {\n      type: 'select',\n      options: colors\n    },\n    hover: {\n      type: 'select',\n      options: false\n    }\n  }\n}",..._Default.parameters?.docs?.source}}};const __namedExportsOrder=["_Default"]}}]);