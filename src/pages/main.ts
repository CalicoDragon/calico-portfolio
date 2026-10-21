import html from "./main.html?raw";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const templateMain = (container: HTMLElement) => {
  container.innerHTML = html;

  const backCanvas = container.querySelector("#back-canvas") as HTMLElement;
  const frontCanvas = container.querySelector("#front-canvas") as HTMLElement;
  const backScene = new THREE.Scene();
  const frontScene = new THREE.Scene();

  const mixers: THREE.AnimationMixer[] = [];
  const timer = new THREE.Timer();
  timer.connect(document);

  const loader = new GLTFLoader();
  loader.load(
    "/models/scene.gltf",
    (gltf) => {
      backScene.add(gltf.scene);

      // animation
      const mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();
      mixers.push(mixer);
    },
    (err) => {
      console.error(err);
    },
  );
  
  loader.load(
    "/models/wiz.gltf",
    (gltf) => {
      frontScene.add(gltf.scene);

      // animation
      const mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();
      mixers.push(mixer);
    },
    (err) => {
      console.error(err);
    },
  );

  // Camera
  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(-13, 3, 25);
  camera.rotation.set(0.15, -0.9, 0);

  // Renderers
  const backRenderer = new THREE.WebGLRenderer({ canvas: backCanvas, alpha: true });
  const frontRenderer = new THREE.WebGLRenderer({ canvas: frontCanvas, alpha: true });
  backRenderer.setSize(window.innerWidth, window.innerHeight);
  backRenderer.setPixelRatio(Math.min(window.devicePixelRatio));
  backRenderer.shadowMap.enabled = true;
  frontRenderer.setSize(window.innerWidth, window.innerHeight);
  frontRenderer.setPixelRatio(Math.min(window.devicePixelRatio));
  frontRenderer.shadowMap.enabled = true;

  backScene.add(new THREE.AmbientLight(0xffffff, 3));
  frontScene.add(new THREE.AmbientLight(0xffffff, 3));
  backScene.background = new THREE.Color(0x0c0b0b);

  const animate = () => {
    requestAnimationFrame(animate);
    timer.update();
    mixers.forEach((mixer) => {mixer.update(timer.getDelta())})
    backRenderer.render(backScene, camera);
    frontRenderer.render(frontScene, camera);
  };

  animate();
};
