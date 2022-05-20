<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-02-08 10:12:07
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-16 17:40:15
-->
<template>
  <div class="view">
    <el-collapse>
      <el-collapse-item
        title="BFC 全称：Block Formatting Context， 名为 '块级格式化上下文'"
        name="1"
      >
        W3C官方解释为：BFC它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block
        Formatting
        Context提供了一个环境，HTML在这个环境中按照一定的规则进行布局。
        简单来说就是，BFC是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用BFC呢，BFC可以看做是一个CSS元素属性
        <template #header-extra>介绍</template>
      </el-collapse-item>
      <el-collapse-item title="BFC的规则" name="2">
        <p>1.BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列</p>
        <p>
          2.BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
        </p>
        <p>
          3.垂直方向的距离由margin决定，
          属于同一个BFC的两个相邻的标签外边距会发生重叠
        </p>
        <p>4.计算BFC的高度时，浮动元素也参与计算</p>
      </el-collapse-item>

      <el-collapse-item name="3">
        <template #title> 演示示例 </template>
        <el-collapse>
          <el-collapse-item title="使用Float脱离文档流，高度塌陷" name="11">
            <div class="domeOne">
              父容器：背景色灰色，子元素属性：float: left;margin/width/height:
              100px;<span style="color: red">所以产生了“高度塌陷”。</span>
              <div class="container" :style="{ display: displayOne }">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box box-text" @click="repairOne">修复/复原</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Margin边距重叠" name="22">
            <div class="domeOne">
              <div>
                父容器：背景色灰色，子元素属性：width/height:
                100px;margin:10px;<span style="color: red"
                  >所以产生了“ Margin边距重叠 ”。</span
                >
              </div>
              <div>
                可以看到下面我们为两个盒子的margin外边距设置的是10px，可结果显示两个盒子之间只有10px的距离，这就导致了margin塌陷问题，这时margin边距的结果为最大值，而不是合，为了解决此问题可以使用BFC规则（为元素包裹一个盒子形成一个完全独立的空间，做到里面元素不受外面布局影响），或者简单粗暴方法一个设置margin，一个设置padding、或者设置overflow:hidden;。
              </div>

              <div class="container" :style="{ overflow: displayTwo }">
                <div class="box1"></div>
                <div class="box1 box-text" @click="repairTwo">修复</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="两栏布局" name="33">
            <div class="domeOne">
              <div>
                子元素属性共同属性：width: 200px;height: 100px;border: 1px solid
                red;<span style="color: red">所以产生了“ 两栏布局 ”。</span>
              </div>

              <div class="container">
                <div class="box2" style="float: left">
                  两栏布局，我有个属性：float: left；
                </div>
                <div
                  class="box2"
                  :style="{ width: '300px', display: displayThree }"
                >
                  我本身：width: 300px,不修复的话我宽度竟然变小了，<span
                    class="box-text"
                    style="line-height: initial"
                    @click="repairThree"
                    >修复/复原</span
                  >
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    // 示例一
    const displayOne = ref("block");
    const repairOne = () => {
      if (displayOne.value !== "inline-block")
        displayOne.value = "inline-block";
      else displayOne.value = "block";
    };
    // 示例二
    const displayTwo = ref("initial");
    const repairTwo = () => {
      if (displayTwo.value !== "hidden") displayTwo.value = "hidden";
      else displayTwo.value = "initial";
    };
    // 示例三
    const displayThree = ref("block");
    const repairThree = () => {
      if (displayThree.value !== "block") displayThree.value = "block";
      else displayThree.value = "flex";
    };

    // 挂载完成
    onMounted(() => {
      // 需要在DOM加载完毕之后才可获取到
    });
    return {
      displayThree,
      displayTwo,
      displayOne,
      repairOne,
      repairTwo,
      repairThree,
    };
  },
});
</script>

<style lang="scss" scoped>
.domeOne {
  height: 300px; // 给定高度，撑开容器，使后面的示例正常显示
  overflow: hidden; // 解决浮动影响
}
.container {
  background: rgb(182, 177, 177);
  .box {
    margin: 100px;
    width: 100px;
    height: 100px;
    background: red;
    float: left;
    &-text {
      color: rgb(195, 240, 89);
      text-align: center;
      line-height: 100px;
    }
  }
  .box1 {
    margin: 10px;
    width: 100px;
    height: 100px;
    background: #000;
  }
  .box2 {
    width: 200px;
    height: 100px;
    border: 1px solid red;
  }
}
</style>
