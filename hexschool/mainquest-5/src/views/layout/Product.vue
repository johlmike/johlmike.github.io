<template>
  <div>
    <NavBar :isTop="false"></NavBar>
    <div class="about">
      產品頁面
    </div>
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

<style lang="scss" scoped>
.about {
  margin-top: 3.5rem;
}
</style>
