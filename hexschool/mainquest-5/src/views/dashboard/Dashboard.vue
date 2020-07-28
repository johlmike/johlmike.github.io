<template>
  <div class="dashboard">
    <DNavbar></DNavbar>
    <router-view />
  </div>
</template>

<script>
import DNavbar from '@/components/DNavbar.vue';

export default {
  components: {
    DNavbar,
  },
};
</script>

<style>
.dashboard {
  min-height: 100vh;
}
</style>
