<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-02-17 14:18:23
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-02-18 16:52:49
-->
<template>
  <div class="copy-code-container">
    <div class="copy-container flex-center">
      <slot name="title"> </slot>
      <div class="flex-center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div id="copyEvent" style="width: 25px" @click="handleCopy(code)">
              <n-icon> <CopyOutline /> </n-icon>
            </div>
          </template>
          复制代码
        </n-tooltip>

        <n-tooltip>
          <template #trigger>
            <div style="width: 25px; margin-left: 8px" @click="handeShowCode">
              <n-icon> <Expand /> </n-icon>
            </div>
          </template>
          显示代码
        </n-tooltip>
      </div>
    </div>
    <div class="code-palce-container" v-if="showCode" :class="{ 'show-code': showCode }">
      <div class="code-box" v-highlight>
        <pre>
            <code class="javascirpt">{{code}}</code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { NTooltip } from "naive-ui";
import { ref, defineComponent } from "vue";
import { Expand, CopyOutline } from "@vicons/ionicons5";
import clip from "@/utils/clipboard";

export default defineComponent({
  name: "codePre",
  components: { NTooltip, Expand, CopyOutline },
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    console.log(props.code);
    const showCode = ref(false);
    const handeShowCode = () => {
      showCode.value = !showCode.value;
    };
    const handleCopy = text => {
      //   const copyEvent = ref();
      //   console.log("text", copyEvent);
      clip(text, "#copyEvent");
    };
    return {
      handeShowCode,
      handleCopy,
      showCode,
    };
  },
});
</script>

<style lang="scss" scoped>
.copy-code-container {
  width: 100%;
  .copy-container {
    width: 100%;
    justify-content: space-between;
    position: relative;

    .ant-btn {
      width: 58px;
      height: 38px;
      margin: 0;
      border: none;
      box-shadow: none;
      background-color: transparent;
      padding: 0;
    }

    i {
      cursor: pointer;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .code-palce-container {
    width: 100%;
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: all linear 0.1s;

    &.show-code {
      height: 100%;
    }

    .code-box {
      ::v-deep .hljs {
        padding: 0 20px;
        line-height: 25px;
      }
    }
  }
}
</style>
