var w=(x,n,i)=>new Promise((t,c)=>{var p=s=>{try{m(i.next(s))}catch(u){c(u)}},d=s=>{try{m(i.throw(s))}catch(u){c(u)}},m=s=>s.done?t(s.value):Promise.resolve(s.value).then(p,d);m((i=i.apply(x,n)).next())});import{u as I,a as S,L as _,_ as P,b as R}from"./LoginFormTitle.ab9f6a4a.js";import{a as B,I as g,c as U,v as k,w as L,f as E,i as e,o as N,h as V,n as o,z as r,B as v,t as y,C,F as T,k as D}from"./index.a37e80f2.js";/* empty css              *//* empty css               */import{C as G}from"./index.33ff102e.js";import{S as M}from"./index.bd94130a.js";import{C as $}from"./index.ae091066.js";import{F as b}from"./Form.8b781897.js";import"./Checkbox.a1d5dd4d.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./_baseIteratee.c7363f5d.js";import"./get.c61c1800.js";import"./useSize.63f886e3.js";const ae=B({setup(x){const n=b.Item,i=g.Password,{t}=U(),{handleBackLogin:c,getLoginState:p}=I(),d=k(),m=k(!1),s=L({account:"",password:"",confirmPassword:"",mobile:"",sms:"",policy:!1}),{getFormRules:u}=S(s),{validForm:h}=R(d),z=E(()=>e(p)===_.REGISTER);function F(){return w(this,null,function*(){const f=yield h()})}return(f,a)=>e(z)?(N(),V(T,{key:0},[o(P,{class:"enter-x"}),o(e(b),{class:"p-4 enter-x",model:e(s),rules:e(u),ref_key:"formRef",ref:d},{default:r(()=>[o(e(n),{name:"account",class:"enter-x"},{default:r(()=>[o(e(g),{class:"fix-auto-fill",size:"large",value:e(s).account,"onUpdate:value":a[0]||(a[0]=l=>e(s).account=l),placeholder:e(t)("sys.login.userName")},null,8,["value","placeholder"])]),_:1}),o(e(n),{name:"mobile",class:"enter-x"},{default:r(()=>[o(e(g),{size:"large",value:e(s).mobile,"onUpdate:value":a[1]||(a[1]=l=>e(s).mobile=l),placeholder:e(t)("sys.login.mobile"),class:"fix-auto-fill"},null,8,["value","placeholder"])]),_:1}),o(e(n),{name:"sms",class:"enter-x"},{default:r(()=>[o(e($),{size:"large",class:"fix-auto-fill",value:e(s).sms,"onUpdate:value":a[2]||(a[2]=l=>e(s).sms=l),placeholder:e(t)("sys.login.smsCode")},null,8,["value","placeholder"])]),_:1}),o(e(n),{name:"password",class:"enter-x"},{default:r(()=>[o(e(M),{size:"large",value:e(s).password,"onUpdate:value":a[3]||(a[3]=l=>e(s).password=l),placeholder:e(t)("sys.login.password")},null,8,["value","placeholder"])]),_:1}),o(e(n),{name:"confirmPassword",class:"enter-x"},{default:r(()=>[o(e(i),{size:"large",visibilityToggle:"",value:e(s).confirmPassword,"onUpdate:value":a[4]||(a[4]=l=>e(s).confirmPassword=l),placeholder:e(t)("sys.login.confirmPassword")},null,8,["value","placeholder"])]),_:1}),o(e(n),{class:"enter-x",name:"policy"},{default:r(()=>[o(e(G),{checked:e(s).policy,"onUpdate:checked":a[5]||(a[5]=l=>e(s).policy=l),size:"small"},{default:r(()=>[v(y(e(t)("sys.login.policy")),1)]),_:1},8,["checked"])]),_:1}),o(e(C),{type:"primary",class:"enter-x",size:"large",block:"",onClick:F,loading:m.value},{default:r(()=>[v(y(e(t)("sys.login.registerButton")),1)]),_:1},8,["loading"]),o(e(C),{size:"large",block:"",class:"mt-4 enter-x",onClick:e(c)},{default:r(()=>[v(y(e(t)("sys.login.backSignIn")),1)]),_:1},8,["onClick"])]),_:1},8,["model","rules"])],64)):D("",!0)}});export{ae as default};
