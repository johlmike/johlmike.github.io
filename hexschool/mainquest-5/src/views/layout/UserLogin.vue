<template>
  <div>
    <NavBar :isTop="false"></NavBar>
    <div class="user-login">
      使用者登入頁面
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
.user-login {
  margin-top: 3.5rem;
}
</style>
