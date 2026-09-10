import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const templateLanding = (container: HTMLElement) => {
  container.innerHTML = `
    <div>
      <h1>Landing works!</h1>
      <canvas id="three-container"></canvas>
    </div>
  `;

  const canvas = container.querySelector("#three-container") as HTMLElement;
  const scene = new THREE.Scene();

  let mixer: THREE.AnimationMixer;
  const timer = new THREE.Timer();
  timer.connect(document);

  const loader = new GLTFLoader();
  loader.load(
    "/models/wiz.gltf",
    (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);

      mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();
    },
    (err) => {
      console.error(err);
    },
  );

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(-9, 8, 14);
  camera.rotation.set(-0.18, -0.63, -0.1);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio));
  renderer.shadowMap.enabled = true;

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const animate = () => {
    requestAnimationFrame(animate);
    timer.update();
    if (mixer) {
      mixer.update(timer.getDelta());
    }
    renderer.render(scene, camera);
    console.log(
      `pos: ${camera.position.x}, ${camera.position.y},${camera.position.z}`,
    );
    console.log(
      `dir: ${camera.rotation.x}, ${camera.rotation.y},${camera.rotation.z}`,
    );
  };

  animate();
};
