(function(e){function t(t){for(var o,i,u=t[0],a=t[1],s=t[2],l=0,d=[];l<u.length;l++)i=u[l],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);f&&f(t);while(d.length)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],o=!0,i=1;i<n.length;i++){var a=n[i];0!==r[a]&&(o=!1)}o&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={app:0},c=[];function i(e){return u.p+"static/js/"+({about:"about"}[e]||e)+"."+{about:"1a890ca3"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var c,a=document.createElement("script");a.charset="utf-8",a.timeout=120,u.nc&&a.setAttribute("nonce",u.nc),a.src=i(e);var s=new Error;c=function(t){a.onerror=a.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+c+")",s.name="ChunkLoadError",s.type=o,s.request=c,n[1](s)}r[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:a})}),12e4);a.onerror=a.onload=c,document.head.appendChild(a)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var f=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("f2bf"),r=(n("b0c0"),function(e){return Object(o["r"])("data-v-5fa0fce6"),e=e(),Object(o["p"])(),e}),c={id:"nav",class:"view"},i=r((function(){return Object(o["d"])("div",{class:"left"},"菜单",-1)})),u={class:"right"},a={class:"header"},s=Object(o["e"])(" 头部 "),l={class:"contentView"},f={class:"contentView",id:"contentapp"},d=r((function(){return Object(o["d"])("div",{class:"footer"},"备案号信息",-1)}));function p(e,t,n,r,p,b){var h=Object(o["u"])("router-view");return Object(o["o"])(),Object(o["c"])("div",c,[i,Object(o["d"])("div",u,[Object(o["d"])("div",a,[s,Object(o["d"])("div",null,[Object(o["d"])("button",{type:"warning",style:{margin:"20px 100px"},onClick:t[0]||(t[0]=function(t){return e.jump(!0)})}," React "),Object(o["d"])("button",{type:"error",onClick:t[1]||(t[1]=function(t){return e.jump(!1)})},"Vue")])]),Object(o["z"])(Object(o["d"])("div",l,[Object(o["f"])(h)],512),[[o["x"],e.$route.name]]),Object(o["z"])(Object(o["d"])("div",f,null,512),[[o["x"],!e.$route.name]]),d])])}var b=Object(o["g"])({setup:function(){var e=Object(o["t"])(!0);return{show:e,handleUpdateValue:function(e,t){console.log(e,t)}}},methods:{jump:function(e){console.log("val",e),e?this.$router.push("/wqd-react"):this.$router.push("/wqd_main/wqd-vue/")}}}),h=(n("5f60"),n("6b0d")),v=n.n(h);const g=v()(b,[["render",p],["__scopeId","data-v-5fa0fce6"]]);var m=g,j=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),O=n("cf05"),y=n.n(O),w={class:"home"},x=Object(o["d"])("img",{alt:"Vue logo",src:y.a},null,-1),P=[x];function _(e,t,n,r,c,i){return Object(o["o"])(),Object(o["c"])("div",w,P)}var q={name:"Home"};const S=v()(q,[["render",_]]);var k=S,M=[{path:"/",name:"Home",component:k},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],E=Object(j["a"])({history:Object(j["b"])("/"),routes:M}),U=E,V=n("5502"),z=Object(V["a"])({state:{},mutations:{},actions:{},modules:{}}),A=(n("159b"),n("c740"),n("a434"),n("e9c4"),{constructor:function(){this.subs={},this.delegates={}},on:function(e,t){(this.subs[e]||(this.subs[e]=[])).push(t)},trigger:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];this.subs[e]&&this.subs[e].forEach((function(e){e.apply(void 0,n)}))},once:function(e,t){var n=this,o=function(){t.apply(void 0,arguments),n.off(e,t)};this.on(e,o)},off:function(e,t){if(this.subs[e]){var n=this.subs[e].findIndex((function(e){return e===t}));this.subs[e].splice(n,1),this.subs[e].length||delete this.subs[e]}},delegate:function(e,t){if(this.delegates[e]){if("function"===typeof this.delegates[e]){var n=this.delegates[e]();n.unshift(e),(this.delegates[e]=[]).push(t),this.emit.apply(this,n)}}else(this.delegates[e]=[]).push(t)},emit:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];this.delegates[e]&&"function"!==typeof this.delegates[e]?this.delegates[e].forEach((function(e){e.apply(void 0,n)})):this.delegates[e]=function(){return JSON.parse(JSON.stringify(n))}}}),C=n("34ac9"),J=n("548a");A.constructor();var T=function(e){console.log(e,"--loading--"),A.trigger("afterUnmount",!0)};Object(o["b"])(m).use(z).use(U).mount("#app"),Object(C["b"])([{name:"my-react",entry:"//zhj1214.gitee.io/wqd-react/",container:"#contentapp",activeRule:"/wqd-react",loader:T},{name:"my-vue",entry:"//zhj1214.gitee.io/wqd-vue/",container:"#contentapp",activeRule:"/wqd-vue",loader:T}],{beforeLoad:function(){console.log("加载前")},beforeMount:function(){console.log("挂载前")},afterMount:function(){console.log("挂在后")},beforeUnmount:function(){console.log("销毁前")},afterUnmount:function(e,t){console.log(t,"销毁后",e),A.trigger("afterUnmount",!1)}}),Object(C["c"])({sandbox:{experimentalStyleIsolation:!0}}),Object(J["a"])((function(e){console.error(e);var t=e.message;console.error("子应用加载失败，请检查应用是否可运行",t)}))},"5f60":function(e,t,n){"use strict";n("e3ad")},cf05:function(e,t,n){e.exports=n.p+"static/img/logo.82b9c7a5.png"},e3ad:function(e,t,n){}});