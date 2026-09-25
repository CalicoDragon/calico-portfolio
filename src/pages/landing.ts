import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { navigate } from "../utils/router.ts";

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
      scene.add(gltf.scene);

      // animation
      mixer = new THREE.AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();

      gltf.scene.traverse((object) => {
        if (object.name === "Lantern")
          object.userData = { route: "/portfolio" };
        if (object.name === "aboutclick") object.userData = { route: "/about" };
      });
    },
    (err) => {
      console.error(err);
    },
  );

  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(-13, 3, 25);
  camera.rotation.set(0.15, -0.9, 0);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio));
  renderer.shadowMap.enabled = true;

  scene.add(new THREE.AmbientLight(0xffffff, 3));
  scene.background = new THREE.Color(0x0c0b0b);

  const animate = () => {
    requestAnimationFrame(animate);
    timer.update();
    if (mixer) {
      mixer.update(timer.getDelta());
    }
    renderer.render(scene, camera);
  };

  animate();

  // Buttons
  const raycaster = new THREE.Raycaster();

  // Click
  document.addEventListener("mousedown", (event) => {
    const intersections = getMouseIntersections(event);
    if (intersections.length > 0) {
      navigate(intersections[0].object.userData.route);
    }
  });

  // Hover
  document.addEventListener("mousemove", (event) => {
    const intersections = getMouseIntersections(event);
    if (intersections.length > 0 && intersections[0].object.userData.route) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  });

  const getMouseIntersections = (event: MouseEvent) => {
    const coords = new THREE.Vector2(
      (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      (event.clientY / renderer.domElement.clientHeight) * -2 + 1,
    );
    raycaster.setFromCamera(coords, camera);

    return raycaster.intersectObjects(scene.children, true);
  };
};
