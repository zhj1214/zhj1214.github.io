var F=(u,s,e)=>new Promise((i,m)=>{var d=t=>{try{o(e.next(t))}catch(a){m(a)}},p=t=>{try{o(e.throw(t))}catch(a){m(a)}},o=t=>t.done?i(t.value):Promise.resolve(t.value).then(d,p);o((e=e.apply(u,s)).next())});import{P as B}from"./index.1b1bb39e.js";import{av as C,a as f,s as E,ax as c,o as D,j as A,z as r,n,B as l,m as g}from"./index.a37e80f2.js";import{t as k}from"./account.388c8a85.js";import{C as _}from"./index.4f193558.js";import"./index.7e85020a.js";/* empty css               */import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";import"./index.a29fe7c0.js";import"./index.c704f8df.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useRefs.9eeff60f.js";import"./PlusOutlined.9619b07a.js";const x=f({name:"TestSessionTimeout",components:{ACardGrid:_.Grid,ACard:_,PageWrapper:B},setup(){const u=E();function s(){return F(this,null,function*(){u.setToken(void 0),u.setSessionTimeout(!0)})}function e(){return F(this,null,function*(){try{yield k()}catch(i){i.message}})}return{test1:s,test2:e}}}),y=l("HttpStatus == 401"),h=g("span",null,null,-1),T=l("Response.code == 401");function S(u,s,e,i,m,d){const p=c("a-button"),o=c("a-card-grid"),t=c("a-card"),a=c("PageWrapper");return D(),A(a,{title:"\u767B\u5F55\u8FC7\u671F\u793A\u4F8B",content:"\u7528\u6237\u767B\u5F55\u8FC7\u671F\u793A\u4F8B\uFF0C\u4E0D\u518D\u8DF3\u8F6C\u767B\u5F55\u9875\uFF0C\u76F4\u63A5\u751F\u6210\u9875\u9762\u8986\u76D6\u5F53\u524D\u9875\u9762\uFF0C\u65B9\u4FBF\u4FDD\u6301\u8FC7\u671F\u524D\u7684\u7528\u6237\u72B6\u6001\uFF01"},{default:r(()=>[n(t,{title:"\u8BF7\u70B9\u51FB\u4E0B\u9762\u7684\u6309\u94AE\u8BBF\u95EE\u6D4B\u8BD5\u63A5\u53E3",extra:"\u6240\u8BBF\u95EE\u7684\u63A5\u53E3\u4F1A\u8FD4\u56DEToken\u8FC7\u671F\u54CD\u5E94"},{default:r(()=>[n(o,{style:{width:"50%","text-align":"center"}},{default:r(()=>[n(p,{type:"primary",onClick:u.test1},{default:r(()=>[y]),_:1},8,["onClick"])]),_:1}),n(o,{style:{width:"50%","text-align":"center"}},{default:r(()=>[h,n(p,{class:"ml-4",type:"primary",onClick:u.test2},{default:r(()=>[T]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})}var X=C(x,[["render",S]]);export{X as default};