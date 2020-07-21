<template>
  <div class="d-flex flex-row flex-wrap justify-content-start">
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
        <a href="#" class="btn btn-primary btn-add-cart" @click.prevent="openAddCartModal(product)">
          <font-awesome-icon :icon="['fas', 'cart-plus']" class="icon-cart" />
        </a>
      </div>
    </div>
    <div
      class="modal fade addCartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addCartModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{addingProduct.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src=" addingProduct.imageUrl ? addingProduct.imageUrl[0] : '' "
              :alt="addingProduct.title"
            />
            <div class="d-flex justify-content-center align-items-center">
              <font-awesome-icon
                :icon="['fas', 'minus-square']"
                class="icon-quantity"
                @click="addingQuantity--"
              />
              <input class="input-quantity" type="number" v-model.number="addingQuantity" />
              <font-awesome-icon
                :icon="['fas', 'plus-square']"
                class="icon-quantity"
                @click="addingQuantity++"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    products: Array,
  },
  data() {
    return {
      addingProduct: {},
      addingQuantity: 0,
    };
  },
  methods: {
    openAddCartModal(product) {
      this.addingProduct = product;
      this.addingQuantity = 0;
      $('.addCartModal').modal('show');
    },
    addCart(product, quantity) {
      this.$emit('add-cart', product, quantity);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  font-weight: bold;
}
.card {
  width: 32%;
  padding-top: 2%;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1.5px solid rgba(0, 0, 0, 0.125);
}
.card-top {
  height: 200px;
  overflow: hidden;
  img {
    width: 99%;
  }
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
  font-size: 0.8rem;
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
.icon-quantity {
  font-size: 1.2rem;
  cursor: pointer;
}
.input-quantity {
  text-align: center;
  width: 3rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
// 隱藏 input type=number 的箭頭
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
