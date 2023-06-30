<template>
  <div class="view">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="创建promise类" name="1">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="initCode">
            <template v-slot:title>
              <div>
                由于Promise使用时是这样的：<span
                  >new Promise((resolve, reject)=>{})</span
                >，所以：
              </div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>
      <el-collapse-item title="Promise状态" name="2">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step1">
            <template v-slot:title>
              <div>定义三个状态，以及两个回调函数</div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>

      <el-collapse-item title="定义then方法" name="3">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step2">
            <template v-slot:title>
              <div>
                Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
              </div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>
      <!-- 解决异步实现 -->
      <el-collapse-item title="解决异步实现" name="4">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step3">
            <template v-slot:title>
              <div>
                现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态
                我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
                类似于发布订阅，先将then里面的两个函数储存起来，由于一个promise可以有多个then，所以存在同一个数组内。
              </div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>
      <!-- 解决链式调用 -->
      <el-collapse-item title="解决链式调用" name="5">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step4">
            <template v-slot:title>
              <div>
                <div>
                  我门常常用到new
                  Promise().then().then(),这就是链式调用，用来解决回调地狱;
                </div>
                <ol>
                  <li>
                    为了达成链式，我们默认在第一个then里返回一个promise。秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2：promise2
                    = new Promise((resolve, reject)=>{})
                    将这个promise2返回的值传递到下一个then中
                    如果返回一个普通的值，则将普通的值传递给下一个then中
                  </li>
                  <li>
                    当我们在第一个then中return了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值
                  </li>
                </ol>
              </div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>

      <!-- 完成resolvePromise函数 -->
      <el-collapse-item title="完成resolvePromise函数" name="6">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step5">
            <template v-slot:title>
              <div>让不同的promise代码互相套用，叫做resolvePromise</div>
              <div>
                <code>
                  let p = new Promise(resolve => { resolve(0); }); var p2 =
                  p.then(data => { return p2; //
                  循环引用，自己等待自己完成，一辈子完不成})
                </code>
              </div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>
      <!-- 遗留问题 -->
      <el-collapse-item title="遗留问题" name="7">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step6">
            <template v-slot:title>
              <div>
                秘籍规定onFulfilled,onRejected都是可选参数，如果他们不是函数，必须被忽略
              </div>
              <ol>
                <li>
                  onFulfilled返回一个普通的值，成功时直接等于 value => value
                </li>
                <li>
                  onRejected返回一个普通的值，失败时如果直接等于 value =>
                  value，则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason
                  => throw err
                </li>
                <li>
                  秘籍规定onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
                </li>
                <li>如果onFulfilled或onRejected报错，则直接返回reject()</li>
              </ol>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>
      <!-- 大功告成 -->
      <el-collapse-item title="完整版代码" name="8">
        <div class="flex-center" style="justify-content: space-between">
          <CopyCode :code="step7">
            <template v-slot:title>
              <div>完整版代码</div>
            </template>
          </CopyCode>
        </div>
        <template #header-extra>展开</template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import CopyCode from "@/components/codePre/index.vue";
import {
  initCode,
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
} from "./promiseCode";

export default defineComponent({
  components: { CopyCode },
  setup() {
    const activeNames = ref(["1"]);
    // 挂载完成
    onMounted(() => {
      // 需要在DOM加载完毕之后才可获取到
    });
    const handleChange = (val) => {
      console.log(val);
    };
    return {
      activeNames,
      initCode,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
