/*! For license information please see 7637.2cd5ecb0.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_availity_availity_react=self.webpackChunk_availity_availity_react||[]).push([[7637],{"./node_modules/react-infinite-scroll-component/dist/index.es.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),extendStatics=function(d,b){return extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])},extendStatics(d,b)};var __assign=function(){return __assign=Object.assign||function __assign(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)};var ThresholdUnits_Pixel="Pixel",ThresholdUnits_Percent="Percent",defaultThreshold={unit:ThresholdUnits_Percent,value:.8};function parseThreshold(scrollThreshold){return"number"==typeof scrollThreshold?{unit:ThresholdUnits_Percent,value:100*scrollThreshold}:"string"==typeof scrollThreshold?scrollThreshold.match(/^(\d*(\.\d+)?)px$/)?{unit:ThresholdUnits_Pixel,value:parseFloat(scrollThreshold)}:scrollThreshold.match(/^(\d*(\.\d+)?)%$/)?{unit:ThresholdUnits_Percent,value:parseFloat(scrollThreshold)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),defaultThreshold):(console.warn("scrollThreshold should be string or number"),defaultThreshold)}const __WEBPACK_DEFAULT_EXPORT__=function(_super){function InfiniteScroll(props){var _this=_super.call(this,props)||this;return _this.lastScrollTop=0,_this.actionTriggered=!1,_this.startY=0,_this.currentY=0,_this.dragging=!1,_this.maxPullDownDistance=0,_this.getScrollableTarget=function(){return _this.props.scrollableTarget instanceof HTMLElement?_this.props.scrollableTarget:"string"==typeof _this.props.scrollableTarget?document.getElementById(_this.props.scrollableTarget):(null===_this.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},_this.onStart=function(evt){_this.lastScrollTop||(_this.dragging=!0,evt instanceof MouseEvent?_this.startY=evt.pageY:evt instanceof TouchEvent&&(_this.startY=evt.touches[0].pageY),_this.currentY=_this.startY,_this._infScroll&&(_this._infScroll.style.willChange="transform",_this._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},_this.onMove=function(evt){_this.dragging&&(evt instanceof MouseEvent?_this.currentY=evt.pageY:evt instanceof TouchEvent&&(_this.currentY=evt.touches[0].pageY),_this.currentY<_this.startY||(_this.currentY-_this.startY>=Number(_this.props.pullDownToRefreshThreshold)&&_this.setState({pullToRefreshThresholdBreached:!0}),_this.currentY-_this.startY>1.5*_this.maxPullDownDistance||_this._infScroll&&(_this._infScroll.style.overflow="visible",_this._infScroll.style.transform="translate3d(0px, "+(_this.currentY-_this.startY)+"px, 0px)")))},_this.onEnd=function(){_this.startY=0,_this.currentY=0,_this.dragging=!1,_this.state.pullToRefreshThresholdBreached&&(_this.props.refreshFunction&&_this.props.refreshFunction(),_this.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){_this._infScroll&&(_this._infScroll.style.overflow="auto",_this._infScroll.style.transform="none",_this._infScroll.style.willChange="unset")}))},_this.onScrollListener=function(event){"function"==typeof _this.props.onScroll&&setTimeout((function(){return _this.props.onScroll&&_this.props.onScroll(event)}),0);var target=_this.props.height||_this._scrollableNode?event.target:document.documentElement.scrollTop?document.documentElement:document.body;_this.actionTriggered||((_this.props.inverse?_this.isElementAtTop(target,_this.props.scrollThreshold):_this.isElementAtBottom(target,_this.props.scrollThreshold))&&_this.props.hasMore&&(_this.actionTriggered=!0,_this.setState({showLoader:!0}),_this.props.next&&_this.props.next()),_this.lastScrollTop=target.scrollTop)},_this.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:props.dataLength},_this.throttledOnScrollListener=function throttle(delay,noTrailing,callback,debounceMode){var timeoutID,cancelled=!1,lastExec=0;function clearExistingTimeout(){timeoutID&&clearTimeout(timeoutID)}function wrapper(){var self=this,elapsed=Date.now()-lastExec,args=arguments;function exec(){lastExec=Date.now(),callback.apply(self,args)}cancelled||(debounceMode&&!timeoutID&&exec(),clearExistingTimeout(),void 0===debounceMode&&elapsed>delay?exec():!0!==noTrailing&&(timeoutID=setTimeout(debounceMode?function clear(){timeoutID=void 0}:exec,void 0===debounceMode?delay-elapsed:delay)))}return"boolean"!=typeof noTrailing&&(debounceMode=callback,callback=noTrailing,noTrailing=void 0),wrapper.cancel=function cancel(){clearExistingTimeout(),cancelled=!0},wrapper}(150,_this.onScrollListener).bind(_this),_this.onStart=_this.onStart.bind(_this),_this.onMove=_this.onMove.bind(_this),_this.onEnd=_this.onEnd.bind(_this),_this}return function __extends(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}(InfiniteScroll,_super),InfiniteScroll.prototype.componentDidMount=function(){if(void 0===this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"==typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!=typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},InfiniteScroll.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},InfiniteScroll.prototype.componentDidUpdate=function(prevProps){this.props.dataLength!==prevProps.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},InfiniteScroll.getDerivedStateFromProps=function(nextProps,prevState){return nextProps.dataLength!==prevState.prevDataLength?__assign(__assign({},prevState),{prevDataLength:nextProps.dataLength}):null},InfiniteScroll.prototype.isElementAtTop=function(target,scrollThreshold){void 0===scrollThreshold&&(scrollThreshold=.8);var clientHeight=target===document.body||target===document.documentElement?window.screen.availHeight:target.clientHeight,threshold=parseThreshold(scrollThreshold);return threshold.unit===ThresholdUnits_Pixel?target.scrollTop<=threshold.value+clientHeight-target.scrollHeight+1:target.scrollTop<=threshold.value/100+clientHeight-target.scrollHeight+1},InfiniteScroll.prototype.isElementAtBottom=function(target,scrollThreshold){void 0===scrollThreshold&&(scrollThreshold=.8);var clientHeight=target===document.body||target===document.documentElement?window.screen.availHeight:target.clientHeight,threshold=parseThreshold(scrollThreshold);return threshold.unit===ThresholdUnits_Pixel?target.scrollTop+clientHeight>=target.scrollHeight-threshold.value:target.scrollTop+clientHeight>=threshold.value/100*target.scrollHeight},InfiniteScroll.prototype.render=function(){var _this=this,style=__assign({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),hasChildren=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),outerDivStyle=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:outerDivStyle,className:"infinite-scroll-component__outerdiv"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(infScroll){return _this._infScroll=infScroll},style},this.props.pullDownToRefresh&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{position:"relative"},ref:function(pullDown){return _this._pullDown=pullDown}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!hasChildren&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},InfiniteScroll}(react__WEBPACK_IMPORTED_MODULE_0__.Component)},"./node_modules/react-use/esm/useDebounce.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useDebounce});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_useTimeoutFn__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-use/esm/useTimeoutFn.js");function useDebounce(fn,ms,deps){void 0===ms&&(ms=0),void 0===deps&&(deps=[]);var _a=(0,_useTimeoutFn__WEBPACK_IMPORTED_MODULE_1__.A)(fn,ms),isReady=_a[0],cancel=_a[1],reset=_a[2];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(reset,deps),[isReady,cancel]}},"./node_modules/react-use/esm/useTimeoutFn.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>useTimeoutFn});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useTimeoutFn(fn,ms){void 0===ms&&(ms=0);var ready=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),timeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),callback=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fn),isReady=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){return ready.current}),[]),set=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){ready.current=!1,timeout.current&&clearTimeout(timeout.current),timeout.current=setTimeout((function(){ready.current=!0,callback.current()}),ms)}),[ms]),clear=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){ready.current=null,timeout.current&&clearTimeout(timeout.current)}),[]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){callback.current=fn}),[fn]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return set(),clear}),[ms]),[isReady,clear,set]}}}]);