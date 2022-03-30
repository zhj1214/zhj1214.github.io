var Oe=Object.defineProperty,$e=Object.defineProperties;var Pe=Object.getOwnPropertyDescriptors;var ce=Object.getOwnPropertySymbols;var Ue=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable;var se=(e,t,n)=>t in e?Oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,I=(e,t)=>{for(var n in t||(t={}))Ue.call(t,n)&&se(e,n,t[n]);if(ce)for(var n of ce(t))je.call(t,n)&&se(e,n,t[n]);return e},re=(e,t)=>$e(e,Pe(t));var ie=(e,t,n)=>new Promise((y,A)=>{var S=g=>{try{p(n.next(g))}catch(C){A(C)}},c=g=>{try{p(n.throw(g))}catch(C){A(C)}},p=g=>g.done?y(g.value):Promise.resolve(g.value).then(S,c);p((n=n.apply(e,t)).next())});import{eI as Re,eJ as Ve,eK as me,eL as He,eM as Ye,eN as Xe,e9 as ze,ef as de,eO as qe,eP as Ge,eQ as Je,eR as We,a as Le,v as Ae,eS as Ze,c as Qe,f as M,a7 as $,o as F,h as U,i as r,aB as et,k as O,j as G,z as j,B as oe,t as ue,dG as tt,q as he,n as b,eT as nt,F as W,aA as lt,ce as at,aC as ct,aD as st,eU as rt,b6 as it,b5 as Z,bk as dt,cF as ot,bs as ut,eV as ht,bR as ft,ah as Q,eW as fe,w as ye,am as Y,dl as yt,ao as kt,aw as J,eX as pt,en as gt,L as R,N as St,eY as Kt,dE as xt,cA as Lt,x as ke,y as pe,bD as At,ay as bt,e6 as ge,eZ as Ct,bp as Se,cB as vt}from"./index.a37e80f2.js";import{b as Et}from"./index.9208870e.js";import{u as Tt}from"./useContextMenu.a5abfd5f.js";import{g as _t}from"./get.c61c1800.js";var Nt=200;function Bt(e,t,n,y){var A=-1,S=He,c=!0,p=e.length,g=[],C=t.length;if(!p)return g;n&&(t=Re(t,Ve(n))),y?(S=Ye,c=!1):t.length>=Nt&&(S=Xe,c=!1,t=new me(t));e:for(;++A<p;){var s=e[A],o=n==null?s:n(s);if(s=y||s!==0?s:0,c&&o===o){for(var l=C;l--;)if(t[l]===o)continue e;g.push(s)}else S(t,o,y)||g.push(s)}return g}var wt=ze(function(e,t){return de(e)?Bt(e,qe(t,1,de,!0)):[]}),Dt=wt;function Ft(e){for(var t=-1,n=e==null?0:e.length,y={};++t<n;){var A=e[t];y[A[0]]=A[1]}return y}function ee(e,t){return t?typeof t=="string"?` ${e}--${t}`:Array.isArray(t)?t.reduce((n,y)=>n+ee(e,y),""):Object.keys(t).reduce((n,y)=>n+(t[y]?ee(e,y):""),""):""}function Mt(e){return(t,n)=>(t&&typeof t!="string"&&(n=t,t=""),t=t?`${e}__${t}`:e,`${t}${ee(t,n)}`)}function be(e){return[Mt(`${Ge}-${e}`)]}const Ke=Symbol(),xe=Symbol();function It(e,t){if(!Je(e)||!!e[xe])return e;const{values:n,required:y,default:A,type:S,validator:c}=e,p=n||c?g=>{let C=!1,s=[];if(n&&(s=[...n,A],C||(C=s.includes(g))),c&&(C||(C=c(g))),!C&&s.length>0){const o=[...new Set(s)].map(l=>JSON.stringify(l)).join(", ");We(`Invalid prop: validation failed${t?` for prop "${t}"`:""}. Expected one of [${o}], got value ${JSON.stringify(g)}.`)}return C}:void 0;return{type:typeof S=="object"&&Object.getOwnPropertySymbols(S).includes(Ke)?S[Ke]:S,required:!!y,default:A,validator:p,[xe]:!0}}const Ot=e=>Ft(Object.entries(e).map(([t,n])=>[t,It(n,t)]));var T=(e=>(e[e.SELECT_ALL=0]="SELECT_ALL",e[e.UN_SELECT_ALL=1]="UN_SELECT_ALL",e[e.EXPAND_ALL=2]="EXPAND_ALL",e[e.UN_EXPAND_ALL=3]="UN_EXPAND_ALL",e[e.CHECK_STRICTLY=4]="CHECK_STRICTLY",e[e.CHECK_UN_STRICTLY=5]="CHECK_UN_STRICTLY",e))(T||{});const $t=["update:expandedKeys","update:selectedKeys","update:value","change","check","update:searchValue"],Pt=Ot({value:{type:[Object,Array]},renderIcon:{type:Function},helpMessage:{type:[String,Array],default:""},title:{type:String,default:""},toolbar:Boolean,search:Boolean,searchValue:{type:String,default:""},checkStrictly:Boolean,clickRowToExpand:{type:Boolean,default:!1},checkable:Boolean,defaultExpandLevel:{type:[String,Number],default:""},defaultExpandAll:Boolean,fieldNames:{type:Object},treeData:{type:Array},actionList:{type:Array,default:()=>[]},expandedKeys:{type:Array,default:()=>[]},selectedKeys:{type:Array,default:()=>[]},checkedKeys:{type:Array,default:()=>[]},beforeRightClick:{type:Function,default:void 0},rightMenuList:{type:Array},filterFn:{type:Function,default:void 0},highlight:{type:[Boolean,String],default:!1},expandOnSearch:Boolean,checkOnSearch:Boolean,selectedOnSearch:Boolean}),Ut={key:2,class:"flex items-center flex-1 cursor-pointer justify-self-stretch"},jt=Le({props:{helpMessage:{type:[String,Array],default:""},title:{type:String,default:""},toolbar:{type:Boolean,default:!1},checkable:{type:Boolean,default:!1},search:{type:Boolean,default:!1},searchText:{type:String,default:""},checkAll:{type:Function,default:void 0},expandAll:{type:Function,default:void 0}},emits:["strictly-change","search"],setup(e,{emit:t}){const n=e,y=Ae(""),[A]=be("tree-header"),S=Ze(),{t:c}=Qe(),p=M(()=>{const l=S.headerTitle||n.title;return["mr-1","w-full",{["ml-5"]:l}]}),g=M(()=>{const{checkable:l}=n,i=[{label:c("component.tree.expandAll"),value:T.EXPAND_ALL},{label:c("component.tree.unExpandAll"),value:T.UN_EXPAND_ALL,divider:l}];return l?[{label:c("component.tree.selectAll"),value:T.SELECT_ALL},{label:c("component.tree.unSelectAll"),value:T.UN_SELECT_ALL,divider:l},...i,{label:c("component.tree.checkStrictly"),value:T.CHECK_STRICTLY},{label:c("component.tree.checkUnStrictly"),value:T.CHECK_UN_STRICTLY}]:i});function C(l){var d,h,u,k;const{key:i}=l;switch(i){case T.SELECT_ALL:(d=n.checkAll)==null||d.call(n,!0);break;case T.UN_SELECT_ALL:(h=n.checkAll)==null||h.call(n,!1);break;case T.EXPAND_ALL:(u=n.expandAll)==null||u.call(n,!0);break;case T.UN_EXPAND_ALL:(k=n.expandAll)==null||k.call(n,!1);break;case T.CHECK_STRICTLY:t("strictly-change",!1);break;case T.CHECK_UN_STRICTLY:t("strictly-change",!0);break}}function s(l){t("search",l)}const o=ut(s,200);return $(()=>y.value,l=>{o(l)}),$(()=>n.searchText,l=>{l!==y.value&&(y.value=l)}),(l,i)=>(F(),U("div",{class:he([r(A)(),"flex px-2 py-1.5 items-center"])},[r(S).headerTitle?et(l.$slots,"headerTitle",{key:0}):O("",!0),!r(S).headerTitle&&l.title?(F(),G(r(tt),{key:1,helpMessage:l.helpMessage},{default:j(()=>[oe(ue(l.title),1)]),_:1},8,["helpMessage"])):O("",!0),l.search||l.toolbar?(F(),U("div",Ut,[l.search?(F(),U("div",{key:0,class:he(r(p))},[b(r(nt),{placeholder:r(c)("common.searchText"),size:"small",allowClear:"",value:y.value,"onUpdate:value":i[0]||(i[0]=d=>y.value=d)},null,8,["placeholder","value"])],2)):O("",!0),l.toolbar?(F(),G(r(ot),{key:1,onClick:i[1]||(i[1]=dt(()=>{},["prevent"]))},{overlay:j(()=>[b(r(it),{onClick:C},{default:j(()=>[(F(!0),U(W,null,lt(r(g),d=>(F(),U(W,{key:d.value},[b(r(at),ct(st({key:d.value})),{default:j(()=>[oe(ue(d.label),1)]),_:2},1040),d.divider?(F(),G(r(rt),{key:0})):O("",!0)],64))),128))]),_:1})]),default:j(()=>[b(r(Z),{icon:"ion:ellipsis-vertical"})]),_:1})):O("",!0)])):O("",!0)],2))}}),Rt=({icon:e})=>e?ht(e)?ft(Z,{icon:e,class:"mr-1"}):Z:null;function Vt(e,t){function n(s){const o=[],l=s||r(e),{key:i,children:d}=r(t);if(!d||!i)return o;for(let h=0;h<l.length;h++){const u=l[h];o.push(u[i]);const k=u[d];k&&k.length&&o.push(...n(k))}return o}function y(s){const o=[],l=s||r(e),{key:i,children:d}=r(t);if(!d||!i)return o;for(let h=0;h<l.length;h++){const u=l[h];u.disabled!==!0&&u.selectable!==!1&&o.push(u[i]);const k=u[d];k&&k.length&&o.push(...y(k))}return o}function A(s,o){const l=[],i=o||r(e),{key:d,children:h}=r(t);if(!h||!d)return l;for(let u=0;u<i.length;u++){const k=i[u],E=k[h];s===k[d]?(l.push(k[d]),E&&E.length&&l.push(...n(E))):E&&E.length&&l.push(...A(s,E))}return l}function S(s,o,l){if(!s)return;const i=l||r(e),{key:d,children:h}=r(t);if(!(!h||!d))for(let u=0;u<i.length;u++){const k=i[u],E=k[h];if(k[d]===s){i[u]=I(I({},i[u]),o);break}else E&&E.length&&S(s,o,k[h])}}function c(s=1,o,l=1){if(!s)return[];const i=[],d=o||r(e)||[];for(let h=0;h<d.length;h++){const u=d[h],{key:k,children:E}=r(t),X=k?u[k]:"",P=E?u[E]:[];i.push(X),P&&P.length&&l<s&&(l+=1,i.push(...c(s,P,l)))}return i}function p({parentKey:s=null,node:o,push:l="push"}){const i=Q(r(e));if(!s){i[l](o),e.value=i;return}const{key:d,children:h}=r(t);!h||!d||(fe(i,u=>{if(u[d]===s)return u[h]=u[h]||[],u[h][l](o),!0}),e.value=i)}function g({parentKey:s=null,list:o,push:l="push"}){const i=Q(r(e));if(!(!o||o.length<1))if(s){const{key:d,children:h}=r(t);if(!h||!d)return;fe(i,u=>{if(u[d]===s){u[h]=u[h]||[];for(let k=0;k<o.length;k++)u[h][l](o[k]);return e.value=i,!0}})}else for(let d=0;d<o.length;d++)i[l](o[d])}function C(s,o){if(!s)return;const l=o||r(e),{key:i,children:d}=r(t);if(!(!d||!i))for(let h=0;h<l.length;h++){const u=l[h],k=u[d];if(u[i]===s){l.splice(h,1);break}else k&&k.length&&C(s,u[d])}}return{deleteNodeByKey:C,insertNodeByKey:p,insertNodesByKey:g,filterByLevel:c,updateNodeByKey:S,getAllKeys:n,getChildrenKeys:A,getEnabledKeys:y}}function mt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Lt(e)}var Gt=Le({name:"BasicTree",inheritAttrs:!1,props:Pt,emits:$t,setup(e,{attrs:t,slots:n,emit:y,expose:A}){const[S]=be("tree"),c=ye({checkStrictly:e.checkStrictly,expandedKeys:e.expandedKeys||[],selectedKeys:e.selectedKeys||[],checkedKeys:e.checkedKeys||[]}),p=ye({startSearch:!1,searchText:"",searchData:[]}),g=Ae([]),[C]=Tt(),s=M(()=>{const{fieldNames:a}=e;return I({children:"children",title:"title",key:"key"},a)}),o=M(()=>{let a=re(I(I({blockNode:!0},t),e),{expandedKeys:c.expandedKeys,selectedKeys:c.selectedKeys,checkedKeys:c.checkedKeys,checkStrictly:c.checkStrictly,filedNames:r(s),"onUpdate:expandedKeys":f=>{c.expandedKeys=f,y("update:expandedKeys",f)},"onUpdate:selectedKeys":f=>{c.selectedKeys=f,y("update:selectedKeys",f)},onCheck:(f,x)=>{let K=Y(c.checkedKeys);if(yt(K)&&p.startSearch){const{key:v}=r(s);K=Dt(K,P(x.node.$attrs.node[v])),x.checked&&K.push(x.node.$attrs.node[v]),c.checkedKeys=K}else c.checkedKeys=f;const L=Y(c.checkedKeys);y("update:value",L),y("check",L,x)},onRightClick:Ee});return kt(a,"treeData","class")}),l=M(()=>p.startSearch?p.searchData:r(g)),i=M(()=>!l.value||l.value.length===0),{deleteNodeByKey:d,insertNodeByKey:h,insertNodesByKey:u,filterByLevel:k,updateNodeByKey:E,getAllKeys:X,getChildrenKeys:P,getEnabledKeys:Ce}=Vt(g,s);function ve(a,f){return!f&&e.renderIcon&&J(e.renderIcon)?e.renderIcon(a):f}function Ee(x){return ie(this,arguments,function*({event:a,node:f}){var B;const{rightMenuList:K=[],beforeRightClick:L}=e;let v={event:a,items:[]};if(L&&J(L)){let N=yield L(f,a);Array.isArray(N)?v.items=N:Object.assign(v,N)}else v.items=K;!((B=v.items)!=null&&B.length)||C(v)})}function V(a){c.expandedKeys=a}function Te(){return c.expandedKeys}function te(a){c.selectedKeys=a}function _e(){return c.selectedKeys}function ne(a){c.checkedKeys=a}function Ne(){return c.checkedKeys}function le(a){c.checkedKeys=a?Ce():[]}function z(a){c.expandedKeys=a?X():[]}function Be(a){c.checkStrictly=a}$(()=>e.searchValue,a=>{a!==p.searchText&&(p.searchText=a)},{immediate:!0}),$(()=>e.treeData,a=>{a&&q(p.searchText)});function q(a){if(a!==p.searchText&&(p.searchText=a),y("update:searchValue",a),!a){p.startSearch=!1;return}const{filterFn:f,checkable:x,expandOnSearch:K,checkOnSearch:L,selectedOnSearch:v}=r(e);p.startSearch=!0;const{title:B,key:N}=r(s),w=[];if(p.searchData=pt(r(g),_=>{var m,H;const D=f?f(a,_,r(s)):(H=(m=_[B])==null?void 0:m.includes(a))!=null?H:!1;return D&&w.push(_[N]),D},r(s)),K){const _=gt(p.searchData).map(D=>D[N]);_&&_.length&&V(_)}L&&x&&w.length&&ne(w),v&&w.length&&te(w)}function we(a,f){if(!(!e.clickRowToExpand||!f||f.length===0))if(!c.expandedKeys.includes(a))V([...c.expandedKeys,a]);else{const x=[...c.expandedKeys],K=x.findIndex(L=>L===a);K!==-1&&x.splice(K,1),V(x)}}R(()=>{g.value=e.treeData}),St(()=>{const a=parseInt(e.defaultExpandLevel);a>0?c.expandedKeys=k(a):e.defaultExpandAll&&z(!0)}),R(()=>{c.expandedKeys=e.expandedKeys}),R(()=>{c.selectedKeys=e.selectedKeys}),R(()=>{c.checkedKeys=e.checkedKeys}),$(()=>e.value,()=>{c.checkedKeys=Y(e.value||[])}),$(()=>c.checkedKeys,()=>{const a=Y(c.checkedKeys);y("update:value",a),y("change",a)}),R(()=>{c.checkStrictly=e.checkStrictly});const De={setExpandedKeys:V,getExpandedKeys:Te,setSelectedKeys:te,getSelectedKeys:_e,setCheckedKeys:ne,getCheckedKeys:Ne,insertNodeByKey:h,insertNodesByKey:u,deleteNodeByKey:d,updateNodeByKey:E,checkAll:le,expandAll:z,filterByLevel:a=>{c.expandedKeys=k(a)},setSearchValue:a=>{q(a)},getSearchValue:()=>p.searchText};function Fe(a){const{actionList:f}=e;if(!(!f||f.length===0))return f.map((x,K)=>{var v;let L=!0;return J(x.show)?L=(v=x.show)==null?void 0:v.call(x,a):Se(x.show)&&(L=x.show),L?b("span",{key:K,class:S("action")},[x.render(a)]):null})}const Me=M(()=>{const a=Q(l.value);return Kt(a,(f,x)=>{var ae;const K=p.searchText,{highlight:L}=r(e),{title:v,key:B,children:N}=r(s),w=ve(f,f.icon),_=_t(f,v),D=K?_.indexOf(K):-1,m=p.startSearch&&!Ct(K)&&L&&D!==-1,H=`color: ${Se(L)?"#f50":L}`,Ie=m?b("span",{class:(ae=r(o))!=null&&ae.blockNode?`${S("content")}`:""},[b("span",null,[_.substr(0,D)]),b("span",{style:H},[K]),b("span",null,[_.substr(D+K.length)])]):_;return f.title=b("span",{class:`${S("title")} pl-2`,onClick:we.bind(null,f[B],f[N])},[n!=null&&n.title?vt(n,"title",f):b(W,null,[w&&b(Rt,{icon:w},null),Ie,b("span",{class:S("actions")},[Fe(f)])])]),f}),a});return A(De),()=>{let a;const{title:f,helpMessage:x,toolbar:K,search:L,checkable:v}=e,B=f||K||L||n.headerTitle,N={height:"calc(100% - 38px)"};return b("div",{class:[S(),"h-full",t.class]},[B&&b(jt,{checkable:v,checkAll:le,expandAll:z,title:f,search:L,toolbar:K,helpMessage:x,onStrictlyChange:Be,onSearch:q,searchText:p.searchText},mt(a=xt(n))?a:{default:()=>[a]}),ke(b(At,{style:N},{default:()=>[b(Et,bt(r(o),{showIcon:!1,treeData:Me.value}),null)]}),[[pe,!r(i)]]),ke(b(ge,{image:ge.PRESENTED_IMAGE_SIMPLE,class:"!mt-4"},null),[[pe,r(i)]])])}}});export{Gt as _};