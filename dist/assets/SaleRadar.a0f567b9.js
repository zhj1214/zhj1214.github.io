import{a as i,v as r,a7 as s,o as l,j as m,z as d,m as n,bl as u,i as p}from"./index.a37e80f2.js";import{C as f}from"./index.4f193558.js";import"./index.7e85020a.js";/* empty css               */import{u as c}from"./useECharts.35026e26.js";import"./index.a29fe7c0.js";import"./index.c704f8df.js";import"./Col.cee418bd.js";import"./useFlexGapSupport.0e4bc511.js";import"./useRefs.9eeff60f.js";import"./PlusOutlined.9619b07a.js";const O=i({props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"400px"}},setup(t){const e=t,a=r(null),{setOptions:o}=c(a);return s(()=>e.loading,()=>{e.loading||o({legend:{bottom:0,data:["Visits","Sales"]},tooltip:{},radar:{radius:"60%",splitNumber:8,indicator:[{text:"2017",max:100},{text:"2017",max:100},{text:"2018",max:100},{text:"2019",max:100},{text:"2020",max:100},{text:"2021",max:100}]},series:[{type:"radar",symbolSize:0,areaStyle:{shadowBlur:0,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1},data:[{value:[90,50,86,40,50,20],name:"Visits",itemStyle:{color:"#b6a2de"}},{value:[70,75,70,76,20,85],name:"Sales",itemStyle:{color:"#67e0e3"}}]}]})},{immediate:!0}),(h,x)=>(l(),m(p(f),{title:"\u9500\u552E\u7EDF\u8BA1",loading:t.loading},{default:d(()=>[n("div",{ref_key:"chartRef",ref:a,style:u({width:t.width,height:t.height})},null,4)]),_:1},8,["loading"]))}});export{O as default};