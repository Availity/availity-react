"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[1296],{"./node_modules/reactstrap/es/PopperContent.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"),_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__),react_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react-dom/index.js"),classnames__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__),react_popper__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/react-popper/lib/esm/Popper.js"),_utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/reactstrap/es/utils.js"),_Fade__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/reactstrap/es/Fade.js"),_excluded=["cssModule","children","isOpen","flip","target","offset","fallbackPlacement","placementPrefix","arrowClassName","hideArrow","popperClassName","tag","container","modifiers","positionFixed","boundariesElement","onClosed","fade","transition","placement"];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__.A)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default().node,prop_types__WEBPACK_IMPORTED_MODULE_4___default().func]).isRequired,popperClassName:prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,placement:prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,placementPrefix:prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,arrowClassName:prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,hideArrow:prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool,tag:_utils__WEBPACK_IMPORTED_MODULE_5__.tagPropType,isOpen:prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool.isRequired,cssModule:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,offset:prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,prop_types__WEBPACK_IMPORTED_MODULE_4___default().number]),fallbackPlacement:prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,prop_types__WEBPACK_IMPORTED_MODULE_4___default().array]),flip:prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool,container:_utils__WEBPACK_IMPORTED_MODULE_5__.targetPropType,target:_utils__WEBPACK_IMPORTED_MODULE_5__.targetPropType.isRequired,modifiers:prop_types__WEBPACK_IMPORTED_MODULE_4___default().object,positionFixed:prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool,boundariesElement:prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default().string,_utils__WEBPACK_IMPORTED_MODULE_5__.DOMElement]),onClosed:prop_types__WEBPACK_IMPORTED_MODULE_4___default().func,fade:prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool,transition:prop_types__WEBPACK_IMPORTED_MODULE_4___default().shape(_Fade__WEBPACK_IMPORTED_MODULE_6__.A.propTypes)},defaultProps={boundariesElement:"scrollParent",placement:"auto",hideArrow:!1,isOpen:!1,offset:0,fallbackPlacement:"flip",flip:!0,container:"body",modifiers:{},onClosed:function noop(){},fade:!0,transition:_objectSpread({},_Fade__WEBPACK_IMPORTED_MODULE_6__.A.defaultProps)},PopperContent=function(_React$Component){function PopperContent(props){var _this;return(_this=_React$Component.call(this,props)||this).setTargetNode=_this.setTargetNode.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__.A)(_this)),_this.getTargetNode=_this.getTargetNode.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__.A)(_this)),_this.getRef=_this.getRef.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__.A)(_this)),_this.onClosed=_this.onClosed.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__.A)(_this)),_this.state={isOpen:props.isOpen},_this}(0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__.A)(PopperContent,_React$Component),PopperContent.getDerivedStateFromProps=function getDerivedStateFromProps(props,state){return props.isOpen&&!state.isOpen?{isOpen:props.isOpen}:null};var _proto=PopperContent.prototype;return _proto.componentDidUpdate=function componentDidUpdate(){this._element&&this._element.childNodes&&this._element.childNodes[0]&&this._element.childNodes[0].focus&&this._element.childNodes[0].focus()},_proto.setTargetNode=function setTargetNode(node){this.targetNode="string"==typeof node?(0,_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(node):node},_proto.getTargetNode=function getTargetNode(){return this.targetNode},_proto.getContainerNode=function getContainerNode(){return(0,_utils__WEBPACK_IMPORTED_MODULE_5__.getTarget)(this.props.container)},_proto.getRef=function getRef(ref){this._element=ref},_proto.onClosed=function onClosed(){this.props.onClosed(),this.setState({isOpen:!1})},_proto.renderChildren=function renderChildren(){var _this$props=this.props,cssModule=_this$props.cssModule,children=_this$props.children,isOpen=_this$props.isOpen,flip=_this$props.flip,offset=(_this$props.target,_this$props.offset),fallbackPlacement=_this$props.fallbackPlacement,placementPrefix=_this$props.placementPrefix,_arrowClassName=_this$props.arrowClassName,hideArrow=_this$props.hideArrow,_popperClassName=_this$props.popperClassName,tag=_this$props.tag,modifiers=(_this$props.container,_this$props.modifiers),positionFixed=_this$props.positionFixed,boundariesElement=_this$props.boundariesElement,fade=(_this$props.onClosed,_this$props.fade),transition=_this$props.transition,placement=_this$props.placement,attrs=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_9__.A)(_this$props,_excluded),arrowClassName=(0,_utils__WEBPACK_IMPORTED_MODULE_5__.mapToCssModules)(classnames__WEBPACK_IMPORTED_MODULE_3___default()("arrow",_arrowClassName),cssModule),popperClassName=(0,_utils__WEBPACK_IMPORTED_MODULE_5__.mapToCssModules)(classnames__WEBPACK_IMPORTED_MODULE_3___default()(_popperClassName,placementPrefix?placementPrefix+"-auto":""),this.props.cssModule),extendedModifiers=_objectSpread({offset:{offset},flip:{enabled:flip,behavior:fallbackPlacement},preventOverflow:{boundariesElement}},modifiers),popperTransition=_objectSpread(_objectSpread(_objectSpread({},_Fade__WEBPACK_IMPORTED_MODULE_6__.A.defaultProps),transition),{},{baseClass:fade?transition.baseClass:"",timeout:fade?transition.timeout:0});return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Fade__WEBPACK_IMPORTED_MODULE_6__.A,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_10__.A)({},popperTransition,attrs,{in:isOpen,onExited:this.onClosed,tag}),react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_popper__WEBPACK_IMPORTED_MODULE_11__.Ay,{referenceElement:this.targetNode,modifiers:extendedModifiers,placement,positionFixed},(function(_ref){var ref=_ref.ref,style=_ref.style,placement=_ref.placement,outOfBoundaries=_ref.outOfBoundaries,arrowProps=_ref.arrowProps,scheduleUpdate=_ref.scheduleUpdate;return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div",{ref,style,className:popperClassName,"x-placement":placement,"x-out-of-boundaries":outOfBoundaries?"true":void 0},"function"==typeof children?children({scheduleUpdate}):children,!hideArrow&&react__WEBPACK_IMPORTED_MODULE_1__.createElement("span",{ref:arrowProps.ref,className:arrowClassName,style:arrowProps.style}))})))},_proto.render=function render(){return this.setTargetNode(this.props.target),this.state.isOpen?"inline"===this.props.container?this.renderChildren():react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal(react__WEBPACK_IMPORTED_MODULE_1__.createElement("div",{ref:this.getRef},this.renderChildren()),this.getContainerNode()):null},PopperContent}(react__WEBPACK_IMPORTED_MODULE_1__.Component);PopperContent.propTypes=propTypes,PopperContent.defaultProps=defaultProps;const __WEBPACK_DEFAULT_EXPORT__=PopperContent},"./node_modules/reactstrap/es/Tooltip.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__),_TooltipPopoverWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/reactstrap/es/TooltipPopoverWrapper.js"),Tooltip=function Tooltip(props){var popperClasses=classnames__WEBPACK_IMPORTED_MODULE_1___default()("tooltip","show",props.popperClassName),classes=classnames__WEBPACK_IMPORTED_MODULE_1___default()("tooltip-inner",props.innerClassName);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_TooltipPopoverWrapper__WEBPACK_IMPORTED_MODULE_2__.A,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.A)({},props,{popperClassName:popperClasses,innerClassName:classes}))};Tooltip.propTypes=_TooltipPopoverWrapper__WEBPACK_IMPORTED_MODULE_2__.t,Tooltip.defaultProps={placement:"top",autohide:!0,placementPrefix:"bs-tooltip",trigger:"hover focus"};const __WEBPACK_DEFAULT_EXPORT__=Tooltip},"./node_modules/reactstrap/es/TooltipPopoverWrapper.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,t:()=>propTypes});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"),_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),_PopperContent__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/reactstrap/es/PopperContent.js"),_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/reactstrap/es/utils.js"),propTypes={children:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().node,prop_types__WEBPACK_IMPORTED_MODULE_1___default().func]),placement:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(_utils__WEBPACK_IMPORTED_MODULE_2__.PopperPlacements),target:_utils__WEBPACK_IMPORTED_MODULE_2__.targetPropType.isRequired,container:_utils__WEBPACK_IMPORTED_MODULE_2__.targetPropType,isOpen:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,disabled:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,hideArrow:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,boundariesElement:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,_utils__WEBPACK_IMPORTED_MODULE_2__.DOMElement]),className:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,innerClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,arrowClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,popperClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,cssModule:prop_types__WEBPACK_IMPORTED_MODULE_1___default().object,toggle:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,autohide:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,placementPrefix:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,delay:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({show:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,hide:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number}),prop_types__WEBPACK_IMPORTED_MODULE_1___default().number]),modifiers:prop_types__WEBPACK_IMPORTED_MODULE_1___default().object,positionFixed:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,offset:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,prop_types__WEBPACK_IMPORTED_MODULE_1___default().number]),innerRef:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,prop_types__WEBPACK_IMPORTED_MODULE_1___default().object]),trigger:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,fade:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,flip:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool},DEFAULT_DELAYS={show:0,hide:50},defaultProps={isOpen:!1,hideArrow:!1,autohide:!1,delay:DEFAULT_DELAYS,toggle:function toggle(){},trigger:"click",fade:!0};function isInDOMSubtree(element,subtreeRoot){return subtreeRoot&&(element===subtreeRoot||subtreeRoot.contains(element))}function isInDOMSubtrees(element,subtreeRoots){return void 0===subtreeRoots&&(subtreeRoots=[]),subtreeRoots&&subtreeRoots.length&&subtreeRoots.filter((function(subTreeRoot){return isInDOMSubtree(element,subTreeRoot)}))[0]}var TooltipPopoverWrapper=function(_React$Component){function TooltipPopoverWrapper(props){var _this;return(_this=_React$Component.call(this,props)||this)._targets=[],_this.currentTargetElement=null,_this.addTargetEvents=_this.addTargetEvents.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.handleDocumentClick=_this.handleDocumentClick.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.removeTargetEvents=_this.removeTargetEvents.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.toggle=_this.toggle.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.showWithDelay=_this.showWithDelay.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.hideWithDelay=_this.hideWithDelay.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.onMouseOverTooltipContent=_this.onMouseOverTooltipContent.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.onMouseLeaveTooltipContent=_this.onMouseLeaveTooltipContent.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.show=_this.show.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.hide=_this.hide.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.onEscKeyDown=_this.onEscKeyDown.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.getRef=_this.getRef.bind((0,_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.A)(_this)),_this.state={isOpen:props.isOpen},_this._isMounted=!1,_this}(0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__.A)(TooltipPopoverWrapper,_React$Component);var _proto=TooltipPopoverWrapper.prototype;return _proto.componentDidMount=function componentDidMount(){this._isMounted=!0,this.updateTarget()},_proto.componentWillUnmount=function componentWillUnmount(){this._isMounted=!1,this.removeTargetEvents(),this._targets=null,this.clearShowTimeout(),this.clearHideTimeout()},TooltipPopoverWrapper.getDerivedStateFromProps=function getDerivedStateFromProps(props,state){return props.isOpen&&!state.isOpen?{isOpen:props.isOpen}:null},_proto.onMouseOverTooltipContent=function onMouseOverTooltipContent(){this.props.trigger.indexOf("hover")>-1&&!this.props.autohide&&(this._hideTimeout&&this.clearHideTimeout(),this.state.isOpen&&!this.props.isOpen&&this.toggle())},_proto.onMouseLeaveTooltipContent=function onMouseLeaveTooltipContent(e){this.props.trigger.indexOf("hover")>-1&&!this.props.autohide&&(this._showTimeout&&this.clearShowTimeout(),e.persist(),this._hideTimeout=setTimeout(this.hide.bind(this,e),this.getDelay("hide")))},_proto.onEscKeyDown=function onEscKeyDown(e){"Escape"===e.key&&this.hide(e)},_proto.getRef=function getRef(ref){var innerRef=this.props.innerRef;innerRef&&("function"==typeof innerRef?innerRef(ref):"object"==typeof innerRef&&(innerRef.current=ref)),this._popover=ref},_proto.getDelay=function getDelay(key){var delay=this.props.delay;return"object"==typeof delay?isNaN(delay[key])?DEFAULT_DELAYS[key]:delay[key]:delay},_proto.getCurrentTarget=function getCurrentTarget(target){if(!target)return null;var index=this._targets.indexOf(target);return index>=0?this._targets[index]:this.getCurrentTarget(target.parentElement)},_proto.show=function show(e){if(!this.props.isOpen){if(this.clearShowTimeout(),this.currentTargetElement=e?e.currentTarget||this.getCurrentTarget(e.target):null,e&&e.composedPath&&"function"==typeof e.composedPath){var path=e.composedPath();this.currentTargetElement=path&&path[0]||this.currentTargetElement}this.toggle(e)}},_proto.showWithDelay=function showWithDelay(e){this._hideTimeout&&this.clearHideTimeout(),this._showTimeout=setTimeout(this.show.bind(this,e),this.getDelay("show"))},_proto.hide=function hide(e){this.props.isOpen&&(this.clearHideTimeout(),this.currentTargetElement=null,this.toggle(e))},_proto.hideWithDelay=function hideWithDelay(e){this._showTimeout&&this.clearShowTimeout(),this._hideTimeout=setTimeout(this.hide.bind(this,e),this.getDelay("hide"))},_proto.clearShowTimeout=function clearShowTimeout(){clearTimeout(this._showTimeout),this._showTimeout=void 0},_proto.clearHideTimeout=function clearHideTimeout(){clearTimeout(this._hideTimeout),this._hideTimeout=void 0},_proto.handleDocumentClick=function handleDocumentClick(e){var triggers=this.props.trigger.split(" ");triggers.indexOf("legacy")>-1&&(this.props.isOpen||isInDOMSubtrees(e.target,this._targets))?(this._hideTimeout&&this.clearHideTimeout(),this.props.isOpen&&!isInDOMSubtree(e.target,this._popover)?this.hideWithDelay(e):this.props.isOpen||this.showWithDelay(e)):triggers.indexOf("click")>-1&&isInDOMSubtrees(e.target,this._targets)&&(this._hideTimeout&&this.clearHideTimeout(),this.props.isOpen?this.hideWithDelay(e):this.showWithDelay(e))},_proto.addEventOnTargets=function addEventOnTargets(type,handler,isBubble){this._targets.forEach((function(target){target.addEventListener(type,handler,isBubble)}))},_proto.removeEventOnTargets=function removeEventOnTargets(type,handler,isBubble){this._targets.forEach((function(target){target.removeEventListener(type,handler,isBubble)}))},_proto.addTargetEvents=function addTargetEvents(){if(this.props.trigger){var triggers=this.props.trigger.split(" ");-1===triggers.indexOf("manual")&&((triggers.indexOf("click")>-1||triggers.indexOf("legacy")>-1)&&document.addEventListener("click",this.handleDocumentClick,!0),this._targets&&this._targets.length&&(triggers.indexOf("hover")>-1&&(this.addEventOnTargets("mouseover",this.showWithDelay,!0),this.addEventOnTargets("mouseout",this.hideWithDelay,!0)),triggers.indexOf("focus")>-1&&(this.addEventOnTargets("focusin",this.show,!0),this.addEventOnTargets("focusout",this.hide,!0)),this.addEventOnTargets("keydown",this.onEscKeyDown,!0)))}},_proto.removeTargetEvents=function removeTargetEvents(){this._targets&&(this.removeEventOnTargets("mouseover",this.showWithDelay,!0),this.removeEventOnTargets("mouseout",this.hideWithDelay,!0),this.removeEventOnTargets("keydown",this.onEscKeyDown,!0),this.removeEventOnTargets("focusin",this.show,!0),this.removeEventOnTargets("focusout",this.hide,!0)),document.removeEventListener("click",this.handleDocumentClick,!0)},_proto.updateTarget=function updateTarget(){var newTarget=(0,_utils__WEBPACK_IMPORTED_MODULE_2__.getTarget)(this.props.target,!0);newTarget!==this._targets&&(this.removeTargetEvents(),this._targets=newTarget?Array.from(newTarget):[],this.currentTargetElement=this.currentTargetElement||this._targets[0],this.addTargetEvents())},_proto.toggle=function toggle(e){return this.props.disabled||!this._isMounted?e&&e.preventDefault():this.props.toggle(e)},_proto.render=function render(){var _this2=this;this.props.isOpen&&this.updateTarget();var target=this.currentTargetElement||this._targets[0];if(!target)return null;var _this$props=this.props,className=_this$props.className,cssModule=_this$props.cssModule,innerClassName=_this$props.innerClassName,isOpen=_this$props.isOpen,hideArrow=_this$props.hideArrow,boundariesElement=_this$props.boundariesElement,placement=_this$props.placement,placementPrefix=_this$props.placementPrefix,arrowClassName=_this$props.arrowClassName,popperClassName=_this$props.popperClassName,container=_this$props.container,modifiers=_this$props.modifiers,positionFixed=_this$props.positionFixed,offset=_this$props.offset,fade=_this$props.fade,flip=_this$props.flip,children=_this$props.children,attributes=(0,_utils__WEBPACK_IMPORTED_MODULE_2__.omit)(this.props,Object.keys(propTypes)),popperClasses=(0,_utils__WEBPACK_IMPORTED_MODULE_2__.mapToCssModules)(popperClassName,cssModule),classes=(0,_utils__WEBPACK_IMPORTED_MODULE_2__.mapToCssModules)(innerClassName,cssModule);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PopperContent__WEBPACK_IMPORTED_MODULE_5__.A,{className,target,isOpen,hideArrow,boundariesElement,placement,placementPrefix,arrowClassName,popperClassName:popperClasses,container,modifiers,positionFixed,offset,cssModule,fade,flip},(function(_ref){var scheduleUpdate=_ref.scheduleUpdate;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__.A)({},attributes,{ref:_this2.getRef,className:classes,role:"tooltip",onMouseOver:_this2.onMouseOverTooltipContent,onMouseLeave:_this2.onMouseLeaveTooltipContent,onKeyDown:_this2.onEscKeyDown}),"function"==typeof children?children({scheduleUpdate}):children)}))},TooltipPopoverWrapper}(react__WEBPACK_IMPORTED_MODULE_0__.Component);TooltipPopoverWrapper.propTypes=propTypes,TooltipPopoverWrapper.defaultProps=defaultProps;const __WEBPACK_DEFAULT_EXPORT__=TooltipPopoverWrapper}}]);