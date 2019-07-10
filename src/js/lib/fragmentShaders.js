import Easing from './easings';
import Lights from './lights';
import Helpers from './shaderHelpers';

export default {
  lights: `
    #include <common>
    ${ Helpers }

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    varying vec2 vUv;
    varying vec3 vecPos;
    varying vec3 vecNormal;

    ${ Lights.setup }

    void main() {
      vec2 position = vUv;
      vec2 st = position;
      // vec2 st = gl_FragCoord.xy / u_resolution;

      vec2 pos = vec2(st * 30.0);
      pos = rotate2d( st, noise(pos) ) * pos; // rotate the space
      pos -= u_time;
      float n = noise(pos);

      vec3 color = vec3(n);
      vec4 mat = vec4(color, 1.0);

      // make sure this is the last import + color needs to be named mat and has to be a vec4
      ${ Lights.main }
    }`,



  lava: `
    #include <common>
    ${ Helpers }

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    varying vec2 vUv;
    varying vec3 vecPos;
    varying vec3 vecNormal;

    ${ Easing.easing }
    ${ Lights.setup }

    void main() {
      // vec2 position = vUv;
      // vec2 st = position;

      vec2 st = gl_FragCoord.xy / u_resolution;


      vec2 pos = vec2(st * 10.0);
      pos = rotate2d( st, noise(pos) ) * pos; // rotate the space
      pos -= linear(u_time);
      float n = noise(pos);

      vec3 color = vec3(n * 2.0, n * 0.5, 0.0);
      vec4 mat = vec4(color, 1.0);

      // make sure this is the last import + color needs to be named mat and has to be a vec4
      ${ Lights.main }
    }`,
};