export default `
#ifdef GL_ES
  precision mediump float;
#endif

#define HALF_PI 1.5707963267948966

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = rand(i);
  float b = rand(i + vec2(1.0, 0.0));
  float c = rand(i + vec2(0.0, 1.0));
  float d = rand(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  u = smoothstep(0.,1.,f);
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec2 rotate2d(vec2 _st, float _angle){
  _st -= 0.5;
  _st = mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}
`;