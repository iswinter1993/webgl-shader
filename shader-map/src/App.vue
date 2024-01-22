<script setup lang="ts">

</script>

<template>
  <RouterLink to="/" class="balllink">球</RouterLink>
  <RouterLink to="/img" class="imglink">图片</RouterLink>
  <RouterView/>
</template>

<style scoped lang="less">
.balllink,.imglink{
position: absolute;
}
.imglink{
  left: 30px;
}
</style>
