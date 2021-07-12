<template>
  <div class="cart">
    <NavBar :isTop="false"></NavBar>
    <div class="container">
      <div class="cart-table pb-5">
        <div class="cart-table-head row">
          <div class="col-5">商品名稱</div>
          <div class="col-2">數量</div>
          <div class="col-2">單價</div>
          <div class="col-2">小計</div>
        </div>
        <div class="cart-table-body">
          <div v-if="cart.length === 0" class="empty">
            購物車還空空的喔～快去逛逛吧！
          </div>
          <div v-for="(cartItem, index) in cart" :key="'cart_' + index" class="body-item row py-3">
            <div class="col-5 body-item-title">{{ cartItem.product.title }}</div>
            <div class="col-2 body-item-quantity">
              <input
                type="number"
                name="數量"
                min="1"
                v-model.lazy="cartItem.quantity"
                @change="updateCart(index)"
                class="form-control mr-2"
              />
              {{ cartItem.product.unit }}
            </div>
            <div class="col-2 body-item-price">NT$ {{ cartItem.product.price }}</div>
            <div class="col-2 body-item-total">
              NT$ {{ cartItem.product.price * cartItem.quantity }}
            </div>
            <div class="col-1 body-item-delete">
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                class="icon-delete"
                @click="deleteCart(index)"
              />
            </div>
          </div>
        </div>
        <div class="cart-table-footer row">
          <div class="offset-9 col-2">共 NT$ {{ sumPrice }} 元</div>
          <div>
            <button>結帳去</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      cart: [],
    };
  },
  methods: {
    getCart() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.cart = res.data.data;
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    updateCart(index) {
      if (this.cart[index].quantity > 0) {
        // 如果使用者輸入正確的數量(大於 1)，更新購物車
        const loader = this.$loading.show();
        const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
        const data = {
          product: this.cart[index].product.id,
          quantity: this.cart[index].quantity,
        };
        this.axios
          .patch(url, data)
          .then(() => {
            loader.hide();
          })
          .catch((err) => {
            loader.hide();
            console.log(err.response);
          });
      } else {
        // 如輸入 0 或 負數，預設使用者是要將數量減少至 1
        this.cart[index].quantity = 1;
        this.updateCart(index);
      }
    },
    deleteCart(index) {
      const loader = this.$loading.show();
      const productId = this.cart[index].product.id;
      const url = `${this.baseUrl}${this.uuid}/ec/shopping/${productId}`;
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          // 更新本地端購物車
          this.cart.splice(index, 1);
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
  },
  created() {
    this.getCart();
  },
  computed: {
    sumPrice() {
      let sum = 0;
      this.cart.forEach((cartItem) => {
        const cartItemSum = cartItem.product.price * cartItem.quantity;
        sum += cartItemSum;
      });
      return sum;
    },
  },
};
</script>

<style lang="scss" scoped>
$Alabaster: #d8e2dc;
$Pink: #ffcad4;
$DarkPink: #f4acb7;
$DarkerPink: #9d8189;

.cart {
  background-color: $Alabaster;
}
.container {
  padding-top: 5rem;
}
.cart-table {
  background-color: $Alabaster;
  color: $DarkerPink;
  font-weight: bold;
  .cart-table-head {
    border-bottom: 1px solid $DarkerPink;
    padding-bottom: 1rem;
  }
  .cart-table-body {
    .empty {
      height: 50vh;
      line-height: 50vh;
    }
    .body-item {
      .body-item-title,
      .body-item-quantity,
      .body-item-price,
      .body-item-total,
      .body-item-delete {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .body-item-quantity {
        input {
          width: 4rem;
          color: $DarkerPink;
          font-weight: bold;
          text-align: center;
        }
      }
      .body-item-delete {
        justify-content: start;
        .icon-delete {
          color: crimson;
          cursor: pointer;
        }
      }
    }
  }
  .cart-table-footer {
    border-top: 1px solid $DarkerPink;
    padding-top: 1rem;
  }
}
</style>
