<script setup lang="ts">
import { onMounted,ref } from "vue";
import * as kokomi from "kokomi.js";
import * as THREE from "three";
import Debug from "@/debug/Debug";
import resources from "@/shader/resources";
import vertexShader from "@/shader/vertexShader.glsl";
import fragmentShader from "@/shader/fragmentShader.glsl";

const showloading = ref(true)
class Sketch extends kokomi.Base {
  create() {
    const envmap = new THREE.CubeTextureLoader().load([
      "https://s2.loli.net/2022/09/29/X8TDZROlUo6uAyG.png",
      "https://s2.loli.net/2022/09/29/KYEJ9ylQNIe6h4R.png",
      "https://s2.loli.net/2022/09/29/GqseLg6tWoluDzV.png",
      "https://s2.loli.net/2022/09/29/LUk8P21MJG6AtNF.png",
      "https://s2.loli.net/2022/09/29/4BO1JHoM3phFCb7.png",
      "https://s2.loli.net/2022/09/29/5NvAxfCVqlKFRZU.png",
    ]);
    const params = {
      uDistort: {
        value: 1,
      },
    };
    this.debug = new Debug(this);
    this.am = new kokomi.AssetManager(this, resources);
    this.camera.position.set(0, 0, 5);
    new kokomi.OrbitControls(this);


    const geometry = new THREE.SphereGeometry(2, 64, 64);
    //   const geometry = new THREE.PlaneGeometry(4, 4);
    console.log(geometry);
    const material = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ vertexShader,
      fragmentShader: /* glsl */ fragmentShader,
      // transparent: true,
      // blending: THREE.AdditiveBlending,
      // depthWrite: false,
      uniforms: {
        iChannel0: {
          value: envmap,
        },
        uPixelRatio: {
          value: this.renderer.getPixelRatio(),
        },
      },
    });
    console.log(material);

    

    // const points = new THREE.Points(geometry, material);
    // this.scene.add(points);


    const uj = new kokomi.UniformInjector(this);
    material.uniforms = {
      ...material.uniforms,
      ...uj.shadertoyUniforms,
      ...params
    };

    this.am.on('ready',()=>{
      const skybox = this.am.items["skybox"];
      skybox.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = skybox;
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    })
    if (this.debug.active) {
      const debugFolder = this.debug.ui.addFolder("testObject");
      debugFolder
      .add(params.uDistort, "value")
      .min(0)
      .max(2)
      .step(0.01)
      .name("distort");
    }
    this.update(() => {
      uj.injectShadertoyUniforms(material.uniforms);
    });
  }
}

onMounted(() => {
 
  const sketch = new Sketch("#sketch");
  sketch.create();
  setTimeout(() => {
    showloading.value=false
  }, 3000);
});
</script>

<template>
  <div id="sketch"></div>
  <div :class="showloading?'loader-screen':'loader-screen hollow'">
    <div class="loading-container">
        <div class="loading">
            <span style="--i: 0">L</span>
            <span style="--i: 1">O</span>
            <span style="--i: 2">A</span>
            <span style="--i: 3">D</span>
            <span style="--i: 4">I</span>
            <span style="--i: 5">N</span>
            <span style="--i: 6">G</span>
        </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#sketch {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}
</style>
