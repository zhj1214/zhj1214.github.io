import{C as r}from"./index.1afecf92.js";import{a as p,o as a,h as i,F as d,aA as m,j as f,z as l,n as e,B as g,t as c,i as o,m as s,b5 as v,q as x}from"./index.a37e80f2.js";import{T as _}from"./index.03a59885.js";import{C as B}from"./index.4f193558.js";import"./index.7e85020a.js";/* empty css               */import"./index.c96949ee.js";import"./index.a29fe7c0.js";import"./index.c704f8df.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useRefs.9eeff60f.js";import"./PlusOutlined.9619b07a.js";const V=[{title:"\u8BBF\u95EE\u6570",icon:"visit-count|svg",value:2e3,total:12e4,color:"green",action:"\u6708"},{title:"\u6210\u4EA4\u989D",icon:"total-sales|svg",value:2e4,total:5e5,color:"blue",action:"\u6708"},{title:"\u4E0B\u8F7D\u6570",icon:"download-count|svg",value:8e3,total:12e4,color:"orange",action:"\u5468"},{title:"\u6210\u4EA4\u6570",icon:"transaction|svg",value:5e3,total:5e4,color:"purple",action:"\u5E74"}],C={class:"md:flex"},w={class:"py-4 px-4 flex justify-between items-center"},E={class:"p-2 px-4 flex justify-between"},S=p({props:{loading:{type:Boolean}},setup(u){return(h,y)=>(a(),i("div",C,[(a(!0),i(d,null,m(o(V),(t,n)=>(a(),f(o(B),{key:t.title,size:"small",loading:u.loading,title:t.title,class:x(["md:w-1/4 w-full !md:mt-0",{"!md:mr-4":n+1<4,"!mt-4":n>0}])},{extra:l(()=>[e(o(_),{color:t.color},{default:l(()=>[g(c(t.action),1)]),_:2},1032,["color"])]),default:l(()=>[s("div",w,[e(o(r),{prefix:"$",startVal:1,endVal:t.value,class:"text-2xl"},null,8,["endVal"]),e(o(v),{icon:t.icon,size:40},null,8,["icon"])]),s("div",E,[s("span",null,"\u603B"+c(t.title),1),e(o(r),{prefix:"$",startVal:1,endVal:t.total},null,8,["endVal"])])]),_:2},1032,["loading","title","class"]))),128))]))}});export{S as default};