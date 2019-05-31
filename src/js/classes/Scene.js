import * as THREE from 'three';

export default class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap; // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap
    this.renderer.shadowMap.renderReverseSided = true;
    this.camera.position.z = 10;
    this.camera.position.y = 3;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);


    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.4);
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    const shadowLight = new THREE.DirectionalLight(0xffffff, .5);
    shadowLight.position.set(10, 0, 10);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -500;
    shadowLight.shadow.camera.right = 500;
    shadowLight.shadow.camera.top = 500;
    shadowLight.shadow.camera.bottom = -500;
    shadowLight.shadow.camera.near = -.5;
    shadowLight.shadow.camera.far = 5000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    hemisphereLight.position.x = -3;
    shadowLight.name = 'shadowLight';
    hemisphereLight.name = 'hemisphereLight';
    ambientLight.name = 'ambientLight';
    ambientLight.position.x = -20;

    this.scene.add(shadowLight);
    this.scene.add(hemisphereLight);
    // this.scene.add(ambientLight);
    this.scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);


    this.camera.name = 'camera';
  }

  followMouse(xTarget, yTarget) {
    const speed = 20;
    const xPos = this.normalize(xTarget, -500, 500, 500, -500);
    const yPos = this.normalize(yTarget, -500, 500, -500, 500);

    this.camera.rotation.y += (xPos - this.camera.rotation.y) / speed;
    this.camera.rotation.x += (-yPos - this.camera.rotation.x) / speed;
  }

  onScrollWheel() {
    window.addEventListener('wheel', e => {
      // this.camera.position.x += e.deltaY / 1000;
      this.camera.position.y -= e.deltaY / 2700;
      this.camera.position.z += e.deltaY / 800;
    });
  }

  normalize(v, vmin, vmax, tmin, tmax) {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + (pc * dt);
    return tv;
  }
}