<template>
  <div class="d-flex flex-row flex-wrap justify-content-between">
    <div v-for="(product, index) in products" :key="'product' + index" class="card">
      <div class="card-top">
        <img :src="product.imageUrl[0]" class="card-img-top" />
      </div>
      <div class="d-flex flex-column justify-content-start card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.content }}</p>
        <div class="card-price">
          <div class="origin-price">{{ `NT\$ ${product.origin_price}` }}</div>
          <div class="price">{{ `NT\$ ${product.price}` }}</div>
        </div>
        <a href="#" class="btn btn-primary btn-add-cart">
          <font-awesome-icon :icon="['fas', 'cart-plus']" class="icon-cart" />
        </a>
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
  padding-top: 2%;
  margin-bottom: 2%;
  border: 1.5px solid rgba(0,0,0,.125);
}
.card-top {
  height: 200px;
  overflow: hidden;
}
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 3rem;
  text-overflow: ellipsis;
  text-align: left;
}
.card-price {
  text-align: left;
}
.origin-price {
  font-size: .8rem;
  color: #bbbbbb;
  text-decoration: line-through;
}
.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #28a745;
}
.btn-add-cart {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.icon-cart {
  position: relative;
  left: -2px;
  bottom: -2px;
}
</style>
