"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[9271],{"./packages/tree/src/Tree.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{_Default:()=>_Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Tree_stories});var react=__webpack_require__("./node_modules/react/index.js"),cloneDeep=__webpack_require__("./node_modules/lodash/cloneDeep.js"),cloneDeep_default=__webpack_require__.n(cloneDeep),Button=__webpack_require__("./node_modules/reactstrap/es/Button.js"),Label=__webpack_require__("./node_modules/reactstrap/es/Label.js"),Input=__webpack_require__("./node_modules/reactstrap/es/Input.js"),Col=__webpack_require__("./node_modules/reactstrap/es/Col.js"),Row=__webpack_require__("./node_modules/reactstrap/es/Row.js"),FormGroup=__webpack_require__("./node_modules/reactstrap/es/FormGroup.js"),dist=__webpack_require__("./packages/icon/dist/index.js"),dist_default=__webpack_require__.n(dist),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TreeItemContent=_ref=>{let{items,onItemExpanded,onItemsSelected,selectable,toggleSelectChildren}=_ref;return(0,jsx_runtime.jsx)("ul",{children:items.map((item=>(0,jsx_runtime.jsxs)(react.Fragment,{children:[!item.isHidden&&(0,jsx_runtime.jsx)("li",{"data-testid":`tree-view-item-${item.id}`,children:(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)(Row.A,{children:[(0,jsx_runtime.jsx)(Col.A,{xs:"10",sm:"9",children:(0,jsx_runtime.jsxs)(FormGroup.A,{check:!0,children:[!item.isDisabled&&selectable&&(0,jsx_runtime.jsx)(Input.A,{id:`chkSelect_${item.id}`,name:`chkSelect_${item.id}`,"data-testid":`chk-tree-view-item-select-${item.id}`,type:"checkbox",checked:item.isSelected||!1,onChange:()=>onItemsSelected([item])}),(0,jsx_runtime.jsx)(Label.A,{"data-testid":`tree-view-item-${item.id}-label`,className:item.isDisabled?"text-muted":"",check:!0,for:`chkSelect_${item.id}`,children:item.name})]})}),item.children&&item.children.length>0&&(0,jsx_runtime.jsx)(Col.A,{xs:"2",sm:"3",children:(0,jsx_runtime.jsxs)("div",{className:"form-inline d-flex justify-content-end ml-auto align-items-center",children:[selectable&&!item.isDisabled&&(0,jsx_runtime.jsxs)(FormGroup.A,{check:!0,children:[(0,jsx_runtime.jsx)(Input.A,{"data-testid":`chkSelectAllChildren_${item.id}`,id:`chkSelectAllChildren_${item.id}`,type:"checkbox",checked:item.areAllChildrenSelected||!1,onChange:()=>toggleSelectChildren(item)})," "]}),(0,jsx_runtime.jsx)(Button.A,{"data-testid":`btn-expand-all-${item.id}`,color:"link",className:"icon-expand p-0 text-decoration-none",onClick:()=>onItemExpanded(item),children:(0,jsx_runtime.jsx)(dist_default(),{size:"lg",className:"expand-tree",name:item.isExpanded?"down-dir":"right-dir"})})]})})]})})}),item.children&&item.children.length>0&&item.isExpanded&&(0,jsx_runtime.jsx)("ul",{"data-testid":`tree-view-${item.id}`,children:(0,jsx_runtime.jsx)(TreeItemContent,{items:item.children,onItemExpanded,onItemsSelected,toggleSelectChildren,selectable})})]},`tree-view-item-${item.id}`)))})};TreeItemContent.displayName="TreeItemContent";const src_TreeItemContent=TreeItemContent;try{TreeItemContent.displayName="TreeItemContent",TreeItemContent.__docgenInfo={description:"",displayName:"TreeItemContent",props:{items:{defaultValue:null,description:"The items that are displayed in the tree view item.",name:"items",required:!0,type:{name:"TreeItem[]"}},onItemExpanded:{defaultValue:null,description:"Whenever an item is expanded in the tree, it fires this event to let the parent know of the items that are expanded.",name:"onItemExpanded",required:!0,type:{name:"(item: TreeItem) => void"}},onItemsSelected:{defaultValue:null,description:"Whenever an item is selected in the tree, it fires this event to let the parent know of the items that are selected.",name:"onItemsSelected",required:!0,type:{name:"(items: TreeItem[]) => void"}},toggleSelectChildren:{defaultValue:null,description:"Whenever the select all children checkbox is checked, if fire this event to appropriately select all of the children.",name:"toggleSelectChildren",required:!0,type:{name:"(item: TreeItem) => void"}},selectable:{defaultValue:null,description:"",name:"selectable",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/tree/src/TreeItemContent.tsx#TreeItemContent"]={docgenInfo:TreeItemContent.__docgenInfo,name:"TreeItemContent",path:"packages/tree/src/TreeItemContent.tsx#TreeItemContent"})}catch(__react_docgen_typescript_loader_error){}const areAllChildrenSelected=item=>item.isSelected&&item.children?.every((child=>!!child.isDisabled||child.isSelected))||!1,Tree=_ref=>{let{searchLabel,enableSearch=!1,items=[],selectedItems=[],expandedItems=[],onItemsSelected,onItemsExpanded,expandAll=!1,selectable=!1,displayDisabledItems=!0}=_ref;const[treeItems,setTreeItems]=(0,react.useState)(items||[]),[selectedList,setSelectedList]=(0,react.useState)(selectedItems),[expandedList,setExpandedList]=(0,react.useState)(expandedItems),[searchTerm,setSearchTerm]=(0,react.useState)(""),[canSelectDeselect,setCanSelectDeselect]=(0,react.useState)(!1),[canExpand,setCanExpand]=(0,react.useState)(!1),[rootSelectText,setRootSelectText]=(0,react.useState)("Select All"),[rootExpandAllText,setRootExpandAllText]=(0,react.useState)(expandAll?"Collapse All":"Expand All");(0,react.useEffect)((()=>{setTreeItems(items),setSearchTerm("")}),[items]),(0,react.useEffect)((()=>{setSelectedList(selectedItems);const updateSelectedItems=items=>{for(const item of items)item.isSelected=!item.isDisabled&&(selectedList.map((item=>item.id)).includes(item.id)||item.isSelected),item.children&&(item.children=updateSelectedItems(item.children||[]));return items};updateSelectedItems(treeItems)}),[JSON.stringify(selectedItems)]),(0,react.useEffect)((()=>{const areSelected=areAllSelected(treeItems);setRootSelectText(areSelected?"Deselect All":"Select All")}),[selectedList,treeItems]),(0,react.useEffect)((()=>{for(const item of treeItems)walkTree(item,(item=>{item.areAllChildrenSelected=areAllChildrenSelected(item)||!1}));setTreeItems([...treeItems])}),[selectedList]),(0,react.useEffect)((()=>{const applyHideDisabledItems=(items,displayDisabledItems)=>{const newItems=[];for(const item of items)item.isHidden=item.isDisabled&&!1===displayDisabledItems||item.isHidden||!1,item.children&&item.children.length>0&&(item.children=applyHideDisabledItems(item.children,displayDisabledItems)),newItems.push(item);return newItems};setTreeItems(applyHideDisabledItems(items,displayDisabledItems))}),[displayDisabledItems]),(0,react.useEffect)((()=>{const areExpanded=areAllExpanded(treeItems);setRootExpandAllText(areExpanded?"Collapse All":"Expand All")}),[expandedList,treeItems]);const areAllExpanded=items=>{let allExpanded=items.every((item=>item.isExpanded||0===item.children?.length||item.isHidden));for(const item of items)item.children&&(allExpanded=allExpanded&&areAllExpanded(item.children));return allExpanded},areAllSelected=(0,react.useCallback)((items=>{if(0===items.length)return!0;let allSelected=items.filter((item=>!item.isDisabled&&!item.isHidden)).every((item=>!0===item.isSelected));for(const item of items)item.children&&(allSelected=allSelected&&areAllSelected(item.children));return allSelected}),[]);(0,react.useEffect)((()=>{const applyExpandAll=(items,expandAll)=>{const newItems=[];for(const item of items)item.isExpanded=expandAll||item.isExpanded||!1,item.children&&item.children.length>0&&(item.children=applyExpandAll(item.children,expandAll)),newItems.push(item);return newItems};expandAll&&setTreeItems(applyExpandAll(items,expandAll))}),[expandAll]);const walkTree=(0,react.useCallback)(((item,fn)=>{if(fn(item),item.children)for(const child of item.children)walkTree(child,fn)}),[]),canExpandCollapseItems=items=>{let canExpand=items.some((item=>item.children&&item.children.length>0&&!item.isHidden));for(const item of items)item.children&&(canExpand=canExpand||canExpandCollapseItems(item.children));return canExpand},canSelectDeselectItems=items=>{let canSelectDeselect=items.some((item=>!item.isHidden));for(const item of items)item.children&&(canSelectDeselect=canSelectDeselect||canSelectDeselectItems(item.children));return canSelectDeselect};(0,react.useEffect)((()=>{setCanExpand(canExpandCollapseItems(treeItems)),setCanSelectDeselect(canSelectDeselectItems(treeItems))}),[JSON.stringify(treeItems)]);const filterItems=(items,searchTerm)=>{const searchValue=searchTerm.toUpperCase(),rootItems=items.filter((item=>item.name.toUpperCase().includes(searchValue)));for(const item of rootItems)item.isHidden=!displayDisabledItems&&item.isDisabled;const hiddenItems=items.filter((item=>!rootItems.map((rootItem=>rootItem.id)).includes(item.id)));for(const hiddenItem of hiddenItems)hiddenItem.isHidden=!0;for(const item of items)if(item.children){const matchedChildren=item.children.filter((item=>item.name.toUpperCase().includes(searchValue)));matchedChildren?.length>0&&(item.isExpanded=!0),filterItems(item.children,searchTerm)}const areExpanded=areAllExpanded(items);setRootExpandAllText(areExpanded?"Collapse All":"Expand All");const areSelected=areAllSelected(items);return setRootSelectText(areSelected?"Deselect All":"Select All"),setCanExpand(canExpandCollapseItems(treeItems)),setCanSelectDeselect(canSelectDeselectItems(treeItems)),items},findItem=(id,items)=>{let foundItem=items.find((t=>t.id===id));if(foundItem)return foundItem;for(const item of items)if(item.children&&(foundItem=findItem(id,item.children),foundItem))break;return foundItem},getSelectedItems=(0,react.useCallback)((items=>{let selected=[];for(const item of items)item.isSelected&&selected.push(item),item.children&&(selected=[...selected,...getSelectedItems(item.children)]);return selected}),[]),getExpandedItems=(0,react.useCallback)((items=>{let expandedItems=[];for(const item of items)item.isExpanded&&expandedItems.push(item),item.children&&(expandedItems=[...expandedItems,...getExpandedItems(item.children)]);return expandedItems}),[]);return(0,jsx_runtime.jsxs)("div",{"data-testid":"tree-view-parent",className:"tree-view",children:[enableSearch&&(0,jsx_runtime.jsxs)("div",{className:"form-group",children:[searchLabel&&(0,jsx_runtime.jsx)(Label.A,{className:"font-weight-bold",children:searchLabel}),(0,jsx_runtime.jsx)(Input.A,{"data-testid":"tree-search-input",type:"text",className:"form-control",id:"search",placeholder:"Search",value:searchTerm,onChange:event=>{return value=event.target.value,setSearchTerm(value),void setTreeItems(filterItems(items,value));var value}})]}),(0,jsx_runtime.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,jsx_runtime.jsx)(Col.A,{xs:"auto",className:"pl-0",children:canExpand&&(0,jsx_runtime.jsx)(Button.A,{"data-testid":"btn-expand-all",id:"btnExpandAll",color:"link",className:"p-0",onClick:()=>{const isExpanded=!areAllExpanded(treeItems);for(const item of treeItems)walkTree(item,(item=>{item.isExpanded=item.isHidden?item.isExpanded:isExpanded}));setExpandedList(getExpandedItems(treeItems)),setRootExpandAllText(areAllExpanded(treeItems)?"Collapse All":"Expand All"),onItemsExpanded&&onItemsExpanded(getExpandedItems(treeItems))},children:rootExpandAllText})}),selectable&&canSelectDeselect&&(0,jsx_runtime.jsx)(Col.A,{xs:"auto",className:"pr-0",children:(0,jsx_runtime.jsx)(Button.A,{"data-testid":"btn-select-all",color:"link",className:"pb-0 pt-0",onClick:()=>(()=>{const isSelected=!areAllSelected(treeItems);for(const item of treeItems)walkTree(item,(item=>{item.isSelected=item.isDisabled||item.isHidden?item.isSelected:isSelected,item.areAllChildrenSelected=isSelected}));setSelectedList(getSelectedItems(treeItems)),setRootSelectText(isSelected?"Deselect All":"Select All"),onItemsSelected&&onItemsSelected(getSelectedItems(treeItems))})(),children:rootSelectText})})]}),(0,jsx_runtime.jsx)(src_TreeItemContent,{items:treeItems,onItemExpanded:item=>{const itemToUpdate=findItem(item.id,treeItems);if(itemToUpdate){itemToUpdate.isExpanded=!itemToUpdate.isExpanded;let expanded=[];item.isExpanded?(expanded=[...expandedList,item],setExpandedList(expanded)):(expanded=expandedList.filter((item=>item.id!==itemToUpdate.id)),setExpandedList(expanded)),onItemsExpanded&&onItemsExpanded(expanded)}},onItemsSelected:items=>{let selected=selectedList;for(const item of items){const itemToUpdate=findItem(item.id,treeItems);!itemToUpdate||item.isDisabled||item.isHidden||(item.isSelected=!itemToUpdate.isSelected,selected=item.isSelected?[...selected,item]:selected.filter((item=>item.id!==itemToUpdate.id)))}setSelectedList(selected),onItemsSelected&&onItemsSelected(selected)},toggleSelectChildren:item=>{const isSelected=!areAllChildrenSelected(item);item.isSelected=isSelected,item.areAllChildrenSelected=isSelected;for(const child of item.children||[])walkTree(child,(child=>{child.isDisabled||(child.isSelected=isSelected,child.areAllChildrenSelected=isSelected)}));setSelectedList(getSelectedItems(treeItems)),onItemsSelected&&onItemsSelected(getSelectedItems(treeItems))},selectable})]})};Tree.displayName="Tree";const src_Tree=Tree;try{Tree.displayName="Tree",Tree.__docgenInfo={description:"",displayName:"Tree",props:{items:{defaultValue:{value:"[]"},description:"Required. The list of items to display in the tree.",name:"items",required:!1,type:{name:"TreeItem[]"}},searchLabel:{defaultValue:null,description:"The label that displays above the text box.",name:"searchLabel",required:!1,type:{name:"string | undefined"}},enableSearch:{defaultValue:{value:"false"},description:"When enabled, there is a search input box that will display and allow for the user to limit the items in the tree based on the typed search value.",name:"enableSearch",required:!1,type:{name:"boolean | undefined"}},onItemsSelected:{defaultValue:null,description:"Whenever an item is selected in the tree, it fires this event to let the parent know of the items that are selected.",name:"onItemsSelected",required:!1,type:{name:"((selectedItems: TreeItem[]) => void) | undefined"}},onItemsExpanded:{defaultValue:null,description:"Whenever an item is expanded in the tree, it fires this event to let the parent know of the items that are expanded.",name:"onItemsExpanded",required:!1,type:{name:"((expandedItems?: TreeItem[] | undefined) => void) | undefined"}},selectedItems:{defaultValue:{value:"[]"},description:"The items which are selected in the tree",name:"selectedItems",required:!1,type:{name:"TreeItem[] | undefined"}},expandedItems:{defaultValue:{value:"[]"},description:"The items which are expanded in the tree",name:"expandedItems",required:!1,type:{name:"TreeItem[] | undefined"}},expandAll:{defaultValue:{value:"false"},description:"When true, the tree view will be entirely expanded on initial load.",name:"expandAll",required:!1,type:{name:"boolean | undefined"}},selectable:{defaultValue:{value:"false"},description:"Determines whether items can be selected in the tree",name:"selectable",required:!1,type:{name:"boolean | undefined"}},displayDisabledItems:{defaultValue:{value:"true"},description:"Determines whether disabled items should be visible in in the tree at all.",name:"displayDisabledItems",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/tree/src/Tree.tsx#Tree"]={docgenInfo:Tree.__docgenInfo,name:"Tree",path:"packages/tree/src/Tree.tsx#Tree"})}catch(__react_docgen_typescript_loader_error){}var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styles=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./packages/tree/styles.scss"),options={insert:"head",singleton:!1};injectStylesIntoStyleTag_default()(styles.A,options);styles.A.locals;const Tree_stories={title:"Components/Tree",component:src_Tree,parameters:{docs:{description:{component:"This component builds out a hierarchical tree of objects, with the ability to expand/collapse, select, and search."}}}},DefaultTree=_ref=>{let{enableSearch,searchLabel,expandAll,selectable,displayDisabledItems}=_ref;const[isTreeVisible,setIsTreeVisible]=(0,react.useState)(!0),flatTreeItems=[{id:"1",name:"Parent"},{id:"2",name:"Second Level Parent",parentId:"1"},{id:"3",name:"Child Test 1",isDisabled:!0,parentId:"2"},{id:"4",name:"Child Test 2",parentId:"2"},{id:"5",name:"Child Test 3",parentId:"4"},{id:"7",name:"Availity Webinars",parentId:"1"},{id:"6",name:"Validation Office",parentId:"7"},{id:"8",name:"2nd Root"},{id:"9",name:"2nd Root Child",parentId:"8"}],tree=((items,expandedIds,selectedIds,hiddenIds)=>{const tree=[],parents=new Map;for(const item of items)item.children=[],item.isSelected=selectedIds?selectedIds.includes(item.id):item.isSelected,item.isExpanded=expandedIds?expandedIds.includes(item.id):item.isExpanded,item.isHidden=hiddenIds?hiddenIds.includes(item.id):item.isHidden,parents.set(item.id,item);for(const[,value]of parents)if(value.parentId&&parents.get(value.parentId)){const parent=parents.get(value.parentId);parent&&parent.children?.push(value)}else tree.push(value);return tree})(flatTreeItems,[]),[items,setItems]=(0,react.useState)(tree),[initialState]=(0,react.useState)(cloneDeep_default()(tree)),[selectedItems]=(0,react.useState)([items[0]]),[newSelectedList,setNewSelectedList]=(0,react.useState)([items[0],...flatTreeItems.filter((item=>!0===item.isSelected))]),onItemsSelected=(0,react.useCallback)((selected=>{setNewSelectedList(selected)}),[]);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Button.A,{className:"p-2",onClick:()=>(async()=>{await setNewSelectedList([items[0],...flatTreeItems.filter((item=>!0===item.isSelected))]),await setItems(cloneDeep_default()(initialState))})(),children:"Reset Tree"}),(0,jsx_runtime.jsxs)(Button.A,{className:"p-2 ml-1",onClick:()=>setIsTreeVisible(!isTreeVisible),children:[isTreeVisible?"Hide":"Show"," Tree"]}),(0,jsx_runtime.jsx)("div",{className:"p-1",style:{width:500},children:isTreeVisible&&(0,jsx_runtime.jsx)(src_Tree,{expandAll,enableSearch,searchLabel,items,onItemsSelected,selectedItems,selectable,displayDisabledItems})}),(0,jsx_runtime.jsxs)("section",{children:[(0,jsx_runtime.jsx)("h5",{children:"Selected Items:"}),newSelectedList?.map((item=>({id:item.id,name:item.name}))).map((item=>(0,jsx_runtime.jsx)("pre",{children:JSON.stringify(item,null,2)},item.id)))]})]})},_Default={render:_ref2=>{let{enableSearch,searchLabel,expandAll,selectable,displayDisabledItems}=_ref2;return(0,jsx_runtime.jsx)(DefaultTree,{enableSearch,searchLabel,expandAll,selectable,displayDisabledItems})},args:{enableSearch:!0,searchLabel:"Search Me",expandAll:!1,selectable:!0,displayDisabledItems:!0}};_Default.parameters={..._Default.parameters,docs:{..._Default.parameters?.docs,source:{originalSource:"{\n  render: ({\n    enableSearch,\n    searchLabel,\n    expandAll,\n    selectable,\n    displayDisabledItems\n  }) => <DefaultTree enableSearch={enableSearch} searchLabel={searchLabel} expandAll={expandAll} selectable={selectable} displayDisabledItems={displayDisabledItems} />,\n  args: {\n    enableSearch: true,\n    searchLabel: 'Search Me',\n    expandAll: false,\n    selectable: true,\n    displayDisabledItems: true\n  }\n}",..._Default.parameters?.docs?.source}}};const __namedExportsOrder=["_Default"]},"./packages/icon/dist/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var mod,__create=Object.create,__defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropNames=Object.getOwnPropertyNames,__getOwnPropSymbols=Object.getOwnPropertySymbols,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value,__copyProps=(to,from,except,desc)=>{if(from&&"object"==typeof from||"function"==typeof from)for(let key of __getOwnPropNames(from))__hasOwnProp.call(to,key)||key===except||__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to},__toESM=(mod,isNodeMode,target)=>(target=null!=mod?__create(__getProtoOf(mod)):{},__copyProps(!isNodeMode&&mod&&mod.__esModule?target:__defProp(target,"default",{value:mod,enumerable:!0}),mod)),src_exports={};((target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})})(src_exports,{default:()=>Icon_default}),module.exports=(mod=src_exports,__copyProps(__defProp({},"__esModule",{value:!0}),mod));var import_react=__toESM(__webpack_require__("./node_modules/react/index.js")),import_classnames=__toESM(__webpack_require__("./node_modules/classnames/index.js")),import_jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),pointerStyles={cursor:"pointer"},Icon_default=import_react.default.forwardRef(((_a,ref)=>{var a,_b=_a,{name,size,color,onClick,className,children}=_b,rest=((source,exclude)=>{var target={};for(var prop in source)__hasOwnProp.call(source,prop)&&exclude.indexOf(prop)<0&&(target[prop]=source[prop]);if(null!=source&&__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(source))exclude.indexOf(prop)<0&&__propIsEnum.call(source,prop)&&(target[prop]=source[prop]);return target})(_b,["name","size","color","onClick","className","children"]);return(0,import_jsx_runtime.jsx)("i",(a=((a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a})({ref,"aria-hidden":"true",className:(0,import_classnames.default)("icon",`icon-${name}`,size&&`icon-${size}`,color&&`text-${color}`,className),onClick,style:onClick?pointerStyles:void 0},rest),__defProps(a,__getOwnPropDescs({children}))))}))},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./packages/tree/styles.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/cssWithMappingToString.js"),_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".tree-view{padding-left:0}.tree-view .custom-checkbox{display:inline-block}.tree-view .custom-control-label::before{top:0}.tree-view .custom-control-label::after{top:0}.tree-view ul:not(:first-child){padding-left:0 !important}.tree-view ul:first-child{padding-left:20px}.tree-view li{list-style:none}.tree-view .expand-tree{cursor:pointer}.tree-view .icon-expand,.tree-view icon-expand:hover{color:#363f45}","",{version:3,sources:["webpack://./packages/tree/styles.scss"],names:[],mappings:"AAAA,WACE,cAAA,CAEA,4BACE,oBAAA,CAGF,yCACE,KAAA,CAEF,wCACE,KAAA,CAGF,gCACE,yBAAA,CAEF,0BACE,iBAAA,CAGF,cACE,eAAA,CAGF,wBACE,cAAA,CAGF,qDAEE,aAAA",sourcesContent:[".tree-view {\n  padding-left: 0;\n\n  .custom-checkbox {\n    display: inline-block;\n  }\n\n  .custom-control-label::before {\n    top: 0;\n  }\n  .custom-control-label::after {\n    top: 0;\n  }\n\n  ul:not(:first-child) {\n    padding-left: 0 !important;\n  }\n  ul:first-child {\n    padding-left: 20px;\n  }\n\n  li {\n    list-style: none;\n  }\n\n  .expand-tree {\n    cursor: pointer;\n  }\n\n  .icon-expand,\n  icon-expand:hover {\n    color: #363f45;\n  }\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);