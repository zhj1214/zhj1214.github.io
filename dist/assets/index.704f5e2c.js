var E=(b,m,t)=>new Promise((e,p)=>{var u=r=>{try{a(t.next(r))}catch(s){p(s)}},f=r=>{try{a(t.throw(r))}catch(s){p(s)}},a=r=>r.done?e(r.value):Promise.resolve(r.value).then(u,f);a((t=t.apply(b,m)).next())});import{dC as C,a as k,v as L,c as T,fo as A,a7 as D,al as R,ah as B,ax as I,o as g,h as _,F as S,aA as V,x as M,y as j,n as i,i as o,z as n,B as y,t as h}from"./index.a37e80f2.js";import F from"./DetailModal.2758f2a1.js";import{B as N}from"./TableImg.73178ea8.js";import{i as $}from"./BasicForm.b57aee2b.js";import{u as z}from"./useTable.ee87696d.js";import{b as H}from"./index.2833acfd.js";import{getColumns as q}from"./data.3adfdbe3.js";import"./index.d6226a26.js";import"./index.700d3898.js";import"./get.c61c1800.js";import"./useDescription.352cad85.js";import"./index.ac42b924.js";import"./Checkbox.a1d5dd4d.js";import"./index.33ff102e.js";import"./index.9208870e.js";import"./useForm.9f6c5426.js";import"./index.1b1bb39e.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";import"./index.80ce27aa.js";import"./index.d4b3cfad.js";import"./index.03a59885.js";import"./uuid.2b29000c.js";import"./index.959bd454.js";import"./_baseIteratee.c7363f5d.js";import"./DeleteOutlined.685854af.js";import"./index.46d8a2cc.js";import"./useRefs.9eeff60f.js";import"./Form.8b781897.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./index.b5a022bb.js";import"./sortable.esm.2632adaa.js";import"./RedoOutlined.0621d16e.js";import"./FullscreenOutlined.913c05e0.js";import"./index.dfa24be2.js";import"./scrollTo.122d6a3f.js";import"./index.ff6c102c.js";/* empty css              *//* empty css               */import"./index.ae091066.js";import"./index.a6b95ad2.js";import"./index.fb15056d.js";import"./download.b604d2f7.js";import"./base64Conver.08b9f4ec.js";import"./index.bd94130a.js";import"./index.c704f8df.js";import"./uniqBy.a2b21835.js";const G=()=>C.get({url:"/error"}),J={class:"p-4"},K=["src"],Ur=k({setup(b){const m=L(),t=L([]),{t:e}=T(),p=A(),[u,{setTableData:f}]=z({title:e("sys.errorLog.tableTitle"),columns:q(),actionColumn:{width:80,title:"Action",dataIndex:"action",slots:{customRender:"action"}}}),[a,{openModal:r}]=H();D(()=>p.getErrorLogInfoList,l=>{R(()=>{f(B(l))})},{immediate:!0});function s(l){m.value=l,r(!0)}function v(){throw new Error("fire vue error!")}function w(){t.value.push(`${new Date().getTime()}.png`)}function x(){return E(this,null,function*(){yield G()})}return(l,O)=>{const d=I("a-button");return g(),_("div",J,[(g(!0),_(S,null,V(t.value,c=>M((g(),_("img",{key:c,src:c},null,8,K)),[[j,!1]])),128)),i(F,{info:m.value,onRegister:o(a)},null,8,["info","onRegister"]),i(o(N),{onRegister:o(u),class:"error-handle-table"},{toolbar:n(()=>[i(d,{onClick:v,type:"primary"},{default:n(()=>[y(h(o(e)("sys.errorLog.fireVueError")),1)]),_:1}),i(d,{onClick:w,type:"primary"},{default:n(()=>[y(h(o(e)("sys.errorLog.fireResourceError")),1)]),_:1}),i(d,{onClick:x,type:"primary"},{default:n(()=>[y(h(o(e)("sys.errorLog.fireAjaxError")),1)]),_:1})]),action:n(({record:c})=>[i(o($),{actions:[{label:o(e)("sys.errorLog.tableActionDesc"),onClick:s.bind(null,c)}]},null,8,["actions"])]),_:1},8,["onRegister"])])}}});export{Ur as default};
