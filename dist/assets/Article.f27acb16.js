import{a as $,b5 as k,av as x,ax as n,o as s,j as c,z as r,h as p,aA as m,F as _,q as o,n as y,m as l,t as i,B as d,k as g}from"./index.a37e80f2.js";import{L as u}from"./index.8cb7adb8.js";/* empty css               */import{T as B}from"./index.03a59885.js";import{articleList as T,actions as M}from"./data.48818b04.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./eagerComputed.4d6ef9e3.js";const N=$({components:{List:u,ListItem:u.Item,ListItemMeta:u.Item.Meta,Tag:B,Icon:k},setup(){return{prefixCls:"account-center-article",list:T,actions:M}}});function V(e,h,A,b,z,F){const f=n("Tag"),v=n("ListItemMeta"),C=n("Icon"),I=n("ListItem"),L=n("List");return s(),c(L,{"item-layout":"vertical",class:o(e.prefixCls)},{default:r(()=>[(s(!0),p(_,null,m(e.list,a=>(s(),c(I,{key:a.title},{default:r(()=>[y(v,null,{description:r(()=>[l("div",{class:o(`${e.prefixCls}__content`)},i(a.content),3)]),title:r(()=>[l("p",{class:o(`${e.prefixCls}__title`)},i(a.title),3),l("div",null,[(s(!0),p(_,null,m(a.description,t=>(s(),c(f,{key:t,class:"mb-2"},{default:r(()=>[d(i(t),1)]),_:2},1024))),128))])]),_:2},1024),l("div",null,[(s(!0),p(_,null,m(e.actions,t=>(s(),p("div",{key:t.text,class:o(`${e.prefixCls}__action`)},[t.icon?(s(),c(C,{key:0,class:o(`${e.prefixCls}__action-icon`),icon:t.icon,color:t.color},null,8,["class","icon","color"])):g("",!0),d(" "+i(t.text),1)],2))),128)),l("span",{class:o(`${e.prefixCls}__time`)},i(a.time),3)])]),_:2},1024))),128))]),_:1},8,["class"])}var J=x(N,[["render",V],["__scopeId","data-v-67062fde"]]);export{J as default};
