import{v as P,cb as Me,M as et,a as me,f as Q,n as s,c1 as ne,R as pe,S as D,L as He,_ as J,cc as j,a6 as C,N as ze,a7 as Ie,cd as Ht,b6 as zt,ce as Gt,cf as Vt,G as tt,a4 as $t,K as Ut,bb as Xt,cg as bt,T as oe,ch as kt,X as ht,ci as Le,cj as Yt,ar as It,Q as Zt,$ as Jt,ck as Qt,c4 as qe,J as qt,cl as ea,cm as mt,c6 as ta,Y as aa}from"./index.a37e80f2.js";import{u as na}from"./useRefs.9eeff60f.js";import{P as ia}from"./PlusOutlined.9619b07a.js";function ra(p){var e=P(),t=P(!1);function l(){for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];t.value||(Me.cancel(e.value),e.value=Me(function(){p.apply(void 0,i)}))}return et(function(){t.value=!0,Me.cancel(e.value)}),l}function la(p){var e=P([]),t=P(typeof p=="function"?p():p),l=ra(function(){var i=t.value;e.value.forEach(function(r){i=r(i)}),e.value=[],t.value=i});function a(i){e.value.push(i),l()}return[t,a]}var oa=me({name:"TabNode",props:{id:{type:String},prefixCls:{type:String},tab:{type:Object},active:{type:Boolean},closable:{type:Boolean},editable:{type:Object},onClick:{type:Function},onResize:{type:Function},renderWrapper:{type:Function},removeAriaLabel:{type:String},onFocus:{type:Function}},emits:["click","resize","remove","focus"],setup:function(e,t){var l=t.expose,a=t.attrs,i=P();function r(v){var c;!((c=e.tab)===null||c===void 0)&&c.disabled||e.onClick(v)}l({domRef:i});function d(v){var c;v.preventDefault(),v.stopPropagation(),e.editable.onEdit("remove",{key:(c=e.tab)===null||c===void 0?void 0:c.key,event:v})}var o=Q(function(){var v;return e.editable&&e.closable!==!1&&!(!((v=e.tab)===null||v===void 0)&&v.disabled)});return function(){var v,c,y=e.prefixCls,g=e.id,N=e.active,k=e.tab,F=k.key,_=k.tab,H=k.disabled,x=k.closeIcon,u=e.renderWrapper,B=e.removeAriaLabel,z=e.editable,L=e.onFocus,E="".concat(y,"-tab"),M=s("div",{key:F,ref:i,class:pe(E,(v={},D(v,"".concat(E,"-with-remove"),o.value),D(v,"".concat(E,"-active"),N),D(v,"".concat(E,"-disabled"),H),v)),style:a.style,onClick:r},[s("div",{role:"tab","aria-selected":N,id:g&&"".concat(g,"-tab-").concat(F),class:"".concat(E,"-btn"),"aria-controls":g&&"".concat(g,"-panel-").concat(F),"aria-disabled":H,tabindex:H?null:0,onClick:function(W){W.stopPropagation(),r(W)},onKeydown:function(W){[ne.SPACE,ne.ENTER].includes(W.which)&&(W.preventDefault(),r(W))},onFocus:L},[typeof _=="function"?_():_]),o.value&&s("button",{type:"button","aria-label":B||"remove",tabindex:0,class:"".concat(E,"-remove"),onClick:function(W){W.stopPropagation(),d(W)}},[(x==null?void 0:x())||((c=z.removeIcon)===null||c===void 0?void 0:c.call(z))||"\xD7"])]);return u?u(M):M}}}),yt={width:0,height:0,left:0,top:0};function ua(p,e){var t=P(new Map);return He(function(){for(var l,a,i=new Map,r=p.value,d=e.value.get((l=r[0])===null||l===void 0?void 0:l.key)||yt,o=d.left+d.width,v=0;v<r.length;v+=1){var c=r[v].key,y=e.value.get(c);y||(y=e.value.get((a=r[v-1])===null||a===void 0?void 0:a.key)||yt);var g=i.get(c)||J({},y);g.right=o-g.left-g.width,i.set(c,g)}t.value=new Map(i)}),t}var Pt=me({name:"AddButton",inheritAttrs:!1,props:{prefixCls:String,editable:{type:Object},locale:{type:Object,default:void 0}},setup:function(e,t){var l=t.expose,a=t.attrs,i=P();return l({domRef:i}),function(){var r=e.prefixCls,d=e.editable,o=e.locale;return!d||d.showAdd===!1?null:s("button",{ref:i,type:"button",class:"".concat(r,"-nav-add"),style:a.style,"aria-label":(o==null?void 0:o.addAriaLabel)||"Add tab",onClick:function(c){d.onEdit("add",{event:c})}},[d.addIcon?d.addIcon():"+"])}}}),va={prefixCls:{type:String},id:{type:String},tabs:{type:Object},rtl:{type:Boolean},tabBarGutter:{type:Number},activeKey:{type:[String,Number]},mobile:{type:Boolean},moreIcon:tt.any,moreTransitionName:{type:String},editable:{type:Object},locale:{type:Object,default:void 0},removeAriaLabel:String,onTabClick:{type:Function}},ca=me({name:"OperationNode",inheritAttrs:!1,props:va,emits:["tabClick"],slots:["moreIcon"],setup:function(e,t){var l=t.attrs,a=t.slots,i=j(!1),r=C(i,2),d=r[0],o=r[1],v=j(null),c=C(v,2),y=c[0],g=c[1],N=function(u){for(var B=e.tabs.filter(function(V){return!V.disabled}),z=B.findIndex(function(V){return V.key===y.value})||0,L=B.length,E=0;E<L;E+=1){z=(z+u+L)%L;var M=B[z];if(!M.disabled){g(M.key);return}}},k=function(u){var B=u.which;if(!d.value){[ne.DOWN,ne.SPACE,ne.ENTER].includes(B)&&(o(!0),u.preventDefault());return}switch(B){case ne.UP:N(-1),u.preventDefault();break;case ne.DOWN:N(1),u.preventDefault();break;case ne.ESC:o(!1);break;case ne.SPACE:case ne.ENTER:y.value!==null&&e.onTabClick(y.value,u);break}},F=Q(function(){return"".concat(e.id,"-more-popup")}),_=Q(function(){return y.value!==null?"".concat(F.value,"-").concat(y.value):null}),H=function(u,B){u.preventDefault(),u.stopPropagation(),e.editable.onEdit("remove",{key:B,event:u})};return ze(function(){Ie(y,function(){var x=document.getElementById(_.value);x&&x.scrollIntoView&&x.scrollIntoView(!1)},{flush:"post",immediate:!0})}),Ie(d,function(){d.value||g(null)}),function(){var x,u=e.prefixCls,B=e.id,z=e.tabs,L=e.locale,E=e.mobile,M=e.moreIcon,V=M===void 0?((x=a.moreIcon)===null||x===void 0?void 0:x.call(a))||s(Ht,null,null):M,W=e.moreTransitionName,$=e.editable,ue=e.tabBarGutter,h=e.rtl,n=e.onTabClick,m="".concat(u,"-dropdown"),T=L==null?void 0:L.dropdownAriaLabel,O=D({},h?"marginRight":"marginLeft",ue);z.length||(O.visibility="hidden",O.order=1);var A=pe(D({},"".concat(m,"-rtl"),h)),X=E?null:s(Vt,{prefixCls:m,trigger:["hover"],visible:d.value,transitionName:W,onVisibleChange:o,overlayClassName:A,mouseEnterDelay:.1,mouseLeaveDelay:.1},{overlay:function(){return s(zt,{onClick:function(w){var ie=w.key,re=w.domEvent;n(ie,re),o(!1)},id:F.value,tabindex:-1,role:"listbox","aria-activedescendant":_.value,selectedKeys:[y.value],"aria-label":T!==void 0?T:"expanded dropdown"},{default:function(){return[z.map(function(w){var ie,re,_e=$&&w.closable!==!1&&!w.disabled;return s(Gt,{key:w.key,id:"".concat(F.value,"-").concat(w.key),role:"option","aria-controls":B&&"".concat(B,"-panel-").concat(w.key),disabled:w.disabled},{default:function(){return[s("span",null,[typeof w.tab=="function"?w.tab():w.tab]),_e&&s("button",{type:"button","aria-label":e.removeAriaLabel||"remove",tabindex:0,class:"".concat(m,"-menu-item-remove"),onClick:function(ve){ve.stopPropagation(),H(ve,w.key)}},[((ie=w.closeIcon)===null||ie===void 0?void 0:ie.call(w))||((re=$.removeIcon)===null||re===void 0?void 0:re.call($))||"\xD7"])]}})})]}})},default:function(){return s("button",{type:"button",class:"".concat(u,"-nav-more"),style:O,tabindex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":F.value,id:"".concat(B,"-more"),"aria-expanded":d.value,onKeydown:k},[V])}});return s("div",{class:pe("".concat(u,"-nav-operations"),l.class),style:l.style},[X,s(Pt,{prefixCls:u,locale:L,editable:$},null)])}}}),_t=Symbol("tabsContextKey"),Et=function(e){$t(_t,e)},Bt=function(){return Ut(_t,{tabs:P([]),prefixCls:P()})};me({name:"TabsContextProvider",inheritAttrs:!1,props:{tabs:{type:Object,default:void 0},prefixCls:{type:String,default:void 0}},setup:function(e,t){var l=t.slots;return Et(Xt(e)),function(){var a;return(a=l.default)===null||a===void 0?void 0:a.call(l)}}});var sa=.1,gt=.01,je=20,St=Math.pow(.995,je);function da(p,e){var t=j(),l=C(t,2),a=l[0],i=l[1],r=j(0),d=C(r,2),o=d[0],v=d[1],c=j(0),y=C(c,2),g=y[0],N=y[1],k=j(),F=C(k,2),_=F[0],H=F[1],x=P();function u(h){var n=h.touches[0],m=n.screenX,T=n.screenY;i({x:m,y:T}),clearInterval(x.value)}function B(h){if(!!a.value){h.preventDefault();var n=h.touches[0],m=n.screenX,T=n.screenY,O=m-a.value.x,A=T-a.value.y;e(O,A),i({x:m,y:T});var X=Date.now();N(X-o.value),v(X),H({x:O,y:A})}}function z(){if(!!a.value){var h=_.value;if(i(null),H(null),h){var n=h.x/g.value,m=h.y/g.value,T=Math.abs(n),O=Math.abs(m);if(Math.max(T,O)<sa)return;var A=n,X=m;x.value=setInterval(function(){if(Math.abs(A)<gt&&Math.abs(X)<gt){clearInterval(x.value);return}A*=St,X*=St,e(A*je,X*je)},je)}}}var L=P();function E(h){var n=h.deltaX,m=h.deltaY,T=0,O=Math.abs(n),A=Math.abs(m);O===A?T=L.value==="x"?n:m:O>A?(T=n,L.value="x"):(T=m,L.value="y"),e(-T,-T)&&h.preventDefault()}var M=P({onTouchStart:u,onTouchMove:B,onTouchEnd:z,onWheel:E});function V(h){M.value.onTouchStart(h)}function W(h){M.value.onTouchMove(h)}function $(h){M.value.onTouchEnd(h)}function ue(h){M.value.onWheel(h)}ze(function(){var h,n;document.addEventListener("touchmove",W,{passive:!1}),document.addEventListener("touchend",$,{passive:!1}),(h=p.value)===null||h===void 0||h.addEventListener("touchstart",V,{passive:!1}),(n=p.value)===null||n===void 0||n.addEventListener("wheel",ue,{passive:!1})}),et(function(){document.removeEventListener("touchmove",W),document.removeEventListener("touchend",$)})}function pt(p,e){var t=P(p);function l(a){var i=typeof a=="function"?a(t.value):a;i!==t.value&&e(i,t.value),t.value=i}return[t,l]}var xt={width:0,height:0,left:0,top:0,right:0},fa=function(){return{id:{type:String},tabPosition:{type:String},activeKey:{type:[String,Number]},rtl:{type:Boolean},animated:{type:Object,default:void 0},editable:{type:Object},moreIcon:tt.any,moreTransitionName:{type:String},mobile:{type:Boolean},tabBarGutter:{type:Number},renderTabBar:{type:Function},locale:{type:Object,default:void 0},onTabClick:{type:Function},onTabScroll:{type:Function}}},Tt=me({name:"TabNavList",inheritAttrs:!1,props:fa(),slots:["moreIcon","leftExtra","rightExtra","tabBarExtraContent"],emits:["tabClick","tabScroll"],setup:function(e,t){var l=t.attrs,a=t.slots,i=Bt(),r=i.tabs,d=i.prefixCls,o=P(),v=P(),c=P(),y=P(),g=na(),N=C(g,2),k=N[0],F=N[1],_=Q(function(){return e.tabPosition==="top"||e.tabPosition==="bottom"}),H=pt(0,function(b,S){_.value&&e.onTabScroll&&e.onTabScroll({direction:b>S?"left":"right"})}),x=C(H,2),u=x[0],B=x[1],z=pt(0,function(b,S){!_.value&&e.onTabScroll&&e.onTabScroll({direction:b>S?"top":"bottom"})}),L=C(z,2),E=L[0],M=L[1],V=j(0),W=C(V,2),$=W[0],ue=W[1],h=j(0),n=C(h,2),m=n[0],T=n[1],O=j(0),A=C(O,2),X=A[0],Pe=A[1],xe=j(0),w=C(xe,2),ie=w[0],re=w[1],_e=j(null),Te=C(_e,2),Y=Te[0],ve=Te[1],We=j(null),q=C(We,2),ce=q[0],Oe=q[1],Ke=j(0),De=C(Ke,2),Ge=De[0],Ee=De[1],At=j(0),at=C(At,2),Rt=at[0],Nt=at[1],Lt=la(new Map),nt=C(Lt,2),Mt=nt[0],Wt=nt[1],Be=ua(r,Mt),it=Q(function(){return"".concat(d.value,"-nav-operations-hidden")}),we=P(0),Ae=P(0);He(function(){_.value?e.rtl?(we.value=0,Ae.value=Math.max(0,$.value-Y.value)):(we.value=Math.min(0,Y.value-$.value),Ae.value=0):(we.value=Math.min(0,ce.value-m.value),Ae.value=0)});var Ve=function(S){return S<we.value?we.value:S>Ae.value?Ae.value:S},rt=P(),Ot=j(),lt=C(Ot,2),$e=lt[0],ot=lt[1],Ue=function(){ot(Date.now())},Xe=function(){clearTimeout(rt.value)},ut=function(S,f){S(function(R){var I=Ve(R+f);return I})};da(o,function(b,S){if(_.value){if(Y.value>=$.value)return!1;ut(B,b)}else{if(ce.value>=m.value)return!1;ut(M,S)}return Xe(),Ue(),!0}),Ie($e,function(){Xe(),$e.value&&(rt.value=setTimeout(function(){ot(0)},100))});var vt=function(){var S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activeKey,f=Be.value.get(S)||{width:0,height:0,left:0,right:0,top:0};if(_.value){var R=u.value;e.rtl?f.right<u.value?R=f.right:f.right+f.width>u.value+Y.value&&(R=f.right+f.width-Y.value):f.left<-u.value?R=-f.left:f.left+f.width>-u.value+Y.value&&(R=-(f.left+f.width-Y.value)),M(0),B(Ve(R))}else{var I=E.value;f.top<-E.value?I=-f.top:f.top+f.height>-E.value+ce.value&&(I=-(f.top+f.height-ce.value)),B(0),M(Ve(I))}},Ye=P(0),Ze=P(0);He(function(){var b,S,f,R,I,Z,G;["top","bottom"].includes(e.tabPosition)?(S="width",I=Y.value,Z=X.value,G=Ge.value,f=e.rtl?"right":"left",R=Math.abs(u.value)):(S="height",I=ce.value,Z=ie.value,G=Rt.value,f="top",R=-E.value);var le=I;Z+G>I&&(le=I-G);var U=r.value;if(!U.length){var ee;return ee=[0,0],Ye.value=ee[0],Ze.value=ee[1],ee}for(var ye=U.length,Ce=ye,K=0;K<ye;K+=1){var de=Be.value.get(U[K].key)||xt;if(de[f]+de[S]>R+le){Ce=K-1;break}}for(var te=0,ae=ye-1;ae>=0;ae-=1){var fe=Be.value.get(U[ae].key)||xt;if(fe[f]<R){te=ae+1;break}}return b=[te,Ce],Ye.value=b[0],Ze.value=b[1],b});var Je=function(){var S,f,R,I,Z,G,le,U,ee,ye=((S=o.value)===null||S===void 0?void 0:S.offsetWidth)||0,Ce=((f=o.value)===null||f===void 0?void 0:f.offsetHeight)||0,K=((R=y.value)===null||R===void 0?void 0:R.offsetWidth)||0,de=((I=y.value)===null||I===void 0?void 0:I.offsetHeight)||0,te=((Z=c.value)===null||Z===void 0?void 0:Z.$el.offsetWidth)||0,ae=((G=c.value)===null||G===void 0?void 0:G.$el.offsetHeight)||0;ve(ye),Oe(Ce),Ee(K),Nt(de);var fe=(((le=v.value)===null||le===void 0?void 0:le.offsetWidth)||0)-K,Re=(((U=v.value)===null||U===void 0?void 0:U.offsetHeight)||0)-de;ue(fe),T(Re);var Ne=(ee=c.value)===null||ee===void 0?void 0:ee.$el.className.includes(it.value);Pe(fe-(Ne?0:te)),re(Re-(Ne?0:ae)),Wt(function(){var ge=new Map;return r.value.forEach(function(Fe){var be=Fe.key,ke,he=F.value.get(be),Se=((ke=he)===null||ke===void 0?void 0:ke.$el)||he;Se&&ge.set(be,{width:Se.offsetWidth,height:Se.offsetHeight,left:Se.offsetLeft,top:Se.offsetTop})}),ge})},ct=Q(function(){return[].concat(ht(r.value.slice(0,Ye.value)),ht(r.value.slice(Ze.value+1)))}),Kt=j(),st=C(Kt,2),Dt=st[0],Ft=st[1],se=Q(function(){return Be.value.get(e.activeKey)}),dt=P(),ft=function(){Me.cancel(dt.value)};Ie([se,_,function(){return e.rtl}],function(){var b={};se.value&&(_.value?(e.rtl?b.right=Le(se.value.right):b.left=Le(se.value.left),b.width=Le(se.value.width)):(b.top=Le(se.value.top),b.height=Le(se.value.height))),ft(),dt.value=Me(function(){Ft(b)})}),Ie([function(){return e.activeKey},se,Be,_],function(){vt()},{flush:"post"}),Ie([function(){return e.rtl},function(){return e.tabBarGutter},function(){return e.activeKey},function(){return r.value}],function(){Je()},{flush:"post"});var Qe=function(S){var f=S.position,R=S.prefixCls,I=S.extra;if(!I)return null;var Z=I==null?void 0:I({position:f});return Z?s("div",{class:"".concat(R,"-extra-content")},[Z]):null};return et(function(){Xe(),ft()}),function(){var b,S=e.id,f=e.animated,R=e.activeKey,I=e.rtl,Z=e.editable,G=e.locale,le=e.tabPosition,U=e.tabBarGutter,ee=e.onTabClick,ye=l.class,Ce=l.style,K=d.value,de=!!ct.value.length,te="".concat(K,"-nav-wrap"),ae,fe,Re,Ne;_.value?I?(fe=u.value>0,ae=u.value+Y.value<$.value):(ae=u.value<0,fe=-u.value+Y.value<$.value):(Re=E.value<0,Ne=-E.value+ce.value<m.value);var ge={};le==="top"||le==="bottom"?ge[I?"marginRight":"marginLeft"]=typeof U=="number"?"".concat(U,"px"):U:ge.marginTop=typeof U=="number"?"".concat(U,"px"):U;var Fe=r.value.map(function(be,ke){var he=be.key;return s(oa,{id:S,prefixCls:K,key:he,tab:be,style:ke===0?void 0:ge,closable:be.closable,editable:Z,active:he===R,removeAriaLabel:G==null?void 0:G.removeAriaLabel,ref:k(he),onClick:function(jt){ee(he,jt)},onFocus:function(){vt(he),Ue(),o.value&&(I||(o.value.scrollLeft=0),o.value.scrollTop=0)}},a)});return s("div",{ref:P,role:"tablist",class:pe("".concat(K,"-nav"),ye),style:Ce,onKeydown:function(){Ue()}},[s(Qe,{position:"left",prefixCls:K,extra:a.leftExtra},null),s(bt,{onResize:Je},{default:function(){return[s("div",{class:pe(te,(b={},D(b,"".concat(te,"-ping-left"),ae),D(b,"".concat(te,"-ping-right"),fe),D(b,"".concat(te,"-ping-top"),Re),D(b,"".concat(te,"-ping-bottom"),Ne),b)),ref:o},[s(bt,{onResize:Je},{default:function(){return[s("div",{ref:v,class:"".concat(K,"-nav-list"),style:{transform:"translate(".concat(u.value,"px, ").concat(E.value,"px)"),transition:$e.value?"none":void 0}},[Fe,s(Pt,{ref:y,prefixCls:K,locale:G,editable:Z,style:J(J({},Fe.length===0?void 0:ge),{visibility:de?"hidden":null})},null),s("div",{class:pe("".concat(K,"-ink-bar"),D({},"".concat(K,"-ink-bar-animated"),f.inkBar)),style:Dt.value},null)])]}})])]}}),s(ca,oe(oe({},e),{},{removeAriaLabel:G==null?void 0:G.removeAriaLabel,ref:c,prefixCls:K,tabs:ct.value,class:!de&&it.value}),kt(a,["moreIcon"])),s(Qe,{position:"right",prefixCls:K,extra:a.rightExtra},null),s(Qe,{position:"right",prefixCls:K,extra:a.tabBarExtraContent},null)])}}}),ba=me({name:"TabPanelList",inheritAttrs:!1,props:{activeKey:{type:[String,Number]},id:{type:String},rtl:{type:Boolean},animated:{type:Object,default:void 0},tabPosition:{type:String},destroyInactiveTabPane:{type:Boolean}},setup:function(e){var t=Bt(),l=t.tabs,a=t.prefixCls;return function(){var i=e.id,r=e.activeKey,d=e.animated,o=e.tabPosition,v=e.rtl,c=e.destroyInactiveTabPane,y=d.tabPane,g=a.value,N=l.value.findIndex(function(k){return k.key===r});return s("div",{class:"".concat(g,"-content-holder")},[s("div",{class:["".concat(g,"-content"),"".concat(g,"-content-").concat(o),D({},"".concat(g,"-content-animated"),y)],style:N&&y?D({},v?"marginRight":"marginLeft","-".concat(N,"00%")):null},[l.value.map(function(k){return Yt(k.node,{key:k.key,prefixCls:g,tabKey:k.key,id:i,animated:y,active:k.key===r,destroyInactiveTabPane:c})})])])}}}),Ct=0,wt=function(){return{prefixCls:{type:String},id:{type:String},activeKey:{type:[String,Number]},defaultActiveKey:{type:[String,Number]},direction:{type:String},animated:{type:[Boolean,Object]},renderTabBar:{type:Function},tabBarGutter:{type:Number},tabBarStyle:{type:Object},tabPosition:{type:String},destroyInactiveTabPane:{type:Boolean},hideAdd:Boolean,type:{type:String},size:{type:String},centered:Boolean,onEdit:{type:Function},onChange:{type:Function},onTabClick:{type:Function},onTabScroll:{type:Function},locale:{type:Object,default:void 0},onPrevClick:Function,onNextClick:Function,tabBarExtraContent:tt.any}};function ha(p){return p.map(function(e){if(Jt(e)){for(var t=J({},e.props||{}),l=0,a=Object.entries(t);l<a.length;l++){var i=C(a[l],2),r=i[0],d=i[1];delete t[r],t[Qt(r)]=d}var o=e.children||{},v=e.key!==void 0?e.key:void 0,c=t.tab,y=c===void 0?o.tab:c,g=t.disabled,N=t.forceRender,k=t.closable,F=t.animated,_=t.active,H=t.destroyInactiveTabPane;return J(J({key:v},t),{node:e,closeIcon:o.closeIcon,tab:y,disabled:g===""||g,forceRender:N===""||N,closable:k===""||k,animated:F===""||F,active:_===""||_,destroyInactiveTabPane:H===""||H})}return null}).filter(function(e){return e})}var ma=me({name:"InternalTabs",inheritAttrs:!1,props:J(J({},It(wt(),{tabPosition:"top",animated:{inkBar:!0,tabPane:!1}})),{tabs:{type:Array}}),slots:["tabBarExtraContent","leftExtra","rightExtra","moreIcon","addIcon","removeIcon","renderTabBar"],emits:["tabClick","tabScroll","change","update:activeKey"],setup:function(e,t){var l=t.attrs,a=t.slots;qe(e.onPrevClick===void 0&&e.onNextClick===void 0,"Tabs","`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead."),qe(e.tabBarExtraContent===void 0,"Tabs","`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead."),qe(a.tabBarExtraContent===void 0,"Tabs","`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.");var i=qt("tabs",e),r=i.prefixCls,d=i.direction,o=i.size,v=i.rootPrefixCls,c=Q(function(){return d.value==="rtl"}),y=Q(function(){var n=e.animated;return n===!1?{inkBar:!1,tabPane:!1}:n===!0?{inkBar:!0,tabPane:!0}:J({inkBar:!0,tabPane:!1},aa(n)==="object"?n:{})}),g=j(!1),N=C(g,2),k=N[0],F=N[1];ze(function(){F(ea())});var _=mt(function(){var n;return(n=e.tabs[0])===null||n===void 0?void 0:n.key},{value:Q(function(){return e.activeKey}),defaultValue:e.defaultActiveKey}),H=C(_,2),x=H[0],u=H[1],B=j(function(){return e.tabs.findIndex(function(n){return n.key===x.value})}),z=C(B,2),L=z[0],E=z[1];He(function(){var n,m=e.tabs.findIndex(function(T){return T.key===x.value});m===-1&&(m=Math.max(0,Math.min(L.value,e.tabs.length-1)),u((n=e.tabs[m])===null||n===void 0?void 0:n.key)),E(m)});var M=mt(null,{value:Q(function(){return e.id})}),V=C(M,2),W=V[0],$=V[1],ue=Q(function(){return k.value&&!["left","right"].includes(e.tabPosition)?"top":e.tabPosition});ze(function(){e.id||($("rc-tabs-".concat(Ct)),Ct+=1)});var h=function(m,T){var O,A;(O=e.onTabClick)===null||O===void 0||O.call(e,m,T);var X=m!==x.value;u(m),X&&((A=e.onChange)===null||A===void 0||A.call(e,m))};return Et({tabs:Q(function(){return e.tabs}),prefixCls:r}),function(){var n,m=e.id,T=e.type,O=e.tabBarGutter,A=e.tabBarStyle,X=e.locale,Pe=e.destroyInactiveTabPane,xe=e.renderTabBar,w=xe===void 0?a.renderTabBar:xe,ie=e.onTabScroll,re=e.hideAdd,_e=e.centered,Te={id:W.value,activeKey:x.value,animated:y.value,tabPosition:ue.value,rtl:c.value,mobile:k.value},Y;T==="editable-card"&&(Y={onEdit:function(Oe,Ke){var De=Ke.key,Ge=Ke.event,Ee;(Ee=e.onEdit)===null||Ee===void 0||Ee.call(e,Oe==="add"?Ge:De,Oe)},removeIcon:function(){return s(ta,null,null)},addIcon:a.addIcon?a.addIcon:function(){return s(ia,null,null)},showAdd:re!==!0});var ve,We=J(J({},Te),{moreTransitionName:"".concat(v.value,"-slide-up"),editable:Y,locale:X,tabBarGutter:O,onTabClick:h,onTabScroll:ie,style:A});w?ve=w(J(J({},We),{DefaultTabBar:Tt})):ve=s(Tt,We,kt(a,["moreIcon","leftExtra","rightExtra","tabBarExtraContent"]));var q=r.value;return s("div",oe(oe({},l),{},{id:m,class:pe(q,"".concat(q,"-").concat(ue.value),(n={},D(n,"".concat(q,"-").concat(o.value),o.value),D(n,"".concat(q,"-card"),["card","editable-card"].includes(T)),D(n,"".concat(q,"-editable-card"),T==="editable-card"),D(n,"".concat(q,"-centered"),_e),D(n,"".concat(q,"-mobile"),k.value),D(n,"".concat(q,"-editable"),T==="editable-card"),D(n,"".concat(q,"-rtl"),c.value),n),l.class)}),[ve,s(ba,oe(oe({destroyInactiveTabPane:Pe},Te),{},{animated:y.value}),null)])}}}),pa=me({name:"ATabs",inheritAttrs:!1,props:It(wt(),{tabPosition:"top",animated:{inkBar:!0,tabPane:!1}}),slots:["tabBarExtraContent","leftExtra","rightExtra","moreIcon","addIcon","removeIcon","renderTabBar"],emits:["tabClick","tabScroll","change","update:activeKey"],setup:function(e,t){var l=t.attrs,a=t.slots,i=t.emit,r=function(o){i("update:activeKey",o),i("change",o)};return function(){var d,o=ha(Zt((d=a.default)===null||d===void 0?void 0:d.call(a)));return s(ma,oe(oe(oe({},e),l),{},{onChange:r,tabs:o}),a)}}});export{pa as T};
