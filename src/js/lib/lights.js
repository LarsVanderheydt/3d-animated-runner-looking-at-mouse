export default {
  setup: `
    // POINTLIGHT
    #if NUM_POINT_LIGHTS > 0
      struct PointLight {
        vec3 position;
        vec3 color;
        float distance;
        float decay;

        int shadow;
        float shadowBias;
        float shadowRadius;
        vec2 shadowMapSize;
        float shadowCameraNear;
        float shadowCameraFar;
      };

      uniform PointLight pointLights[NUM_POINT_LIGHTS];
    #endif
    /////////////

    // DIRECTIONAL LIGHT
    #if NUM_DIR_LIGHTS > 0
    struct DirectionalLight {
      vec3 direction;
      vec3 color;
      int shadow;
      float shadowBias;
      float shadowRadius;
      vec2 shadowMapSize;
      };
      uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];
    #endif
    /////////////

    // HEMISPHERELIGHT
    #if NUM_HEMI_LIGHTS > 0
      struct HemisphereLight {
        vec3 direction;
        vec3 skyColor;
        vec3 groundColor;
      };
      uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];
    #endif
    /////////////
  `,


  main: `
    /* LIGHTS */

    // POINTLIGHT
    #if NUM_POINT_LIGHTS > 0
      vec4 addedPointLights = vec4(0.0, 0.0, 0.0, 1.0);
      for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
        vec3 lightDirection = normalize(vecPos - pointLights[l].position);
        addedPointLights.rgb += clamp(dot(-lightDirection, vecNormal), 0.0, 1.0) * pointLights[l].color;
      }

      gl_FragColor = mat * addedPointLights;
    #endif
    ////////////

    // DIRECTIONALIGHT
    #if NUM_DIR_LIGHTS > 0
      vec4 lightColor = vec4(0.0, 0.0, 0.0, 1.0);
      for(int l = 0; l < NUM_DIR_LIGHTS; l++) {
        vec3 lightDirection = directionalLights[l].direction;
        lightColor.rgb += clamp(dot(lightDirection, vecNormal), 0.0, 1.0) * directionalLights[l].color;
      }

      gl_FragColor += mat * lightColor;
    #endif
    ////////////

    // HEMISPHERELIGHT
    #if NUM_HEMI_LIGHTS > 0
      vec4 hemiColor = vec4(0.0, 0.0, 0.0, 1.0);
      for(int l = 0; l < NUM_HEMI_LIGHTS; l++) {
        vec3 lightDirection = hemisphereLights[l].direction;
        hemiColor.rgb += clamp(dot(lightDirection, vecNormal), 0.0, 1.0) * hemisphereLights[l].skyColor;
      }

      gl_FragColor += mat * hemiColor;
    #endif
    /////////////


    #if NUM_POINT_LIGHTS <= 0 && NUM_DIR_LIGHTS <= 0 && NUM_HEMI_LIGHTS <= 0
      gl_FragColor = mat;
    #endif
  `
};