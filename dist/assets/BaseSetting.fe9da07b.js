var d=(o,s,r)=>new Promise((c,i)=>{var l=e=>{try{a(r.next(e))}catch(m){i(m)}},t=e=>{try{a(r.throw(e))}catch(m){i(m)}},a=e=>e.done?c(e.value):Promise.resolve(e.value).then(l,t);a((r=r.apply(o,s)).next())});import{a as v,cC as h,C as B,s as F,N as g,f as A,av as b,E as I,ax as p,o as S,j as w,z as u,n,m as _,f8 as y,f9 as E,B as R}from"./index.a37e80f2.js";/* empty css               */import{B as k}from"./BasicForm.b57aee2b.js";import{u as x}from"./useForm.9f6c5426.js";import{a as N}from"./index.5142eb36.js";import{h as U}from"./header.d801b988.js";import{a as V}from"./account.388c8a85.js";import{b as $}from"./data.08d7c751.js";import{u as M}from"./upload.3d110360.js";import{R as T,C as j}from"./index.c704f8df.js";/* empty css              */import"./index.b5a022bb.js";import"./index.ac42b924.js";import"./Checkbox.a1d5dd4d.js";import"./index.33ff102e.js";import"./index.03a59885.js";import"./index.80ce27aa.js";import"./index.d4b3cfad.js";import"./index.ae091066.js";import"./get.c61c1800.js";import"./index.9208870e.js";import"./index.959bd454.js";import"./_baseIteratee.c7363f5d.js";import"./DeleteOutlined.685854af.js";import"./index.46d8a2cc.js";import"./useRefs.9eeff60f.js";import"./Form.8b781897.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useSize.63f886e3.js";import"./index.a6b95ad2.js";import"./index.2833acfd.js";import"./useWindowSizeFn.9407d2b5.js";import"./FullscreenOutlined.913c05e0.js";import"./index.fb15056d.js";import"./index.dfa24be2.js";import"./uuid.2b29000c.js";import"./download.b604d2f7.js";import"./base64Conver.08b9f4ec.js";import"./index.bd94130a.js";import"./uniqBy.a2b21835.js";import"./index.6d0b2f34.js";import"./eagerComputed.4d6ef9e3.js";import"./index.55ab06a5.js";const z=v({components:{BasicForm:k,CollapseContainer:h,Button:B,ARow:T,ACol:j,CropperAvatar:N},setup(){const{createMessage:o}=I(),s=F(),[r,{setFieldsValue:c}]=x({labelWidth:120,schemas:$,showActionButtonGroup:!1});g(()=>d(this,null,function*(){const t=yield V();c(t)}));const i=A(()=>{const{avatar:t}=s.getUserInfo;return t||U});function l(t){const a=s.getUserInfo;a.avatar=t,s.setUserInfo(a)}return{avatar:i,register:r,uploadApi:M,updateAvatar:l,handleSubmit:()=>{o.success("\u66F4\u65B0\u6210\u529F\uFF01")}}}}),G=o=>(y("data-v-249137cb"),o=o(),E(),o),P={class:"change-avatar"},W=G(()=>_("div",{class:"mb-2"},"\u5934\u50CF",-1)),q=R(" \u66F4\u65B0\u57FA\u672C\u4FE1\u606F ");function D(o,s,r,c,i,l){const t=p("BasicForm"),a=p("a-col"),e=p("CropperAvatar"),m=p("a-row"),f=p("Button"),C=p("CollapseContainer");return S(),w(C,{title:"\u57FA\u672C\u8BBE\u7F6E",canExpan:!1},{default:u(()=>[n(m,{gutter:24},{default:u(()=>[n(a,{span:14},{default:u(()=>[n(t,{onRegister:o.register},null,8,["onRegister"])]),_:1}),n(a,{span:10},{default:u(()=>[_("div",P,[W,n(e,{uploadApi:o.uploadApi,value:o.avatar,btnText:"\u66F4\u6362\u5934\u50CF",btnProps:{preIcon:"ant-design:cloud-upload-outlined"},onChange:o.updateAvatar,width:"150"},null,8,["uploadApi","value","onChange"])])]),_:1})]),_:1}),n(f,{type:"primary",onClick:o.handleSubmit},{default:u(()=>[q]),_:1},8,["onClick"])]),_:1})}var To=b(z,[["render",D],["__scopeId","data-v-249137cb"]]);export{To as default};
