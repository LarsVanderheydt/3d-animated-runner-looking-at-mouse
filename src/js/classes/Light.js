import * as THREE from 'three';

export default class Light {
  constructor() {
    this.group = new THREE.Group();

    var geometry = new THREE.SphereGeometry(.5, 10, 10);
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100

    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.set( 0, 0, 3 );
    // this.group.add(this.sphere);

    this.light = new THREE.PointLight( 0xff0000, 2, 50, 2 );
    this.light.position.set( 0, 0, 3 );
    this.group.add(this.light);
  }

  followMouse(pos) {
    this.group.position.x = pos.x;
    this.group.position.y = pos.y;
    // this.group.position.z = -pos.y;// * this.offset;
  }
}