import{a as J,G as i,ak as K,v as d,J as V,f as X,cG as Y,a7 as j,N as D,al as _,c5 as Q,S as l,n as g,_ as m,cg as U,T as I,Y as Z,aK as $}from"./index.a37e80f2.js";import{u as ee}from"./useSize.63f886e3.js";import{e as ae}from"./eagerComputed.4d6ef9e3.js";var re=function(){return{prefixCls:i.string,shape:i.oneOf(K("circle","square")).def("circle"),size:{type:[Number,String,Object],default:function(){return"default"}},src:i.string,srcset:i.string,icon:i.any,alt:i.string,gap:i.number,draggable:i.bool,crossOrigin:String,loadError:{type:Function}}},te=J({name:"AAvatar",inheritAttrs:!1,props:re(),slots:["icon"],setup:function(e,A){var y=A.slots,h=A.attrs,p=d(!0),E=d(!1),x=d(1),S=d(null),z=d(null),T=V("avatar",e),k=T.prefixCls,R=ee(),n=X(function(){return e.size==="default"?R.value:e.size}),W=Y(),o=ae(function(){if(Z(e.size)==="object"){var r=$.find(function(t){return W.value[t]}),a=e.size[r];return a}}),N=function(a){return o.value?{width:"".concat(o.value,"px"),height:"".concat(o.value,"px"),lineHeight:"".concat(o.value,"px"),fontSize:"".concat(a?o.value/2:18,"px")}:{}},b=function(){if(!(!S.value||!z.value)){var a=S.value.offsetWidth,t=z.value.offsetWidth;if(a!==0&&t!==0){var c=e.gap,u=c===void 0?4:c;u*2<t&&(x.value=t-u*2<a?(t-u*2)/a:1)}}},w=function(){var a=e.loadError,t=a==null?void 0:a();t!==!1&&(p.value=!1)};return j(function(){return e.src},function(){_(function(){p.value=!0,x.value=1})}),j(function(){return e.gap},function(){_(function(){b()})}),D(function(){_(function(){b(),E.value=!0})}),function(){var r,a,t=e.shape,c=e.src,u=e.alt,H=e.srcset,B=e.draggable,F=e.crossOrigin,v=Q(y,e,"icon"),s=k.value,G=(r={},l(r,"".concat(h.class),!!h.class),l(r,s,!0),l(r,"".concat(s,"-lg"),n.value==="large"),l(r,"".concat(s,"-sm"),n.value==="small"),l(r,"".concat(s,"-").concat(t),t),l(r,"".concat(s,"-image"),c&&p.value),l(r,"".concat(s,"-icon"),v),r),L=typeof n.value=="number"?{width:"".concat(n.value,"px"),height:"".concat(n.value,"px"),lineHeight:"".concat(n.value,"px"),fontSize:v?"".concat(n.value/2,"px"):"18px"}:{},P=(a=y.default)===null||a===void 0?void 0:a.call(y),f;if(c&&p.value)f=g("img",{draggable:B,src:c,srcset:H,onError:w,alt:u,crossorigin:F},null);else if(v)f=v;else if(E.value||x.value!==1){var C="scale(".concat(x.value,") translateX(-50%)"),M={msTransform:C,WebkitTransform:C,transform:C},q=typeof n.value=="number"?{lineHeight:"".concat(n.value,"px")}:{};f=g(U,{onResize:b},{default:function(){return[g("span",{class:"".concat(s,"-string"),ref:S,style:m(m({},q),M)},[P])]}})}else f=g("span",{class:"".concat(s,"-string"),ref:S,style:{opacity:0}},[P]);return g("span",I(I({},h),{},{ref:z,class:G,style:m(m(m({},L),N(!!v)),h.style)}),[f])}}}),ce=te;export{ce as A};