import '../css/style';
import * as THREE from 'three';

import Scene from './classes/Scene';
import Aminolabs from './classes/Aminolabs';
import Light from './classes/Light';

const world = new Scene();
const {
  scene,
  camera,
  renderer
} = world;

let WIDTH, HEIGHT;
let windowHalfX, windowHalfY;
let amino, pos, vec, sphere, light, mousePos = {
  x: 0,
  y: 0
};


const draw = () => {
  requestAnimationFrame(draw);

  // Map mouse position to world vector
  vec.set(
    (mousePos.x / window.innerWidth) * 2 - 1, // x
    -(mousePos.y / window.innerHeight) * 2 + 1, // Y
    0.5 // Z
  );

  vec.unproject(camera);
  vec.sub(camera.position).normalize();
  const distance = -camera.position.z / vec.z;
  pos.copy(camera.position).add(vec.multiplyScalar(distance));
  //////////


  light.followMouse(pos);
  if (amino) amino.lookAtMouse(mousePos.x, mousePos.y);

  renderer.render(scene, camera);
};

const getWidthHeight = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  document.addEventListener(`mousemove`, event => {
    mousePos = {
      x: event.clientX,
      y: event.clientY
    };
  }, false);
};

const setup = () => {
  getWidthHeight();
  window.scene = scene;
  window.THREE = THREE;
  scene.name = 'scene';

  // Mouse vector setup
  vec = new THREE.Vector3(); // create once and reuse
  pos = new THREE.Vector3(); // create once and reuse
  /////////////


  // Lightbulb that will follow the mouse
  light = new Light();
  scene.add(light.group);
  /////////////


  // Background
  const geometry = new THREE.SphereGeometry(40, 40, 40);
  const material = new THREE.MeshPhongMaterial({
    color: 0x42f4e8
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.y = 180 / 180;
  sphere.receiveShadow = true;
  sphere.material.side = THREE.DoubleSide;
  sphere.position.x = -.3;
  sphere.position.y = 3.5;
  scene.add(sphere);
  /////////////


  // animated object
  amino = new Aminolabs(scene);
  ////////////
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const init = () => {
  setup();
  draw();
  window.addEventListener('resize', onWindowResize, false);
};

init();