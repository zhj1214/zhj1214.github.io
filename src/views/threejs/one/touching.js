/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-10 17:59:45
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-12 17:10:17
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene;
let renderer;
let camera;
let cube;
let controls;
var callBack;
var controlCallBack;

/* ****** 初始化创景和相机 ****** */
export const init = (id, dom) => {
  // 创建场景
  scene = new THREE.Scene();
  /**
   * 创建相机 PerspectiveCamera 代表透视相机 | OrthographicCamera（正交摄像机）。
   * PerspectiveCamera: 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式
   * OrthographicCamera: 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。
   * */
  // 第一个参数75: 视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。
  // 第二个参数是长宽比（aspect ratio）。 也就是你用一个物体的宽除以它的高的值。比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。
  // 接下来的两个参数是近截面（near）和远截面（far）。 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 90; // 移动相机的Z轴坐标
  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true; // 是否可以投影
  // renderer.setClearColor(0xffffff); // 渲染背景色

  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap 影子效果
  // 设置渲染器尺寸，第三个参数updateStyle: 分辨率 默认true, 当为false 时，会降低分辨率来显示
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8, false);
  dom.appendChild(renderer.domElement);
  // 创建控件对象
  controls = new OrbitControls(camera, renderer.domElement);
};

/* ****** 创建立方体 ****** */
export const createGeometryBox = (isChange) => {
  if (cube) scene.remove(cube);
  // 创建一个立方体
  let geometry;
  if (isChange) geometry = new THREE.SphereGeometry(30, 50, 50);
  // 球体
  else geometry = new THREE.BoxGeometry(10, 20, 20); // , Math.PI, Math.PI, Math.PI
  // 给立方体添加表面材质，three.js自带了几种材质，在这里我们使用的是MeshBasicMaterial。所有的材质都存有应用于他们的属性的对象。在这里为了简单起见，我们只设置一个color属性，值为0x00ff00，也就是绿色。
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 0x00ff00、'red'、'#867321'
  // 我们需要一个Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
  cube = new THREE.Mesh(geometry, material);
  // 当我们调用scene.add()的时候，物体将会被添加到(0,0,0)坐标。但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。
  // cube.position.set(0, 0, 0);
  cube.castShadow = true; // default is false
  scene.add(cube);

  // 聚光灯
  var point = new THREE.SpotLight(0xffffff, 1, 500);
  point.position.set(0, -120, 70); // 点光源位置
  point.penumbra = 0.1; // 光影聚焦的百分比 0-1之间，默认值为0，所以阴影会产生锯齿效果.
  point.castShadow = true; // 是否需要增加阴影
  point.shadowCameraVisible = true; // 阴影可见性
  point.shadow.mapSize.width = 1024; // 阴影分辨率
  point.shadow.mapSize.height = 1024; // 阴影分辨率
  point.shadow.camera.near = 0.5; // 阴影产生的最近点
  point.shadow.camera.far = 500; // 阴影产生的最远点
  point.shadow.camera.fov = 20; // 投影视场 投影镜头的视场角是指镜头成像清晰的时候投影画面的对角线的端点与镜头所形成的夹角。标准镜头的视场角一般为20-30°，广角镜头的视场角在60-80°，SC-108镜匹配0.8“LCD投影机时视场角为74°。
  scene.add(point); // 点光源添加到场景中

  // 创建一个接收投影的面板
  const planeGeometry = new THREE.PlaneGeometry(400, 500, 320, 320);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x1b17ec });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.position.set(0, 0, -50);

  scene.add(plane);

  // 聚光光源助手
  const spotLightHelper = new THREE.SpotLightHelper(point);
  scene.add(spotLightHelper);

  // 创建相机助手
  const helper = new THREE.CameraHelper(point.shadow.camera);
  scene.add(helper);

  return material;
};

/* ****** 更换物体材质 ****** */
export const MaterialBox = (isShow) => {
  scene.remove(cube);
  // 创建一个立方体
  const geometry = new THREE.BoxGeometry(10, 20, 20);
  const material = new THREE.MeshNormalMaterial({
    flatShading: true,
    wireframe: isShow,
  });

  // 我们需要一个Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
  cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true; // default is false
  cube.receiveShadow = false; // default
  cube.position.set(0, 0, 0);
  scene.add(cube);
  return material;
};

/* ****** 将物体渲染到场景中 ****** */
// 现在，如果将之前写好的代码复制到HTML文件中，你不会在页面中看到任何东西。这是因为我们还没有对它进行真正的渲染。
// 为此，我们需要使用一个被叫做“渲染循环”（render loop）或者“动画循环”（animate loop）的东西。
export const renderScene = (call) => {
  // 使立方体动起来
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  const animationID = requestAnimationFrame(renderScene);
  // 暂停、开启
  if (typeof call === "function") {
    callBack = call;
  } else if (callBack) {
    callBack(animationID);
  }
};

/* ****** 开启投影相机鼠标控制视角 ****** */
export const renderControls = (call) => {
  // 渲染
  renderer.render(scene, camera);
  requestAnimationFrame(renderControls);
  // 开启视角控制
  controls.update();

  if (typeof call === "function") {
    controlCallBack = call;
  } else if (controlCallBack) {
    controlCallBack(controls);
  }
};
