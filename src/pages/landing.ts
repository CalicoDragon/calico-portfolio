import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const templateLanding = (container: HTMLElement) => {
  container.innerHTML = `
    <div>
      <h1>Landing works!</h1>
      <canvas id="three-container" style="width: 100%; height: 100%;"></canvas>
    </div>
  `;

  const canvas = container.querySelector("#three-container") as HTMLElement;
  const scene = new THREE.Scene();

  const loader = new GLTFLoader();
  loader.load(
    "../../public/models/wiz.gltf",
    (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "%");
    },
    (err) => {
      console.error(err);
    },
  );

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 1, 2);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio));
  renderer.shadowMap.enabled = true;

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 50;
  controls.target.set(0, 0.35, 0);
  controls.update();

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
};
