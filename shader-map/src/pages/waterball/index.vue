<template>
    <div id="sketch2">
        
    </div>
</template>
<script lang="ts" setup>
import * as kokomi from "kokomi.js";
import WaterWorld from '@/pages/waterball/world.js'
import {onMounted} from 'vue'
class Experiencewaterball extends kokomi.Base {
  constructor(sel = "#sketch2") {
    super(sel);
    window.experiencewaterball = this;
    
    
    // this.am = new kokomi.AssetManager(this, resources);
    this.camera.position.set(0, 0, 5);
    new kokomi.OrbitControls(this)

    this.waterWorld = new WaterWorld(this);
  }
}
onMounted(() => {
  new Experiencewaterball("#sketch2");
})
</script>
<style lang="less">

#sketch2 {
    position: fixed;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
}
</style>