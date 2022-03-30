import{a as j,J as I,c5 as C,n as l,G as h,cE as F,cF as U,Q as M,b6 as S,O as $,Y as V,a0 as G,S as T,X as J,T as K}from"./index.a37e80f2.js";var L={prefixCls:h.string,href:h.string,separator:h.any,overlay:h.any},N=j({name:"ABreadcrumbItem",__ANT_BREADCRUMB_ITEM:!0,props:L,emits:["click"],slots:["separator","overlay"],setup:function(a,u){var r=u.slots,s=u.emit,m=I("breadcrumb",a),i=m.prefixCls,v=function(o,t){var n=C(r,a,"overlay");return n?l(U,{overlay:n,placement:"bottom"},{default:function(){return[l("span",{class:"".concat(t,"-overlay-link")},[o,l(F,null,null)])]}}):o},y=function(o){s("click",o)};return function(){var p,o=(p=C(r,a,"separator"))!==null&&p!==void 0?p:"/",t=C(r,a),n;return a.href!==void 0?n=l("a",{class:"".concat(i.value,"-link")},[t]):n=l("span",{class:"".concat(i.value,"-link")},[t]),n=v(n,i.value),t?l("span",{onClick:y},[n,o&&l("span",{class:"".concat(i.value,"-separator")},[o])]):null}}}),Q={prefixCls:h.string,routes:{type:Array},params:h.any,separator:h.any,itemRender:{type:Function}};function X(e,a){if(!e.breadcrumbName)return null;var u=Object.keys(a).join("|"),r=e.breadcrumbName.replace(new RegExp(":(".concat(u,")"),"g"),function(s,m){return a[m]||s});return r}function w(e){var a=e.route,u=e.params,r=e.routes,s=e.paths,m=r.indexOf(a)===r.length-1,i=X(a,u);return m?l("span",null,[i]):l("a",{href:"#/".concat(s.join("/"))},[i])}var R=j({name:"ABreadcrumb",props:Q,slots:["separator","itemRender"],setup:function(a,u){var r=u.slots,s=I("breadcrumb",a),m=s.prefixCls,i=s.direction,v=function(t,n){return t=(t||"").replace(/^\//,""),Object.keys(n).forEach(function(c){t=t.replace(":".concat(c),n[c])}),t},y=function(t,n,c){var b=J(t),f=v(n||"",c);return f&&b.push(f),b},p=function(t){var n=t.routes,c=n===void 0?[]:n,b=t.params,f=b===void 0?{}:b,B=t.separator,_=t.itemRender,A=_===void 0?w:_,O=[];return c.map(function(d){var g=v(d.path,f);g&&O.push(g);var k=[].concat(O),E=null;return d.children&&d.children.length&&(E=l(S,null,{default:function(){return[d.children.map(function(P){return l(S.Item,{key:P.path||P.breadcrumbName},{default:function(){return[A({route:P,params:f,routes:c,paths:y(k,P.path,f)})]}})})]}})),l(N,{overlay:E,separator:B,key:g||d.breadcrumbName},{default:function(){return[A({route:d,params:f,routes:c,paths:k})]}})})};return function(){var o,t,n,c=a.routes,b=a.params,f=b===void 0?{}:b,B=M(C(r,a)),_=(t=C(r,a,"separator"))!==null&&t!==void 0?t:"/",A=a.itemRender||r.itemRender||w;c&&c.length>0?n=p({routes:c,params:f,separator:_,itemRender:A}):B.length&&(n=B.map(function(d,g){return $(V(d.type)==="object"&&(d.type.__ANT_BREADCRUMB_ITEM||d.type.__ANT_BREADCRUMB_SEPARATOR),"Breadcrumb","Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children"),G(d,{separator:_,key:g})}));var O=(o={},T(o,m.value,!0),T(o,"".concat(m.value,"-rtl"),i.value==="rtl"),o);return l("div",{class:O},[n])}}}),Y=globalThis&&globalThis.__rest||function(e,a){var u={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(u[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(e);s<r.length;s++)a.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(u[r[s]]=e[r[s]]);return u},q={prefixCls:h.string},x=j({name:"ABreadcrumbSeparator",__ANT_BREADCRUMB_SEPARATOR:!0,inheritAttrs:!1,props:q,setup:function(a,u){var r=u.slots,s=u.attrs,m=I("breadcrumb",a),i=m.prefixCls;return function(){var v;s.separator;var y=s.class,p=Y(s,["separator","class"]),o=M((v=r.default)===null||v===void 0?void 0:v.call(r));return l("span",K({class:["".concat(i.value,"-separator"),y]},p),[o.length>0?o:"/"])}}});R.Item=N;R.Separator=x;R.install=function(e){return e.component(R.name,R),e.component(N.name,N),e.component(x.name,x),e};export{R as B};