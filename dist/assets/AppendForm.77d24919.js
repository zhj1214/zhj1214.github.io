var B=(e,n,r)=>new Promise((l,i)=>{var t=o=>{try{p(r.next(o))}catch(m){i(m)}},a=o=>{try{p(r.throw(o))}catch(m){i(m)}},p=o=>o.done?l(o.value):Promise.resolve(o.value).then(t,a);p((r=r.apply(e,n)).next())});import{B as h}from"./BasicForm.b57aee2b.js";import{u as $}from"./useForm.9f6c5426.js";import{av as P,a as g,cC as k,I as _,dv as F,v as I,ax as u,o as d,j as f,z as s,n as C,k as b,B as v}from"./index.a37e80f2.js";import{P as y}from"./index.1b1bb39e.js";/* empty css              *//* empty css               */import"./index.b5a022bb.js";import"./index.ac42b924.js";import"./Checkbox.a1d5dd4d.js";import"./index.33ff102e.js";import"./index.03a59885.js";import"./index.80ce27aa.js";import"./index.d4b3cfad.js";import"./index.ae091066.js";import"./get.c61c1800.js";import"./index.9208870e.js";import"./index.959bd454.js";import"./_baseIteratee.c7363f5d.js";import"./DeleteOutlined.685854af.js";import"./index.46d8a2cc.js";import"./useRefs.9eeff60f.js";import"./Form.8b781897.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useSize.63f886e3.js";import"./index.a6b95ad2.js";import"./index.2833acfd.js";import"./useWindowSizeFn.9407d2b5.js";import"./FullscreenOutlined.913c05e0.js";import"./index.fb15056d.js";import"./index.dfa24be2.js";import"./uuid.2b29000c.js";import"./download.b604d2f7.js";import"./base64Conver.08b9f4ec.js";import"./index.bd94130a.js";import"./index.c704f8df.js";import"./uniqBy.a2b21835.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./eagerComputed.4d6ef9e3.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";const S=g({components:{BasicForm:h,CollapseContainer:k,PageWrapper:y,[_.name]:_,Button:F},setup(){const[e,{appendSchemaByField:n,removeSchemaByFiled:r,validate:l}]=$({schemas:[{field:"field0a",component:"Input",label:"\u5B57\u6BB50",colProps:{span:8},required:!0},{field:"field0b",component:"Input",label:"\u5B57\u6BB50",colProps:{span:8},required:!0},{field:"0",component:"Input",label:" ",colProps:{span:8},slot:"add"}],labelWidth:100,actionColOptions:{span:24}});function i(){return B(this,null,function*(){try{const o=yield l()}catch(o){}})}const t=I(1);function a(){n({field:`field${t.value}a`,component:"Input",label:"\u5B57\u6BB5"+t.value,colProps:{span:8},required:!0},""),n({field:`field${t.value}b`,component:"Input",label:"\u5B57\u6BB5"+t.value,colProps:{span:8},required:!0},""),n({field:`${t.value}`,component:"Input",label:" ",colProps:{span:8},slot:"add"},""),t.value++}function p(o){r([`field${o}a`,`field${o}b`,`${o}`]),t.value--}return{register:e,handleSubmit:i,add:a,del:p}}}),q=v("+"),N=v("-");function W(e,n,r,l,i,t){const a=u("Button"),p=u("BasicForm"),o=u("CollapseContainer"),m=u("PageWrapper");return d(),f(m,{title:"\u8868\u5355\u589E\u5220\u793A\u4F8B"},{default:s(()=>[C(o,{title:"\u8868\u5355\u589E\u5220"},{default:s(()=>[C(p,{onRegister:e.register,onSubmit:e.handleSubmit},{add:s(({field:c})=>[Number(c)===0?(d(),f(a,{key:0,onClick:e.add},{default:s(()=>[q]),_:1},8,["onClick"])):b("",!0),c>0?(d(),f(a,{key:1,onClick:V=>e.del(c)},{default:s(()=>[N]),_:2},1032,["onClick"])):b("",!0)]),_:1},8,["onRegister","onSubmit"])]),_:1})]),_:1})}var Fo=P(S,[["render",W]]);export{Fo as default};