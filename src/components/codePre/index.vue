<template>
  <div class="copy-code-container">
    <div class="copy-container flex-center">
      <slot name="title"> </slot>
      <div class="flex-center">
        <!-- 复制代码 -->
        <el-tooltip
          effect="dark"
          content="Top Left prompts info"
          placement="top-start"
        >
          <el-icon>
            <CopyOutline />
          </el-icon>
          <el-button @click="handleCopy(code)"> 复制代码</el-button>
        </el-tooltip>
        <!-- 显示代码 -->
        <el-tooltip
          effect="dark"
          content="Top Left prompts info"
          placement="top-start"
        >
          <el-icon>
            <Expand />
          </el-icon>
          <el-button @click="handeShowCode"> 显示代码</el-button>
        </el-tooltip>
      </div>
    </div>
    <div
      class="code-palce-container"
      v-if="showCode"
      :class="{ 'show-code': showCode }"
    >
      <div class="code-box" v-highlight>
        <pre>
            <code class="javascirpt">{{code}}</code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { Expand, CopyOutline } from "@vicons/ionicons5";
import clip from "@/utils/clipboard";

export default defineComponent({
  name: "codePre",
  components: { Expand, CopyOutline },
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
    const handleCopy = (text) => {
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
