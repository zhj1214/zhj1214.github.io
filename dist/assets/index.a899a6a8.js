import{av as _,a as f,dp as C,s as A,fq as r,f as m,ax as o,o as S,j as B,z as s,n as t,m as a,t as p,B as n}from"./index.a37e80f2.js";import{A as D}from"./index.fb15056d.js";import{S as R}from"./index.a6b95ad2.js";import{P as g}from"./index.1b1bb39e.js";import y from"./CurrentPermissionMode.1d4ab719.js";import"./useFlexGapSupport.0e4bc511.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";import"./index.b5a022bb.js";const P=f({components:{Space:R,Alert:D,CurrentPermissionMode:y,PageWrapper:g},setup(){const{changeRole:u}=C(),e=A();return{userStore:e,RoleEnum:r,isSuper:m(()=>e.getRoleList.includes(r.SUPER)),isTest:m(()=>e.getRoleList.includes(r.TEST)),changeRole:u}}}),v=n(" \u5F53\u524D\u89D2\u8272: "),T={class:"mt-4"},$=n(" \u6743\u9650\u5207\u6362(\u8BF7\u5148\u5207\u6362\u6743\u9650\u6A21\u5F0F\u4E3A\u524D\u7AEF\u89D2\u8272\u6743\u9650\u6A21\u5F0F): ");function h(u,e,k,U,L,M){const l=o("CurrentPermissionMode"),c=o("Alert"),i=o("a-button"),d=o("Space"),E=o("PageWrapper");return S(),B(E,{title:"\u524D\u7AEF\u6743\u9650\u793A\u4F8B",contentBackground:"",contentClass:"p-4",content:"\u7531\u4E8E\u5237\u65B0\u7684\u65F6\u5019\u4F1A\u8BF7\u6C42\u7528\u6237\u4FE1\u606F\u63A5\u53E3\uFF0C\u4F1A\u6839\u636E\u63A5\u53E3\u91CD\u7F6E\u89D2\u8272\u4FE1\u606F\uFF0C\u6240\u4EE5\u5237\u65B0\u540E\u754C\u9762\u4F1A\u6062\u590D\u539F\u6837\uFF0C\u5982\u679C\u4E0D\u9700\u8981\uFF0C\u53EF\u4EE5\u6CE8\u91CA src/layout/default/index\u5185\u7684\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u63A5\u53E3"},{default:s(()=>[t(l),a("p",null,[v,a("a",null,p(u.userStore.getRoleList),1)]),t(c,{class:"mt-4",type:"info",message:"\u70B9\u51FB\u540E\u8BF7\u67E5\u770B\u5DE6\u4FA7\u83DC\u5355\u53D8\u5316","show-icon":""}),a("div",T,[$,t(d,null,{default:s(()=>[t(i,{onClick:e[0]||(e[0]=F=>u.changeRole(u.RoleEnum.SUPER)),type:u.isSuper?"primary":"default"},{default:s(()=>[n(p(u.RoleEnum.SUPER),1)]),_:1},8,["type"]),t(i,{onClick:e[1]||(e[1]=F=>u.changeRole(u.RoleEnum.TEST)),type:u.isTest?"primary":"default"},{default:s(()=>[n(p(u.RoleEnum.TEST),1)]),_:1},8,["type"])]),_:1})])]),_:1})}var X=_(P,[["render",h],["__scopeId","data-v-05d085c9"]]);export{X as default};
