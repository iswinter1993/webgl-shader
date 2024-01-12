import * as kokomi from "kokomi.js";
import * as THREE from "three";
import frag from '@/shader/waterball/frag.glsl'
import vert from '@/shader/waterball/vert.glsl'
export default class Waterball extends kokomi.Component {
    constructor(base){
        super(base)

        const colorParams = {
          themeColor: "#e9d5bb",
          lightColor:'#ff0000',
          light2Color:"#9743fe",
        };
        const params = {
            uDistort: {
              value: .5,
            },
            uFrequency: {
              value: 10,
            },
            uLight2Intensity:{
              value:.9
            },
            uLightIntensity:{
              value:.9
            },
            uFresnelIntensity:{
              value:.9
            }
          };
          const RADIUS = 1.001;
          const SEGMENTS = 256.001;
          const geometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, SEGMENTS);
          // const geometry = new THREE.PlaneGeometry(
          //   RADIUS * 2,
          //   RADIUS * 2,
          //   SEGMENTS,
          //   SEGMENTS
          // );
          // const geometry = new THREE.PlaneGeometry(4, 4);
          const material = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            defines: {
              RADIUS,
              SEGMENTS,
            },
          });

          
          this.material = material;
          const mesh = new THREE.Mesh(geometry, material);
          this.mesh = mesh;
          this.base.scene.background = new THREE.Color(colorParams.themeColor);
      
          const uj = new kokomi.UniformInjector(this.base);
          this.uj = uj;
          material.uniforms = {
            ...material.uniforms,
            ...uj.shadertoyUniforms,
            ...params,
            uThemeColor: {
              value: new THREE.Color(colorParams.themeColor),
            },
            uLightColor: {
              value: new THREE.Color(colorParams.lightColor),
            },
            uLight2Color: {
              value: new THREE.Color(colorParams.light2Color),
            },
          };
          
    }
    addExisting() {
        this.container.add(this.mesh);
      }
      update() {
        this.uj.injectShadertoyUniforms(this.material.uniforms);
      }
}