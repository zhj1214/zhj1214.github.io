import{av as F,a as y,ax as t,o as E,j as A,z as p,n as r,B as a}from"./index.a37e80f2.js";import{A as R}from"./index.fb15056d.js";import{u as s}from"./index.67b4236e.js";import k from"./Drawer1.156845ab.js";import B from"./Drawer2.d3a7edc0.js";import $ from"./Drawer3.2d0c6fa2.js";import h from"./Drawer4.17a03b0c.js";import v from"./Drawer5.49b68886.js";import{P}from"./index.1b1bb39e.js";import"./index.2a7c5e2e.js";import"./ArrowLeftOutlined.90405055.js";import"./BasicForm.b57aee2b.js";/* empty css              *//* empty css               */import"./index.b5a022bb.js";import"./index.ac42b924.js";import"./Checkbox.a1d5dd4d.js";import"./index.33ff102e.js";import"./index.03a59885.js";import"./index.80ce27aa.js";import"./index.d4b3cfad.js";import"./index.ae091066.js";import"./get.c61c1800.js";import"./index.9208870e.js";import"./index.959bd454.js";import"./_baseIteratee.c7363f5d.js";import"./DeleteOutlined.685854af.js";import"./index.46d8a2cc.js";import"./useRefs.9eeff60f.js";import"./Form.8b781897.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useSize.63f886e3.js";import"./index.a6b95ad2.js";import"./index.2833acfd.js";import"./useWindowSizeFn.9407d2b5.js";import"./FullscreenOutlined.913c05e0.js";import"./index.dfa24be2.js";import"./uuid.2b29000c.js";import"./download.b604d2f7.js";import"./base64Conver.08b9f4ec.js";import"./index.bd94130a.js";import"./index.c704f8df.js";import"./uniqBy.a2b21835.js";import"./useForm.9f6c5426.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./eagerComputed.4d6ef9e3.js";import"./useContentViewHeight.df49acbe.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";const W=y({components:{Alert:R,PageWrapper:P,Drawer1:k,Drawer2:B,Drawer3:$,Drawer4:h,Drawer5:v},setup(){const[e,{openDrawer:o,setDrawerProps:u}]=s(),[g,{openDrawer:f}]=s(),[d,{openDrawer:n}]=s(),[i,{openDrawer:m}]=s(),[w,{openDrawer:D}]=s();function l(){m(!0,{data:"content",info:"Info"})}function c(){o(),u({loading:!0}),setTimeout(()=>{u({loading:!1})},2e3)}return{register1:e,openDrawer1:o,register2:g,openDrawer2:f,register3:d,openDrawer3:n,register4:i,register5:w,openDrawer5:D,send:l,openDrawerLoading:c}}}),b=a(" \u6253\u5F00Drawer "),L=a(" \u6253\u5F00Drawer "),N=a(" \u6253\u5F00Drawer "),T=a(" \u6253\u5F00Drawer\u5E76\u4F20\u9012\u6570\u636E "),V=a(" \u6253\u5F00\u8BE6\u60C5Drawer ");function j(e,o,u,g,f,d){const n=t("Alert"),i=t("a-button"),m=t("Drawer1"),w=t("Drawer2"),D=t("Drawer3"),l=t("Drawer4"),c=t("Drawer5"),C=t("PageWrapper");return E(),A(C,{title:"\u62BD\u5C49\u7EC4\u4EF6\u4F7F\u7528\u793A\u4F8B"},{default:p(()=>[r(n,{message:"\u4F7F\u7528 useDrawer \u8FDB\u884C\u62BD\u5C49\u64CD\u4F5C","show-icon":""}),r(i,{type:"primary",class:"my-4",onClick:e.openDrawerLoading},{default:p(()=>[b]),_:1},8,["onClick"]),r(n,{message:"\u5185\u5916\u540C\u65F6\u63A7\u5236\u663E\u793A\u9690\u85CF","show-icon":""}),r(i,{type:"primary",class:"my-4",onClick:o[0]||(o[0]=_=>e.openDrawer2(!0))},{default:p(()=>[L]),_:1}),r(n,{message:"\u81EA\u9002\u5E94\u9AD8\u5EA6/\u663E\u793Afooter","show-icon":""}),r(i,{type:"primary",class:"my-4",onClick:o[1]||(o[1]=_=>e.openDrawer3(!0))},{default:p(()=>[N]),_:1}),r(n,{message:"\u5185\u5916\u6570\u636E\u4EA4\u4E92","show-icon":""}),r(i,{type:"primary",class:"my-4",onClick:e.send},{default:p(()=>[T]),_:1},8,["onClick"]),r(n,{message:"\u8BE6\u60C5\u9875\u6A21\u5F0F","show-icon":""}),r(i,{type:"primary",class:"my-4",onClick:o[2]||(o[2]=_=>e.openDrawer5(!0))},{default:p(()=>[V]),_:1}),r(m,{onRegister:e.register1},null,8,["onRegister"]),r(w,{onRegister:e.register2},null,8,["onRegister"]),r(D,{onRegister:e.register3},null,8,["onRegister"]),r(l,{onRegister:e.register4},null,8,["onRegister"]),r(c,{onRegister:e.register5},null,8,["onRegister"])]),_:1})}var Tr=F(W,[["render",j]]);export{Tr as default};
