<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-02-08 10:12:07
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-16 17:21:01
-->
<template>
  <div class="view">
    <el-collapse default-expanded-names="1">
      <!-- 行内元素 -->
      <el-collapse-item title="行内元素" name="1">
        <template #header-extra>展开</template>
        <div class="inlineView">
          <p>方式一:</p>
          <code>text-align: center; height: 100px; line-height: 100px;</code>
          <div class="inline-center">
            <span>元素一</span>
            <span>元素二</span>
            <span>元素三</span>
          </div>
        </div>
      </el-collapse-item>
      <!-- 块级元素 -->
      <el-collapse-item title="块级元素" name="2">
        <template #header-extra>展开</template>
        <el-collapse>
          <el-collapse-item title="方式一" name="11">
            <div class="blockView">
              <code
                >display: flex; align-items: center; justify-content:
                center;</code
              >
              <div class="blockView-centerOne">
                <div>元素一</div>
                <div>元素二</div>
                <div>元素三</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="方式二" name="12">
            <div class="blockView">
              <code
                >父元素：height: 100px; width: 300px; position: absolute;</code
              >
              <code
                >子元素：position: absolute; top: 50%; left: 50%; transform:
                translate(-50%, -50%);</code
              >
              <div class="blockView-centerTwo">
                <div class="blockView-centerTwo-child">元素水平垂直居中</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="方式三" name="13">
            <div class="blockView">
              <code
                >父级：height: 200px; width: 300px; position: relative;</code
              >
              <code
                >子元素：position: absolute; margin-top: 0.5 * 200px;
                margin-left: 0.5 * 300px; transform: translate(-50%,
                -50%);</code
              >
              <div class="blockView-centerThree">
                <div class="blockView-centerThree-child">元素水平垂直居中</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="方式四" name="14">
            <div class="blockView">
              <code
                >父级：height: 200px; width: 200px; position: relative;</code
              >
              <code
                >子元素：position: absolute; width: 100px; height: 100px;
                background: yellow; left: 50%; top: 50%; margin-left: -50px;
                margin-top: -50px;</code
              >
              <div class="blockView-centerFour">
                <div class="blockView-centerFour-child">元素水平垂直居中</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="方式五" name="15">
            <div class="blockView">
              <code
                >父级：height: 200px; width: 200px; position: relative;</code
              >
              <code
                >子元素：position: absolute; width: 100px; height: 100px;
                background: yellow; left: 50%; top: 50%; margin-left: -50px;
                margin-top: -50px;</code
              >
              <div class="blockView-centerFive">
                <div class="blockView-centerFive-child">元素水平垂直居中</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="方式六" name="16">
            <div class="blockView">
              <code>父级：height: 200px; width: 200px; display: grid;</code>
              <code>子元素：margin: auto;</code>
              <div class="blockView-centerSix">
                <div class="blockView-centerSix-child">元素水平垂直居中</div>
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
.view {
  .inlineView {
    .inline-center {
      text-align: center;
      height: 100px;
      line-height: 100px;
      background-color: rgb(156, 153, 153);
      span {
        padding: 10px;
      }
    }
  }
  .blockView {
    min-height: 100px;
    &-centerOne {
      background-color: aqua;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        padding: 10px;
      }
    }
    &-centerTwo {
      background-color: aqua;
      height: 100px;
      width: 300px;
      position: absolute;

      &-child {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      div {
        background-color: rgb(190, 34, 34);
        padding: 10px;
      }
    }
    &-centerThree {
      height: 200px;
      width: 300px;
      position: relative;
      background-color: rgb(111, 204, 131);
      &-child {
        position: absolute;
        margin-top: 0.5 * 200px;
        margin-left: 0.5 * 300px;
        transform: translate(-50%, -50%);
      }
    }
    &-centerFour {
      width: 200px;
      height: 200px;
      border: 1px solid red;
      position: relative;

      &-child {
        position: absolute;
        width: 100px;
        height: 100px;
        background: yellow;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
      }
    }

    &-centerFive {
      width: 200px;
      height: 200px;
      border: 1px solid red;
      position: relative;

      &-child {
        position: absolute;
        display: inline;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0px;
        background: yellow;
        margin: auto;
        height: 100px;
        width: 100px;
      }
    }
    &-centerSix {
      width: 200px;
      height: 200px;
      border: 1px solid red;
      display: grid;
      &-child {
        background: yellow;
        margin: auto;
      }
    }
  }
}
</style>
