<template>
  <div class="d-flex flex-row flex-wrap justify-content-between">
    <div v-for="(product, index) in products" :key="'product' + index" class="card">
      <img src="../assets/carousel-1.jpg" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">123</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
};
</script>

<style scoped>
.card {
  width: 32%;
  margin-bottom: 2%;
}
</style>
