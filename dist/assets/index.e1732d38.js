import{M as C,a as w}from"./index.e2b588ec.js";import{P as h}from"./index.1b1bb39e.js";import{av as g,a as D,v as s,ax as a,o as V,j as M,z as n,m,n as r,i as B,B as c}from"./index.a37e80f2.js";import{C as E}from"./index.4f193558.js";import"./index.7e85020a.js";/* empty css               */import"./index.2833acfd.js";import"./useWindowSizeFn.9407d2b5.js";import"./FullscreenOutlined.913c05e0.js";import"./index.5133ca68.js";import"./index.6d0b2f34.js";import"./useSize.63f886e3.js";import"./eagerComputed.4d6ef9e3.js";import"./useContentViewHeight.df49acbe.js";import"./ArrowLeftOutlined.90405055.js";import"./index.55ab06a5.js";import"./transButton.b87d5a94.js";import"./index.a29fe7c0.js";import"./index.c704f8df.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useRefs.9eeff60f.js";import"./PlusOutlined.9619b07a.js";const F=D({components:{MarkDown:C,PageWrapper:h,MarkdownViewer:w,ACard:E},setup(){const e=s(null),o=s(`
# title

# content
`);function i(){const t=B(e);if(!t)return;t.getVditor().setTheme("dark")}function p(t){o.value=t}function l(){o.value=""}return{value:o,toggleTheme:i,markDownRef:e,handleChange:p,clearValue:l}}}),A=c(" \u9ED1\u6697\u4E3B\u9898 "),b=c(" \u6E05\u7A7A\u5185\u5BB9 "),P={class:"mt-2"};function T(e,o,i,p,l,t){const u=a("a-button"),d=a("MarkDown"),f=a("MarkdownViewer"),_=a("a-card"),v=a("PageWrapper");return V(),M(v,{title:"MarkDown\u7EC4\u4EF6\u793A\u4F8B"},{default:n(()=>[m("div",null,[r(u,{onClick:e.toggleTheme,class:"mb-2",type:"primary"},{default:n(()=>[A]),_:1},8,["onClick"]),r(u,{onClick:e.clearValue,class:"mb-2",type:"default"},{default:n(()=>[b]),_:1},8,["onClick"]),r(d,{value:e.value,"onUpdate:value":o[0]||(o[0]=k=>e.value=k),onChange:e.handleChange,ref:"markDownRef",placeholder:"\u8FD9\u662F\u5360\u4F4D\u6587\u672C"},null,8,["value","onChange"])]),m("div",P,[r(_,{title:"Markdown Viewer \u7EC4\u4EF6\u6F14\u793A"},{default:n(()=>[r(f,{value:e.value},null,8,["value"])]),_:1})])]),_:1})}var oe=g(F,[["render",T]]);export{oe as default};
