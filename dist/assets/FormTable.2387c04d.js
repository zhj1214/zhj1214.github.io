import{B as g}from"./TableImg.73178ea8.js";import"./BasicForm.b57aee2b.js";import{u as h}from"./useTable.ee87696d.js";import{getBasicColumns as _,getFormConfig as F}from"./tableData.0a246808.js";import{av as k,a as y,v as B,ax as i,o as m,j as C,z as e,n as s,h as c,m as b,t as E,F as T,B as p}from"./index.a37e80f2.js";import{A}from"./index.fb15056d.js";import{d as S}from"./table.42354dae.js";import"./index.ac42b924.js";import"./Checkbox.a1d5dd4d.js";import"./index.33ff102e.js";import"./index.9208870e.js";import"./useForm.9f6c5426.js";import"./index.1b1bb39e.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";import"./index.80ce27aa.js";import"./index.d4b3cfad.js";import"./index.03a59885.js";import"./uuid.2b29000c.js";import"./index.959bd454.js";import"./_baseIteratee.c7363f5d.js";import"./get.c61c1800.js";import"./DeleteOutlined.685854af.js";import"./index.46d8a2cc.js";import"./useRefs.9eeff60f.js";import"./Form.8b781897.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./index.2833acfd.js";import"./FullscreenOutlined.913c05e0.js";import"./index.b5a022bb.js";import"./sortable.esm.2632adaa.js";import"./RedoOutlined.0621d16e.js";import"./index.dfa24be2.js";import"./scrollTo.122d6a3f.js";import"./index.ff6c102c.js";/* empty css              *//* empty css               */import"./index.ae091066.js";import"./index.a6b95ad2.js";import"./download.b604d2f7.js";import"./base64Conver.08b9f4ec.js";import"./index.bd94130a.js";import"./index.c704f8df.js";import"./uniqBy.a2b21835.js";const D=y({components:{BasicTable:g,AAlert:A},setup(){const o=B([]),[t,{getForm:n}]=h({title:"\u5F00\u542F\u641C\u7D22\u533A\u57DF",api:S,columns:_(),useSearchForm:!0,formConfig:F(),showTableSetting:!0,tableSetting:{fullScreen:!0},showIndexColumn:!1,rowKey:"id"});function a(){n().getFieldsValue()}function u(r){o.value=r}return{registerTable:t,getFormValues:a,checkedKeys:o,onSelectChange:u}}}),w=p(" custom-slot "),v=p("\u6E05\u7A7A"),K={key:1},V=p("\u83B7\u53D6\u8868\u5355\u6570\u636E");function $(o,t,n,a,u,r){const l=i("a-button"),d=i("a-alert"),f=i("BasicTable");return m(),C(f,{onRegister:o.registerTable,rowSelection:{type:"checkbox",selectedRowKeys:o.checkedKeys,onChange:o.onSelectChange}},{"form-custom":e(()=>[w]),headerTop:e(()=>[s(d,{type:"info","show-icon":""},{message:e(()=>[o.checkedKeys.length>0?(m(),c(T,{key:0},[b("span",null,"\u5DF2\u9009\u4E2D"+E(o.checkedKeys.length)+"\u6761\u8BB0\u5F55(\u53EF\u8DE8\u9875)",1),s(l,{type:"link",onClick:t[0]||(t[0]=N=>o.checkedKeys=[]),size:"small"},{default:e(()=>[v]),_:1})],64)):(m(),c("span",K,"\u672A\u9009\u4E2D\u4EFB\u4F55\u9879\u76EE"))]),_:1})]),toolbar:e(()=>[s(l,{type:"primary",onClick:o.getFormValues},{default:e(()=>[V]),_:1},8,["onClick"])]),_:1},8,["onRegister","rowSelection"])}var No=k(D,[["render",$]]);export{No as default};