import{v,af as W,i as c,fk as w,fl as x,M as y,fm as b,as as $,fn as g,av as B,a as R,cC as I,ax as C,o as M,j as P,z as m,n as f,B as k}from"./index.a37e80f2.js";import{P as z}from"./index.1b1bb39e.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useWindowSizeFn.9407d2b5.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";const S=Symbol("watermark-dom");function E(n=v(document.body)){const r=b(function(){const t=c(n);if(!t)return;const{clientHeight:e,clientWidth:o}=t;i({height:e,width:o})}),s=S.toString(),l=W(),u=()=>{const t=c(l);l.value=void 0;const e=c(n);!e||(t&&e.removeChild(t),w(e,r))};function _(t){const e=document.createElement("canvas"),o=300,d=240;Object.assign(e,{width:o,height:d});const a=e.getContext("2d");return a&&(a.rotate(-20*Math.PI/120),a.font="15px Vedana",a.fillStyle="rgba(0, 0, 0, 0.15)",a.textAlign="left",a.textBaseline="middle",a.fillText(t,o/20,d)),e.toDataURL("image/png")}function i(t={}){const e=c(l);!e||(g(t.width)&&(e.style.width=`${t.width}px`),g(t.height)&&(e.style.height=`${t.height}px`),g(t.str)&&(e.style.background=`url(${_(t.str)}) left top repeat`))}const p=t=>{if(c(l))return i({str:t}),s;const e=document.createElement("div");l.value=e,e.id=s,e.style.pointerEvents="none",e.style.top="0px",e.style.left="0px",e.style.position="absolute",e.style.zIndex="100000";const o=c(n);if(!o)return s;const{clientHeight:d,clientWidth:a}=o;return i({str:t,width:a,height:d}),o.appendChild(e),s};function h(t){p(t),x(document.documentElement,r),$()&&y(()=>{u()})}return{setWatermark:h,clear:u}}const L=R({components:{CollapseContainer:I,PageWrapper:z},setup(){const n=v(null),{setWatermark:r,clear:s}=E();return{setWatermark:r,clear:s,areaRef:n}}}),N=k(" Create "),T=k(" Clear "),V=k(" Reset ");function j(n,r,s,l,u,_){const i=C("a-button"),p=C("CollapseContainer"),h=C("PageWrapper");return M(),P(h,{title:"\u6C34\u5370\u793A\u4F8B"},{default:m(()=>[f(p,{class:"w-full h-32 bg-white rounded-md",title:"Global WaterMark"},{default:m(()=>[f(i,{type:"primary",class:"mr-2",onClick:r[0]||(r[0]=t=>n.setWatermark("WaterMark Info"))},{default:m(()=>[N]),_:1}),f(i,{color:"error",class:"mr-2",onClick:n.clear},{default:m(()=>[T]),_:1},8,["onClick"]),f(i,{color:"warning",class:"mr-2",onClick:r[1]||(r[1]=t=>n.setWatermark("WaterMark Info New"))},{default:m(()=>[V]),_:1})]),_:1})]),_:1})}var X=B(L,[["render",j]]);export{X as default};
