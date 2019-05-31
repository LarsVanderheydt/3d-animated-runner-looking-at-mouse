import * as THREE from 'three';

export default class Cube {
  constructor() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const colors = [
      0xdd3737,
      0x4ed9e0,
      0x4ee05d,
      0xd94ee0
    ];

    const material = new THREE.MeshPhongMaterial( { color: 0xffffff  } );
    // const material = new THREE.MeshPhongMaterial( { color: colors[Math.floor(Math.random() * colors.length - 1)]  } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.offset = 12.5;
    this.x = this.mesh.position.x;
    this.y = this.mesh.position.y;
  }

  rotate() {
    this.mesh.rotation.y += .03;
    this.mesh.rotation.x -= .03;
  }

  lookAtMouse(xTarget, yTarget) {
    const speed = 20;
    const xPos = this.normalize(xTarget, - 200, 200, - 0.6, 0.6);
    const yPos = this.normalize(yTarget, - 200, 200, 0.6, - 0.6);

    this.mesh.rotation.y += (xPos - this.mesh.rotation.y) / speed;
    this.mesh.rotation.x += (-yPos - this.mesh.rotation.x) / speed;
  }

  followMouse(pos) {
    this.mesh.position.x = pos.x * this.offset;
    this.mesh.position.y = pos.y * this.offset;
    this.mesh.position.z = pos.z * this.offset;
  }

  followMouseWithEase(pos) {
    pos.x *= this.offset;
    pos.y *= this.offset;
    pos.z *= this.offset;

    const distX = pos.x - this.mesh.position.x;
    const distY = pos.y - this.mesh.position.y;
    const distZ = pos.z - this.mesh.position.z;

    this.mesh.position.x = this.mesh.position.x + distX / 10;
    this.mesh.position.y = this.mesh.position.y + distY / 10;
    this.mesh.position.z = this.mesh.position.z + distZ / 10;
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
