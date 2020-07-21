<template>
  <div id="app">
    <router-view :isTop="isTop" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTop: true,
    };
  },
  methods: {
    updateScroll() {
      if (window.scrollY) {
        // 已滑動
        this.isTop = false;
      } else {
        this.isTop = true; // 最上方
      }
    },
  },
  mounted() {
    // 監聽 scroll 事件，調整滑動提示和導覽列的顯示
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>

<style lang="scss">
#app {
  font-family: '微軟正黑體', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #D8E2DC;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
