var c=(n,o,u)=>new Promise((_,t)=>{var r=e=>{try{a(u.next(e))}catch(s){t(s)}},l=e=>{try{a(u.throw(e))}catch(s){t(s)}},a=e=>e.done?_(e.value):Promise.resolve(e.value).then(r,l);a((u=u.apply(n,o)).next())});import{a as i,ax as d,o as p,h as B,n as F,z as C,B as m,m as h,fh as x}from"./index.a37e80f2.js";const f={class:"request-box"},D=m(" \u70B9\u51FB\u4F1A\u91CD\u65B0\u53D1\u8D77\u8BF7\u6C425\u6B21 "),k=h("p",null,"\u6253\u5F00\u6D4F\u89C8\u5668\u7684network\u9762\u677F\uFF0C\u53EF\u4EE5\u770B\u5230\u53D1\u51FA\u4E86\u516D\u6B21\u8BF7\u6C42",-1),E=i({setup(n){const o=()=>c(this,null,function*(){yield x()});return(u,_)=>{const t=d("a-button");return p(),B("div",f,[F(t,{onClick:o,color:"primary"},{default:C(()=>[D]),_:1}),k])}}});export{E as default};