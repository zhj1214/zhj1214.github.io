import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene;
let renderer;
let camera;
// let cube;
/* ****** 初始化 ****** */
export const init = (id, dom) => {
  // 初始化场景
  scene = new THREE.Scene();
  //   初始化相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 移动相机的Z轴坐标
  camera.position.z = 5;
  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  // 设置渲染器尺寸，第三个参数updateStyle: 分辨率 默认true, 当为false 时，会降低分辨率来显示
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8, false);
  dom.appendChild(renderer.domElement);
};
/* ****** 创建立方体 ****** */
export const createBox = () => {
  const loader = new GLTFLoader();
  loader.load(
    "http://websl.data4truth.com:23503/data/web-Project/model/shiba/scene.gltf", // /src/assets/model/shiba/scene.gltf
    function (gltf) {
      gltf.scene.scale.set(6, 6, 6);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
};
var callBack;
export const renderScene = (call) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  // 键盘控制相机移动
  var animationID;
  function animate() {
    renderer.render(scene, camera);
    animationID = requestAnimationFrame(animate);
    controls.update();
  }
  // 开始动画
  animate();

  // 暂停、开启
  if (typeof call === "function") {
    callBack = call;
  } else if (callBack) {
    callBack(animationID);
  }
};
