!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){e.exports=n(1).wrap(n(2)()),e.exports.__esModule=!0},function(e,t,n){"use strict";n.r(t),n.d(t,"createEndpoint",(function(){return o})),n.d(t,"expose",(function(){return l})),n.d(t,"proxy",(function(){return h})),n.d(t,"proxyMarker",(function(){return r})),n.d(t,"releaseProxy",(function(){return i})),n.d(t,"transfer",(function(){return p})),n.d(t,"transferHandlers",(function(){return a})),n.d(t,"windowEndpoint",(function(){return v})),n.d(t,"wrap",(function(){return _}));const r=Symbol("Comlink.proxy"),o=Symbol("Comlink.endpoint"),i=Symbol("Comlink.releaseProxy"),u=new WeakSet,a=new Map([["proxy",{canHandle:e=>e&&e[r],serialize(e){const{port1:t,port2:n}=new MessageChannel;return l(e,t),[n,[n]]},deserialize:e=>(e.start(),_(e))}],["throw",{canHandle:e=>u.has(e),serialize(e){const t=e instanceof Error;let n=e;return t&&(n={isError:t,message:e.message,stack:e.stack}),[n,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error,e);throw e}}]]);function l(e,t=self){t.addEventListener("message",(function n(r){if(!r||!r.data)return;const{id:o,type:i,path:a}=Object.assign({path:[]},r.data),_=(r.data.argumentList||[]).map(y);let s;try{const t=a.slice(0,-1).reduce((e,t)=>e[t],e),n=a.reduce((e,t)=>e[t],e);switch(i){case 0:s=n;break;case 1:t[a.slice(-1)[0]]=y(r.data.value),s=!0;break;case 2:s=n.apply(t,_);break;case 3:s=h(new n(..._));break;case 4:{const{port1:t,port2:n}=new MessageChannel;l(e,n),s=p(t,[t])}break;case 5:s=void 0}}catch(e){s=e,u.add(e)}Promise.resolve(s).catch(e=>(u.add(e),e)).then(e=>{const[r,u]=m(e);t.postMessage(Object.assign(Object.assign({},r),{id:o}),u),5===i&&(t.removeEventListener("message",n),c(t))})})),t.start&&t.start()}function c(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function _(e,t){return function e(t,n=[],r=function(){}){let u=!1;const a=new Proxy(r,{get(r,o){if(s(u),o===i)return()=>g(t,{type:5,path:n.map(e=>e.toString())}).then(()=>{c(t),u=!0});if("then"===o){if(0===n.length)return{then:()=>a};const e=g(t,{type:0,path:n.map(e=>e.toString())}).then(y);return e.then.bind(e)}return e(t,[...n,o])},set(e,r,o){s(u);const[i,a]=m(o);return g(t,{type:1,path:[...n,r].map(e=>e.toString()),value:i},a).then(y)},apply(r,i,a){s(u);const l=n[n.length-1];if(l===o)return g(t,{type:4}).then(y);if("bind"===l)return e(t,n.slice(0,-1));const[c,_]=f(a);return g(t,{type:2,path:n.map(e=>e.toString()),argumentList:c},_).then(y)},construct(e,r){s(u);const[o,i]=f(r);return g(t,{type:3,path:n.map(e=>e.toString()),argumentList:o},i).then(y)}});return a}(e,[],t)}function s(e){if(e)throw new Error("Proxy has been released and is not useable")}function f(e){const t=e.map(m);return[t.map(e=>e[0]),(n=t.map(e=>e[1]),Array.prototype.concat.apply([],n))];var n}const d=new WeakMap;function p(e,t){return d.set(e,t),e}function h(e){return Object.assign(e,{[r]:!0})}function v(e,t=self,n="*"){return{postMessage:(t,r)=>e.postMessage(t,n,r),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function m(e){for(const[t,n]of a)if(n.canHandle(e)){const[r,o]=n.serialize(e);return[{type:3,name:t,value:r},o]}return[{type:0,value:e},d.get(e)||[]]}function y(e){switch(e.type){case 3:return a.get(e.name).deserialize(e.value);case 0:return e.value}}function g(e,t,n){return new Promise(r=>{const o=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===o&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}},function(e,t,n){e.exports=function(){return new Worker(n.p+"worker.js")}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r,o,i,u,a,l,c={},_=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function f(e,t){for(var n in t)e[n]=t[n];return e}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function p(e,t,n){var r,o=arguments,i={};for(r in t)"key"!==r&&"ref"!==r&&(i[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return h(e,i,t&&t.key,t&&t.ref)}function h(e,t,n,o){var i={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0};return r.vnode&&r.vnode(i),i}function v(e){return e.children}function m(e,t){this.props=e,this.context=t}function y(e,t){if(null==t)return e.__?y(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?y(e):null}function g(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return g(e)}}function b(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!i++||a!==r.debounceRendering)&&((a=r.debounceRendering)||u)(w)}function w(){for(var e;i=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,r,o,i,u;e.__d&&(i=(o=(t=e).__v).__e,(u=t.__P)&&(n=[],r=A(u,o,f({},o),t.__n,void 0!==u.ownerSVGElement,null,n,null==i?y(o):i),C(n,o),r!=i&&g(o)))}))}function k(e,t,n,r,o,i,u,a,l){var s,f,p,h,v,m,g,b=n&&n.__k||_,w=b.length;if(a==c&&(a=null!=i?i[0]:w?y(n,0):null),s=0,t.__k=E(t.__k,(function(n){if(null!=n){if(n.__=t,n.__b=t.__b+1,null===(p=b[s])||p&&n.key==p.key&&n.type===p.type)b[s]=void 0;else for(f=0;f<w;f++){if((p=b[f])&&n.key==p.key&&n.type===p.type){b[f]=void 0;break}p=null}if(h=A(e,n,p=p||c,r,o,i,u,a,l),(f=n.ref)&&p.ref!=f&&(g||(g=[]),p.ref&&g.push(p.ref,null,n),g.push(f,n.__c||h,n)),null!=h){var _;if(null==m&&(m=h),void 0!==n.__d)_=n.__d,n.__d=void 0;else if(i==p||h!=a||null==h.parentNode){e:if(null==a||a.parentNode!==e)e.appendChild(h),_=null;else{for(v=a,f=0;(v=v.nextSibling)&&f<w;f+=2)if(v==h)break e;e.insertBefore(h,a),_=a}"option"==t.type&&(e.value="")}a=void 0!==_?_:h.nextSibling,"function"==typeof t.type&&(t.__d=a)}else a&&p.__e==a&&a.parentNode!=e&&(a=y(p))}return s++,n})),t.__e=m,null!=i&&"function"!=typeof t.type)for(s=i.length;s--;)null!=i[s]&&d(i[s]);for(s=w;s--;)null!=b[s]&&H(b[s],b[s]);if(g)for(s=0;s<g.length;s++)P(g[s],g[++s],g[++s])}function E(e,t,n){if(null==n&&(n=[]),null==e||"boolean"==typeof e)t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)E(e[r],t,n);else n.push(t?t("string"==typeof e||"number"==typeof e?h(null,e,null,null):null!=e.__e||null!=e.__c?h(e.type,e.props,e.key,null):e):e);return n}function S(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===s.test(t)?n+"px":null==n?"":n}function N(e,t,n,r,o){var i,u,a,l,c;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"key"===t||"children"===t);else if("style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(u in r)n&&u in n||S(i,u,"");if(n)for(a in n)r&&n[a]===r[a]||S(i,a,n[a])}else"o"===t[0]&&"n"===t[1]?(l=t!==(t=t.replace(/Capture$/,"")),c=t.toLowerCase(),t=(c in e?c:t).slice(2),n?(r||e.addEventListener(t,x,l),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,x,l)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function x(e){this.l[e.type](r.event?r.event(e):e)}function A(e,t,n,o,i,u,a,l,c){var _,s,d,p,h,y,g,b,w,E,S=t.type;if(void 0!==t.constructor)return null;(_=r.__b)&&_(t);try{e:if("function"==typeof S){if(b=t.props,w=(_=S.contextType)&&o[_.__c],E=_?w?w.props.value:_.__:o,n.__c?g=(s=t.__c=n.__c).__=s.__E:("prototype"in S&&S.prototype.render?t.__c=s=new S(b,E):(t.__c=s=new m(b,E),s.constructor=S,s.render=M),w&&w.sub(s),s.props=b,s.state||(s.state={}),s.context=E,s.__n=o,d=s.__d=!0,s.__h=[]),null==s.__s&&(s.__s=s.state),null!=S.getDerivedStateFromProps&&(s.__s==s.state&&(s.__s=f({},s.__s)),f(s.__s,S.getDerivedStateFromProps(b,s.__s))),p=s.props,h=s.state,d)null==S.getDerivedStateFromProps&&null!=s.componentWillMount&&s.componentWillMount(),null!=s.componentDidMount&&s.__h.push(s.componentDidMount);else{if(null==S.getDerivedStateFromProps&&b!==p&&null!=s.componentWillReceiveProps&&s.componentWillReceiveProps(b,E),!s.__e&&null!=s.shouldComponentUpdate&&!1===s.shouldComponentUpdate(b,s.__s,E)){for(s.props=b,s.state=s.__s,s.__d=!1,s.__v=t,t.__e=n.__e,t.__k=n.__k,s.__h.length&&a.push(s),_=0;_<t.__k.length;_++)t.__k[_]&&(t.__k[_].__=t);break e}null!=s.componentWillUpdate&&s.componentWillUpdate(b,s.__s,E),null!=s.componentDidUpdate&&s.__h.push((function(){s.componentDidUpdate(p,h,y)}))}s.context=E,s.props=b,s.state=s.__s,(_=r.__r)&&_(t),s.__d=!1,s.__v=t,s.__P=e,_=s.render(s.props,s.state,s.context),t.__k=null!=_&&_.type==v&&null==_.key?_.props.children:Array.isArray(_)?_:[_],null!=s.getChildContext&&(o=f(f({},o),s.getChildContext())),d||null==s.getSnapshotBeforeUpdate||(y=s.getSnapshotBeforeUpdate(p,h)),k(e,t,n,o,i,u,a,l,c),s.base=t.__e,s.__h.length&&a.push(s),g&&(s.__E=s.__=null),s.__e=!1}else t.__e=T(n.__e,t,n,o,i,u,a,c);(_=r.diffed)&&_(t)}catch(e){r.__e(e,t,n)}return t.__e}function C(e,t){r.__c&&r.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){r.__e(e,t.__v)}}))}function T(e,t,n,r,o,i,u,a){var l,s,f,d,p,h=n.props,v=t.props;if(o="svg"===t.type||o,null!=i)for(l=0;l<i.length;l++)if(null!=(s=i[l])&&((null===t.type?3===s.nodeType:s.localName===t.type)||e==s)){e=s,i[l]=null;break}if(null==e){if(null===t.type)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,v.is&&{is:v.is}),i=null}if(null===t.type)h!==v&&e.data!=v&&(e.data=v);else if(t!==n){if(null!=i&&(i=_.slice.call(e.childNodes)),f=(h=n.props||c).dangerouslySetInnerHTML,d=v.dangerouslySetInnerHTML,!a){if(h===c)for(h={},p=0;p<e.attributes.length;p++)h[e.attributes[p].name]=e.attributes[p].value;(d||f)&&(d&&f&&d.__html==f.__html||(e.innerHTML=d&&d.__html||""))}(function(e,t,n,r,o){var i;for(i in n)i in t||N(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"value"===i||"checked"===i||n[i]===t[i]||N(e,i,t[i],n[i],r)})(e,v,h,o,a),t.__k=t.props.children,d||k(e,t,n,r,"foreignObject"!==t.type&&o,i,u,c,a),a||("value"in v&&void 0!==v.value&&v.value!==e.value&&(e.value=null==v.value?"":v.value),"checked"in v&&void 0!==v.checked&&v.checked!==e.checked&&(e.checked=v.checked))}return e}function P(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function H(e,t,n){var o,i,u;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||P(o,null,t)),n||"function"==typeof e.type||(n=null!=(i=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(u=0;u<o.length;u++)o[u]&&H(o[u],t,n);null!=i&&d(i)}function M(e,t,n){return this.constructor(e,n)}function O(e,t,n){var o,i,u;r.__&&r.__(e,t),i=(o=n===l)?null:n&&n.__k||t.__k,e=p(v,null,[e]),u=[],A(t,(o?t:n||t).__k=e,i||c,c,void 0!==t.ownerSVGElement,n&&!o?[n]:i?null:_.slice.call(t.childNodes),u,n||c,o),C(u,e)}r={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return b(n.__E=n)}catch(t){e=t}throw e}},m.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=f({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&f(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),b(this))},m.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),b(this))},m.prototype.render=v,o=[],i=0,u="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,l=c;var L,U,j,D=[],R=r.__r,F=r.diffed,I=r.__c,z=r.unmount;function V(e){r.__h&&r.__h(U);var t=U.__H||(U.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function W(e){return function(e,t,n){var r=V(L++);return r.__c||(r.__c=U,r.__=[n?n(t):Y(void 0,t),function(t){var n=e(r.__[0],t);r.__[0]!==n&&(r.__[0]=n,r.__c.setState({}))}]),r.__}(Y,e)}function B(e,t){var n=V(L++);Q(n.__H,t)&&(n.__=e,n.__H=t,U.__H.__h.push(n))}function G(e,t){var n=V(L++);Q(n.__H,t)&&(n.__=e,n.__H=t,U.__h.push(n))}function q(e){return X((function(){return{current:e}}),[])}function X(e,t){var n=V(L++);return Q(n.__H,t)?(n.__H=t,n.__h=e,n.__=e()):n.__}function $(){D.some((function(e){if(e.__P)try{e.__H.__h.forEach(K),e.__H.__h.forEach(J),e.__H.__h=[]}catch(t){return r.__e(t,e.__v),!0}})),D=[]}function K(e){e.t&&e.t()}function J(e){var t=e.__();"function"==typeof t&&(e.t=t)}function Q(e,t){return!e||t.some((function(t,n){return t!==e[n]}))}function Y(e,t){return"function"==typeof t?t(e):t}r.__r=function(e){R&&R(e),L=0,(U=e.__c).__H&&(U.__H.__h.forEach(K),U.__H.__h.forEach(J),U.__H.__h=[])},r.diffed=function(e){F&&F(e);var t=e.__c;if(t){var n=t.__H;n&&n.__h.length&&(1!==D.push(t)&&j===r.requestAnimationFrame||((j=r.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);"undefined"!=typeof window&&(t=requestAnimationFrame(n))})($))}},r.__c=function(e,t){t.some((function(e){try{e.__h.forEach(K),e.__h=e.__h.filter((function(e){return!e.__||J(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],r.__e(n,e.__v)}})),I&&I(e,t)},r.unmount=function(e){z&&z(e);var t=e.__c;if(t){var n=t.__H;if(n)try{n.__.forEach((function(e){return e.t&&e.t()}))}catch(e){r.__e(e,t.__v)}}};const Z=(e,t)=>{const n=q(null);n.current=t,B(()=>{const t=t=>{t.ctrlKey&&t.key===e&&(t.preventDefault(),n.current(t))};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[])};var ee;var te="undefined"==typeof document?void 0:document,ne=!!te&&"content"in te.createElement("template"),re=!!te&&te.createRange&&"createContextualFragment"in te.createRange();function oe(e){return e=e.trim(),ne?function(e){var t=te.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(e):re?function(e){return ee||(ee=te.createRange()).selectNode(te.body),ee.createContextualFragment(e).childNodes[0]}(e):function(e){var t=te.createElement("body");return t.innerHTML=e,t.childNodes[0]}(e)}function ie(e,t){var n=e.nodeName,r=t.nodeName;return n===r||!!(t.actualize&&n.charCodeAt(0)<91&&r.charCodeAt(0)>90)&&n===r.toUpperCase()}function ue(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var ae={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();"OPTGROUP"===r&&(r=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==r||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}ue(e,t,"selected")},INPUT:function(e,t){ue(e,t,"checked"),ue(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var o=r.nodeValue;if(o==n||!n&&o==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,r,o=-1,i=0,u=e.firstChild;u;)if("OPTGROUP"===(r=u.nodeName&&u.nodeName.toUpperCase()))u=(n=u).firstChild;else{if("OPTION"===r){if(u.hasAttribute("selected")){o=i;break}i++}!(u=u.nextSibling)&&n&&(u=n.nextSibling,n=null)}e.selectedIndex=o}}};function le(){}function ce(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var _e=function(e){return function(t,n,r){if(r||(r={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var o=n;(n=te.createElement("html")).innerHTML=o}else n=oe(n);var i=r.getNodeKey||ce,u=r.onBeforeNodeAdded||le,a=r.onNodeAdded||le,l=r.onBeforeElUpdated||le,c=r.onElUpdated||le,_=r.onBeforeNodeDiscarded||le,s=r.onNodeDiscarded||le,f=r.onBeforeElChildrenUpdated||le,d=!0===r.childrenOnly,p=Object.create(null),h=[];function v(e){h.push(e)}function m(e,t,n){!1!==_(e)&&(t&&t.removeChild(e),s(e),function e(t,n){if(1===t.nodeType)for(var r=t.firstChild;r;){var o=void 0;n&&(o=i(r))?v(o):(s(r),r.firstChild&&e(r,n)),r=r.nextSibling}}(e,n))}function y(e){a(e);for(var t=e.firstChild;t;){var n=t.nextSibling,r=i(t);if(r){var o=p[r];o&&ie(t,o)&&(t.parentNode.replaceChild(o,t),g(o,t))}y(t),t=n}}function g(t,n,r){var o=i(n);if(o&&delete p[o],!r){if(!1===l(t,n))return;if(e(t,n),c(t),!1===f(t,n))return}"TEXTAREA"!==t.nodeName?function(e,t){var n,r,o,a,l,c=t.firstChild,_=e.firstChild;e:for(;c;){for(a=c.nextSibling,n=i(c);_;){if(o=_.nextSibling,c.isSameNode&&c.isSameNode(_)){c=a,_=o;continue e}r=i(_);var s=_.nodeType,f=void 0;if(s===c.nodeType&&(1===s?(n?n!==r&&((l=p[n])?o===l?f=!1:(e.insertBefore(l,_),r?v(r):m(_,e,!0),_=l):f=!1):r&&(f=!1),(f=!1!==f&&ie(_,c))&&g(_,c)):3!==s&&8!=s||(f=!0,_.nodeValue!==c.nodeValue&&(_.nodeValue=c.nodeValue))),f){c=a,_=o;continue e}r?v(r):m(_,e,!0),_=o}if(n&&(l=p[n])&&ie(l,c))e.appendChild(l),g(l,c);else{var d=u(c);!1!==d&&(d&&(c=d),c.actualize&&(c=c.actualize(e.ownerDocument||te)),e.appendChild(c),y(c))}c=a,_=o}!function(e,t,n){for(;t;){var r=t.nextSibling;(n=i(t))?v(n):m(t,e,!0),t=r}}(e,_,r);var h=ae[e.nodeName];h&&h(e,t)}(t,n):ae.TEXTAREA(t,n)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var n=t.firstChild;n;){var r=i(n);r&&(p[r]=n),e(n),n=n.nextSibling}}(t);var b,w,k=t,E=k.nodeType,S=n.nodeType;if(!d)if(1===E)1===S?ie(t,n)||(s(t),k=function(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}(t,(b=n.nodeName,(w=n.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==w?te.createElementNS(w,b):te.createElement(b)))):k=n;else if(3===E||8===E){if(S===E)return k.nodeValue!==n.nodeValue&&(k.nodeValue=n.nodeValue),k;k=n}if(k===n)s(t);else{if(n.isSameNode&&n.isSameNode(k))return;if(g(k,n,d),h)for(var N=0,x=h.length;N<x;N++){var A=p[h[N]];A&&m(A,A.parentNode,!1)}}return!d&&k!==t&&t.parentNode&&(k.actualize&&(k=k.actualize(t.ownerDocument||te)),t.parentNode.replaceChild(k,t)),k}}((function(e,t){var n,r,o,i,u=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var a=u.length-1;a>=0;a--)r=(n=u[a]).name,o=n.namespaceURI,i=n.value,o?(r=n.localName||r,e.getAttributeNS(o,r)!==i&&("xmlns"===n.prefix&&(r=n.name),e.setAttributeNS(o,r,i))):e.getAttribute(r)!==i&&e.setAttribute(r,i);for(var l=e.attributes,c=l.length-1;c>=0;c--)r=(n=l[c]).name,(o=n.namespaceURI)?(r=n.localName||r,t.hasAttributeNS(o,r)||e.removeAttributeNS(o,r)):t.hasAttribute(r)||e.removeAttribute(r)}}));var se=({html:e})=>{const t=q(null);return G(()=>{const n=requestAnimationFrame(()=>{_e(t.current,`<div class="html-preview">${e}</div>`)});return()=>cancelAnimationFrame(n)}),p("div",{class:"html-preview",ref:t})},fe=n(0);var de=()=>{const[e,t]=W(""),[n,r]=W(""),[o,i]=W("");((e,t=[])=>{B(()=>{e()},t)})(async()=>{const e=await Object(fe.load)(),[n,o]=await Object(fe.convert)(e);t(e),r(n),i(o)},[]),Z("s",()=>Object(fe.save)(e)),Z("d",()=>navigator.clipboard.writeText(o)),Z("f",async()=>t(await Object(fe.format)(e)));return p(v,null,p("textarea",{class:"markdown-edit",value:e,spellcheck:!1,onInput:async e=>{const n=e.currentTarget.value,[o,u]=await Object(fe.convert)(n);t(n),r(o),i(u)}}),p(se,{html:n}),p("pre",{class:"steam-formatting"},o))};n(3);O(p(de,null),document.getElementById("root-container"))}]);