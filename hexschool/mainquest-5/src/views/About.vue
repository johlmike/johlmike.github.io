<template>
  <div class="about">
    <NavBar :isTop="false"></NavBar>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
</style>
