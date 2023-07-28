<!--
 * @Author: your name
 * @Date: 2022-01-17 14:46:46
 * @LastEditTime: 2023-07-28 17:51:01
 * @LastEditors: zhj1214
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-three.js\src\views\threejs\share-ykg\one\index.vue
-->

<template>
  <div ref="content" class="stage"></div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import cubeTexture from "./square-outline-textured.png";
// import cubeTexture from "./sample1.png"

export default defineComponent({
  setup() {
    // 获取dom元素
    const content = ref(null);

    let scene;
    let camera;
    let renderer;
    let plane;
    let pointer;
    let raycaster;
    let isShiftDown = false;

    let rollOverMesh;
    let rollOverMaterial;
    let cubeGeo;
    let cubeMaterial;

    cubeTexture;
    let controls;

    const objects = [];

    const init = function () {
      // scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color("transparent");

      // plane
      const geometry = new THREE.PlaneGeometry(1000, 1000);
      geometry.rotateX(-Math.PI / 2);
      // geometry.translate(0, 0, 50);
      plane = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ visible: "false" })
      );
      // scene.add( plane );
      objects.push(plane);

      // grid
      // GridHelper( size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
      const gridHelper = new THREE.GridHelper(1000, 20);
      scene.add(gridHelper);

      // lights
      const ambientLight = new THREE.AmbientLight(0x606060);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 0.75, 0.5).normalize();
      scene.add(directionalLight);

      // roll-over helpers
      // BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
      const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
      rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: 0.5,
        transparent: true,
      });
      rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
      scene.add(rollOverMesh);

      // cubes
      cubeGeo = new THREE.BoxGeometry(50, 50, 50);
      cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xfeb74c,
        map: new THREE.TextureLoader().load(cubeTexture),
      });

      // camera
      // OrthographicCamera
      // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.set(700, 700, 1300);
      camera.lookAt(0, 0, 0);

      // raycaster
      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      content.value.appendChild(renderer.domElement);

      // controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", render, true);

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onDocumentKeyDown);
      document.addEventListener("keyup", onDocumentKeyUp);

      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    };

    const onPointerMove = function (event) {
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(objects, false);

      if (intersects.length > 0) {
        const intersect = intersects[0];

        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal); // 法向量
        rollOverMesh.position
          .divideScalar(50)
          .floor()
          .multiplyScalar(50)
          .addScalar(25);
      }

      render();
    };

    const onPointerDown = function (event) {
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(objects, false);

      if (intersects.length > 0) {
        const intersect = intersects[0];

        // delete cube

        if (isShiftDown) {
          if (intersect.object !== plane) {
            scene.remove(intersect.object);

            objects.splice(objects.indexOf(intersect.object), 1);
          }

          // create cube
        } else {
          const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
          voxel.position.copy(intersect.point).add(intersect.face.normal);
          voxel.position
            .divideScalar(50)
            .floor()
            .multiplyScalar(50)
            .addScalar(25);
          scene.add(voxel);

          objects.push(voxel);
        }

        render();
      }
    };

    const onDocumentKeyDown = function (event) {
      switch (event.keyCode) {
        case 16:
          isShiftDown = true;
          break;
        default:
          break;
      }
    };

    const onDocumentKeyUp = function (event) {
      switch (event.keyCode) {
        case 16:
          isShiftDown = false;
          break;
        default:
          break;
      }
    };

    const render = function () {
      renderer.render(scene, camera);
    };

    onMounted(() => {
      init();
      render();
    });

    return {
      content,
    };
  },
});
</script>

<style scoped>
.stage {
  /* position: absolute;
  top: 0;
  left: 0; */
}
</style>
