import * as THREE from 'three';
import '../lib/GLTFLoader';
import Shader from './ShaderMaterial';

export default class Anim {

  constructor(scene) {
    const loader = new THREE.GLTFLoader();
    this.mixer;
    this.clock = new THREE.Clock();
    this.mesh, this.neck;
    this.vec = new THREE.Vector3();
    this.mousePos = {
      x: 0,
      y: 0
    };

    document.addEventListener(`mousemove`, event => {
      this.mousePos = {
        x: event.clientX,
        y: event.clientY
      };
    }, false);

    loader.load(
      // './assets/glb/position.glb',
      './assets/glb/human.glb',
      (gltf) => {
        const material = new THREE.MeshPhongMaterial({
          color: 0x4C4CFF,
          skinning: true,
          shininess: 100
        });
        const shader = new Shader('lights');

        const animations = gltf.animations;
        if (animations && animations.length) {
          this.mixer = new THREE.AnimationMixer(gltf.scene);

          for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            const action = this.mixer.clipAction(animation);
            action.play();
          }
        }

        const update = (timestamp) => {
          const mixerUpdateDelta = this.clock.getDelta();
          this.mixer.update(mixerUpdateDelta);
          requestAnimationFrame(update);

          this.vec.set(
            (this.mousePos.x / window.innerWidth) * 2 - 1,
            -(this.mousePos.y / window.innerHeight) * 2 + 1,
            0.5
          );

          shader.draw(timestamp, this.vec);

        };

        update();

        gltf.scene.traverse(( node ) => {
          node.receiveShadow = true;

          if ( node instanceof THREE.Mesh ) {
            node.material = shader.material;
            // node.material = material;
          }
        });

        this.mesh = gltf.scene.children[0];
        this.mesh.position.x = -.5;
        this.mesh.position.y = -9;
        this.mesh.position.z = -10;
        this.mesh.scale.set(.1, .1, .1);
        scene.add(this.mesh);


        // find the neck
        this.neck = this.mesh.children[0].children[2].children[0].children[0].children[0];
      },

      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      (error) => {
        console.log(error);
        console.log('An error happened');
      }
    );
  }

  normalize(v, vmin, vmax, tmin, tmax) {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + (pc * dt);
    return tv;
  }

  onScrollWheel() {
    window.addEventListener('wheel', e => {
      this.mesh.position.x += e.deltaY / 500;
      this.mesh.rotation.z += e.deltaY / 3000;
    });
  }

  followMouse(pos) {
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.mesh.position.z = -pos.y;
  }

  lookAtMouse(xTarget, yTarget) {
    const xPos = this.normalize(xTarget, 0, 900, - 0.8, 0.8);
    const yPos = this.normalize(yTarget, 0, 760, - 0.2, 0.8);

    if (this.mesh) {
      this.neck.rotation.y = xPos;
      this.neck.rotation.x = yPos;
    }
  }
}