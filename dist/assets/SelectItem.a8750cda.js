import{av as i,a as r,cU as l,b as p,f as m,ax as d,o as c,h as u,m as f,t as g,n as _,ay as v,q as b}from"./index.a37e80f2.js";import{b as y}from"./index.72659d34.js";import"./index.67b4236e.js";import"./index.2a7c5e2e.js";import"./ArrowLeftOutlined.90405055.js";import"./index.b5a022bb.js";import"./index.f3a31f75.js";import"./FullscreenOutlined.913c05e0.js";import"./index.3baca1e8.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./uniqBy.a2b21835.js";import"./_baseIteratee.c7363f5d.js";import"./get.c61c1800.js";import"./index.7e85020a.js";import"./useRefs.9eeff60f.js";import"./PlusOutlined.9619b07a.js";import"./RedoOutlined.0621d16e.js";import"./index.a29fe7c0.js";import"./lock.4ff8f7c3.js";const C=r({name:"SelectItem",components:{Select:l},props:{event:{type:Number},disabled:{type:Boolean},title:{type:String},def:{type:[String,Number]},initValue:{type:[String,Number]},options:{type:Array,default:()=>[]}},setup(e){const{prefixCls:t}=p("setting-select-item"),a=m(()=>e.def?{value:e.def,defaultValue:e.initValue||e.def}:{});function o(n){e.event&&y(e.event,n)}return{prefixCls:t,handleChange:o,getBindValue:a}}});function S(e,t,a,o,n,h){const s=d("Select");return c(),u("div",{class:b(e.prefixCls)},[f("span",null,g(e.title),1),_(s,v(e.getBindValue,{class:`${e.prefixCls}-select`,onChange:e.handleChange,disabled:e.disabled,size:"small",options:e.options}),null,16,["class","onChange","disabled","options"])],2)}var K=i(C,[["render",S],["__scopeId","data-v-6707e46b"]]);export{K as default};
