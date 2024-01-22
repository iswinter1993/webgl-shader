<script setup lang="ts">

</script>

<template>
  <RouterLink to="/" class="balllink">球</RouterLink>
  <RouterLink to="/img" class="imglink">图片</RouterLink>
  <RouterLink to="/ball" class="waterlink">水球</RouterLink>
  <RouterLink to="/mesh" class="imgballlink">图片球</RouterLink>
  <RouterView/>
</template>

<style scoped lang="less">
.balllink,.imglink,.waterlink,.imgballlink{
position: absolute;
}
.imglink{
  left: 30px;
}
.waterlink{
  left: 90px;
}
.imgballlink{
  left: 150px;
}
</style>
