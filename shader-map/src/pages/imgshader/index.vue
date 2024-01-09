<template>
    <div id="sketch1"></div>
    <div class="loader-screen">
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
    <div class="gallery">
        <img class="gallery-item" :src="img1" crossorigin="anonymous" alt="" />
        <img class="gallery-item" :src="img2" crossorigin="anonymous" alt="" />
        <img class="gallery-item" :src="img3" crossorigin="anonymous" alt="" />
        <img class="gallery-item" :src="img4" crossorigin="anonymous" alt="" />
        <img class="gallery-item" :src="img5" crossorigin="anonymous" alt="" />
    </div>
</template>
<script lang="ts" setup>
import img1 from "/textures/1.jpg";
import img2 from "/textures/2.jpg";
import img3 from "/textures/3.jpg";
import img4 from "/textures/4.jpg";
import img5 from "/textures/5.jpg";
import * as kokomi from "kokomi.js";
import * as THREE from "three";
import World from '@/pages/imgshader/world.js'
import Postprocessing from "@/pages/imgshader/Postprocessing.js";
import Debug from "@/debug/Debug";
import {onMounted} from 'vue'
import resources from "@/shader/resources";
class Experience extends kokomi.Base {
  constructor(sel = "#sketch1") {
    super(sel);
    window.experience = this;

    this.debug = new Debug();
    this.am = new kokomi.AssetManager(this, resources);
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    this.world = new World(this);

    this.postprocessing = new Postprocessing(this);
    this.postprocessing.addExisting();
    this.update(() => {
      this.postprocessing.ce.customPass.material.uniforms.uRGBShift.value =
        Math.abs(this.world.slider?.ws.scroll.delta) * 0.0004;
    });
  }
}

onMounted(() => {
  new Experience("#sketch1");
})

</script>
<style lang="less">
body {
    margin: 0;
    overflow: hidden;
}

#sketch1 {
    width: 100vw;
    height: 100vh;
    background: black;
}

#sketch1 {
    position: fixed;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
}

.gallery {
    position: relative;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.gallery .gallery-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 60vh;
    opacity: 0;
}

.loading span {
    animation: blur 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
}

@keyframes blur {
    to {
        filter: blur(2px);
    }
}
    
</style>