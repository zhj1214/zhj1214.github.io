import{B as l}from"./TableImg.73178ea8.js";import{i as s}from"./BasicForm.b57aee2b.js";import{u as d}from"./useTable.ee87696d.js";import{d as c}from"./table.42354dae.js";import{av as F,a as h,ax as r,o as b,h as f,n as a,z as A}from"./index.a37e80f2.js";import"./index.ac42b924.js";import"./Checkbox.a1d5dd4d.js";import"./index.33ff102e.js";import"./index.9208870e.js";import"./useForm.9f6c5426.js";import"./index.1b1bb39e.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";import"./index.80ce27aa.js";import"./index.d4b3cfad.js";import"./index.03a59885.js";import"./uuid.2b29000c.js";import"./index.959bd454.js";import"./_baseIteratee.c7363f5d.js";import"./get.c61c1800.js";import"./DeleteOutlined.685854af.js";import"./index.46d8a2cc.js";import"./useRefs.9eeff60f.js";import"./Form.8b781897.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./index.2833acfd.js";import"./FullscreenOutlined.913c05e0.js";import"./index.b5a022bb.js";import"./sortable.esm.2632adaa.js";import"./RedoOutlined.0621d16e.js";import"./index.dfa24be2.js";import"./scrollTo.122d6a3f.js";import"./index.ff6c102c.js";/* empty css              *//* empty css               */import"./index.ae091066.js";import"./index.a6b95ad2.js";import"./index.fb15056d.js";import"./download.b604d2f7.js";import"./base64Conver.08b9f4ec.js";import"./index.bd94130a.js";import"./index.c704f8df.js";import"./uniqBy.a2b21835.js";const B=[{title:"\u7F16\u53F7",dataIndex:"no",width:100},{title:"\u59D3\u540D",dataIndex:"name",auth:"test"},{title:"\u72B6\u6001",dataIndex:"status"},{title:"\u5730\u5740",dataIndex:"address",auth:"super",ifShow:t=>!0},{title:"\u5F00\u59CB\u65F6\u95F4",dataIndex:"beginTime"},{title:"\u7ED3\u675F\u65F6\u95F4",dataIndex:"endTime",width:200}],C=h({components:{BasicTable:l,TableAction:s},setup(){const[t]=d({title:"TableAction\u7EC4\u4EF6\u53CA\u56FA\u5B9A\u5217\u793A\u4F8B",api:c,columns:B,bordered:!0,actionColumn:{width:250,title:"Action",dataIndex:"action",slots:{customRender:"action"}}});function e(i){}function n(i){}function u(i){}return{registerTable:t,handleEdit:e,handleDelete:n,handleOpen:u}}}),T={class:"p-4"};function _(t,e,n,u,i,w){const p=r("TableAction"),m=r("BasicTable");return b(),f("div",T,[a(m,{onRegister:t.registerTable},{action:A(({record:o})=>[a(p,{actions:[{label:"\u7F16\u8F91",onClick:t.handleEdit.bind(null,o),auth:"other"},{label:"\u5220\u9664",icon:"ic:outline-delete-outline",onClick:t.handleDelete.bind(null,o),auth:"super"}],dropDownActions:[{label:"\u542F\u7528",popConfirm:{title:"\u662F\u5426\u542F\u7528\uFF1F",confirm:t.handleOpen.bind(null,o)},ifShow:E=>o.status!=="enable"},{label:"\u7981\u7528",popConfirm:{title:"\u662F\u5426\u7981\u7528\uFF1F",confirm:t.handleOpen.bind(null,o)},ifShow:()=>o.status==="enable"},{label:"\u540C\u65F6\u63A7\u5236",popConfirm:{title:"\u662F\u5426\u52A8\u6001\u663E\u793A\uFF1F",confirm:t.handleOpen.bind(null,o)},auth:"super",ifShow:()=>!0}]},null,8,["actions","dropDownActions"])]),_:1},8,["onRegister"])])}var _t=F(C,[["render",_]]);export{_t as default};
