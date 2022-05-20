/* eslint-disable prettier/prettier */
<template>
  <template>
    <div>ss</div>
  </template>

  <div ref="demo-wrap" class="demo-wrap"></div>
</template>
<script>
import * as THREE from "three";
// 引入three.js

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 引入轨道控制器
export default {
  data() {
    return {
      scene: null, // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      imgList: [
        // 全景图列表
        "/src/views/threejs/panorama/img/home.left.jpg",
        "/src/views/threejs/panorama/img/home.right.jpg",
        "/src/views/threejs/panorama/img/home.top.jpg",
        "/src/views/threejs/panorama/img/home.bottom.jpg",
        "/src/views/threejs/panorama/img/home.front.jpg",
        "/src/views/threejs/panorama/img/home.back.jpg",
      ],
      width: 0, // 容器宽度

      height: 0, // 容器高度
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // 获取容器宽高
      this.width = this.$refs["demo-wrap"].offsetWidth;
      this.height = this.$refs["demo-wrap"].offsetHeight;
      // 创建场景
      this.scene = new THREE.Scene();

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer();

      // 初始化创建一个透明相机
      this.createCamera();

      // 设置渲染器大小
      this.renderer.setSize(this.width, this.height);

      // 插入到页面中
      this.$refs["demo-wrap"].appendChild(this.renderer.domElement);

      this.cubeTextureInit();
      this.render();

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    // 创建相机
    createCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        0.1,
        10000
      );

      // 设置相机的位置
      this.camera.position.set(0, 0, 100);
      // 设置相机看向
      this.camera.lookAt(this.scene.position);
    },
    // 设置环境贴图
    cubeTextureInit() {
      this.scene.background = new THREE.CubeTextureLoader().load(this.imgList);
    },
    // 渲染
    render() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    },
  },
};
</script>
<style>
.demo-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
