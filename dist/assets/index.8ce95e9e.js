import{a,v as r,fi as m,N as _,o as c,h as k,aB as f,aE as C,av as v,ax as i,j as O,z as s,n as x,m as B,t as E}from"./index.a37e80f2.js";import{P as S}from"./index.1b1bb39e.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";const $=a({emits:["mounted","clickOutside"],setup(e,{emit:t}){const n=r(null);return m(n,()=>{t("clickOutside")}),_(()=>{t("mounted")}),(o,l)=>(c(),k("div",{ref_key:"wrap",ref:n},[f(o.$slots,"default")],512))}}),g=C($);const h=a({components:{ClickOutSide:g,PageWrapper:S},setup(){const e=r("Click");function t(){e.value="Click Out Side"}function n(){e.value="Click Inner"}return{innerClick:n,handleClickOutside:t,text:e}}});function y(e,t,n,o,l,w){const u=i("ClickOutSide"),p=i("PageWrapper");return c(),O(p,{title:"\u70B9\u5185\u5916\u90E8\u89E6\u53D1\u4E8B\u4EF6"},{default:s(()=>[x(u,{onClickOutside:e.handleClickOutside,class:"flex justify-center"},{default:s(()=>[B("div",{onClick:t[0]||(t[0]=(...d)=>e.innerClick&&e.innerClick(...d)),class:"demo-box"},E(e.text),1)]),_:1},8,["onClickOutside"])]),_:1})}var q=v(h,[["render",y],["__scopeId","data-v-6c56edd4"]]);export{q as default};