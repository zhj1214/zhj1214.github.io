import{a as ft,cM as bt,G as o,J as yt,Q as gt,S as u,n as t,c4 as _t,aB as pt,cA as W,cN as ht,cO as Ct}from"./index.a37e80f2.js";import"./index.a29fe7c0.js";import{R as g,C as v}from"./index.c704f8df.js";import{T as q}from"./index.7e85020a.js";var xt=q.TabPane,Tt=function(){return{prefixCls:o.string,title:o.any,extra:o.any,bordered:o.looseBool.def(!0),bodyStyle:o.style,headStyle:o.style,loading:o.looseBool.def(!1),hoverable:o.looseBool.def(!1),type:{type:String},size:{type:String},actions:o.any,tabList:{type:Array},tabBarExtraContent:o.any,activeTabKey:o.string,defaultActiveTabKey:o.string,cover:o.any,onTabChange:{type:Function}}},mt=ft({name:"ACard",mixins:[bt],props:Tt(),slots:["title","extra","tabBarExtraContent","actions","cover","customTab"],setup:function(e,U){var r=U.slots,h=yt("card",e),X=h.prefixCls,Y=h.direction,P=h.size,Z=function(i){var d=i.map(function(c,f){return W(c)&&!ht(c)||!W(c)?t("li",{style:{width:"".concat(100/i.length,"%")},key:"action-".concat(f)},[t("span",null,[c])]):null});return d},tt=function(i){var d;(d=e.onTabChange)===null||d===void 0||d.call(e,i)},at=function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],d;return i.forEach(function(c){c&&Ct(c.type)&&c.type.__ANT_CARD_GRID&&(d=!0)}),d};return function(){var l,i,d,c,f,C,x,T,K=e.headStyle,et=K===void 0?{}:K,$=e.bodyStyle,m=$===void 0?{}:$,k=e.loading,G=e.bordered,nt=G===void 0?!0:G,L=e.type,b=e.tabList,rt=e.hoverable,R=e.activeTabKey,lt=e.defaultActiveTabKey,j=e.tabBarExtraContent,z=j===void 0?(d=r.tabBarExtraContent)===null||d===void 0?void 0:d.call(r):j,D=e.title,S=D===void 0?(c=r.title)===null||c===void 0?void 0:c.call(r):D,N=e.extra,B=N===void 0?(f=r.extra)===null||f===void 0?void 0:f.call(r):N,w=e.actions,A=w===void 0?(C=r.actions)===null||C===void 0?void 0:C.call(r):w,I=e.cover,M=I===void 0?(x=r.cover)===null||x===void 0?void 0:x.call(r):I,_=gt((T=r.default)===null||T===void 0?void 0:T.call(r)),a=X.value,ot=(l={},u(l,"".concat(a),!0),u(l,"".concat(a,"-loading"),k),u(l,"".concat(a,"-bordered"),nt),u(l,"".concat(a,"-hoverable"),!!rt),u(l,"".concat(a,"-contain-grid"),at(_)),u(l,"".concat(a,"-contain-tabs"),b&&b.length),u(l,"".concat(a,"-").concat(P.value),P.value),u(l,"".concat(a,"-type-").concat(L),!!L),u(l,"".concat(a,"-rtl"),Y.value==="rtl"),l),it=m.padding===0||m.padding==="0px"?{padding:"24px"}:void 0,s=t("div",{class:"".concat(a,"-loading-block")},null),dt=t("div",{class:"".concat(a,"-loading-content"),style:it},[t(g,{gutter:8},{default:function(){return[t(v,{span:22},{default:function(){return[s]}})]}}),t(g,{gutter:8},{default:function(){return[t(v,{span:8},{default:function(){return[s]}}),t(v,{span:15},{default:function(){return[s]}})]}}),t(g,{gutter:8},{default:function(){return[t(v,{span:6},{default:function(){return[s]}}),t(v,{span:18},{default:function(){return[s]}})]}}),t(g,{gutter:8},{default:function(){return[t(v,{span:13},{default:function(){return[s]}}),t(v,{span:9},{default:function(){return[s]}})]}}),t(g,{gutter:8},{default:function(){return[t(v,{span:4},{default:function(){return[s]}}),t(v,{span:3},{default:function(){return[s]}}),t(v,{span:16},{default:function(){return[s]}})]}})]),O=R!==void 0,ct=(i={size:"large"},u(i,O?"activeKey":"defaultActiveKey",O?R:lt),u(i,"onChange",tt),u(i,"class","".concat(a,"-head-tabs")),i),V,F=b&&b.length?t(q,ct,{default:function(){return[b.map(function(n){var J=n.tab,p=n.slots,Q=p==null?void 0:p.tab;_t(!p,"Card","tabList slots is deprecated, Please use `customTab` instead.");var E=J!==void 0?J:r[Q]?r[Q](n):null;return E=pt(r,"customTab",n,function(){return[E]}),t(xt,{tab:E,key:n.key,disabled:n.disabled},null)})]},rightExtra:z?function(){return z}:null}):null;(S||B||F)&&(V=t("div",{class:"".concat(a,"-head"),style:et},[t("div",{class:"".concat(a,"-head-wrapper")},[S&&t("div",{class:"".concat(a,"-head-title")},[S]),B&&t("div",{class:"".concat(a,"-extra")},[B])]),F]));var ut=M?t("div",{class:"".concat(a,"-cover")},[M]):null,st=t("div",{class:"".concat(a,"-body"),style:m},[k?dt:_]),vt=A&&A.length?t("ul",{class:"".concat(a,"-actions")},[Z(A)]):null;return t("div",{class:ot,ref:"cardContainerRef"},[V,ut,_&&_.length?st:null,vt])}}}),Pt=mt;export{Pt as C};