<template>
  <div>
    <NavBar :isTop="false"></NavBar>
    <div class="product h-100 vh-100 container">
      <div class="row product-header">
        <div class="col-6 header-left"></div>
        <div class="col-6 header-right">
          <h2>{{ product.title }}</h2>
          <div>
            <hr />
          </div>
          <div class="col header-right-desc">
            <div class="text-left">
              <h5 class="mb-3">商品類型：{{ product.category }}</h5>
              <h5 class="mb-3">商品庫存：{{ product.options.stock }} {{ product.unit }}</h5>
              <h5 class="text-justify">商品簡介：{{ product.content }}</h5>
            </div>
            <div class="text-right desc-price">
              <span class="origin-price">原價： {{ product.origin_price }} 元</span>
              <span class="sale-price">售價： {{ product.price }} 元</span>
              <form class="form-inline justify-content-end mt-2">
                <button class="btn btn-link mr-auto" type="button" @click="$router.go(-1)">
                  返回上一頁
                </button>
                <input
                  type="number"
                  name="數量"
                  min="1"
                  :max="product.options.stock"
                  v-model.lazy.number="quantity"
                  @change="controlQuantity"
                  class="form-control mr-2 col-md-3 text-center"
                />
                <!-- 顏色暫時不調整，因日後會重新調整網站配色 -->
                <button class="btn btn-primary" @click.prevent="addCart">加入購物車</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row product-body">
        <div class="col">{{ product.description }}</div>
      </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="success-modal">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">加入成功！</h5>
          </div>
          <div class="modal-body">
            <p>{{ successMsg }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="error-modal">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">加入失敗</h5>
          </div>
          <div class="modal-body">
            <p>{{ errorMsg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import $ from 'jquery';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      productId: this.$route.params.id,
      product: {
        imageUrl: [''],
        options: {
          stock: 0,
          hot: false,
        },
      },
      quantity: 1,
      cart: [],
      successMsg: '',
      errorMsg: '',
    };
  },
  methods: {
    getProduct() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/product/${this.productId}`;
      this.axios.get(url).then((res) => {
        loader.hide();
        this.product = res.data.data;
        // 轉換 options 回object
        this.product.options = JSON.parse(this.product.options);
        const background = `background-image: url('${this.product.imageUrl[0]}');`;
        document.querySelector('.header-left').style.cssText = background;
      });
    },
    controlQuantity() {
      // 檢查使用者是否自己輸入負數或超過庫存
      if (this.quantity > this.product.options.stock) {
        this.quantity = Number(this.product.options.stock);
      } else if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
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
    addCart() {
      // 檢查是否已有在購物車
      if (this.cart.find((cartItem) => cartItem.product.id === this.productId)) {
        // 檢查到重複，改用update
        this.updateCart();
      } else {
        // 沒有重複，新增商品至購物車
        const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
        const data = {
          product: this.productId,
          quantity: this.quantity,
        };
        const loader = this.$loading.show();
        this.axios
          .post(url, data)
          .then((res) => {
            loader.hide();
            // 更新本地端之購物車內容
            this.cart.unshift(this._.cloneDeep(res.data.data));
            // 更新加入購物車成功訊息
            this.successMsg = `目前購物車內有 ${this.quantity} ${this.product.unit}商品`;
            $('#success-modal').modal('show');
            setTimeout(() => {
              $('#success-modal').modal('hide');
            }, 2000);
          })
          .catch((err) => {
            loader.hide();
            console.log(err.response);
          });
      }
    },
    updateCart() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
      const updateProduct = this.cart.find((cartItem) => cartItem.product.id === this.productId);
      const updateProductQuantity = updateProduct.quantity;
      let addingQuantity = this.quantity;
      if (this.quantity + updateProductQuantity > this.product.options.stock) {
        addingQuantity = this.product.options.stock;
      } else {
        addingQuantity = this.quantity + updateProductQuantity;
      }
      const data = {
        product: this.productId,
        quantity: addingQuantity,
      };
      this.axios
        .patch(url, data)
        .then(() => {
          loader.hide();
          // 更新本地端購物車資訊
          updateProduct.quantity = addingQuantity;
          // 更新加入購物車成功訊息
          this.successMsg = `目前購物車內有 ${addingQuantity} ${this.product.unit}商品`;
          $('#success-modal').modal('show');
          setTimeout(() => {
            $('#success-modal').modal('hide');
          }, 2000);
        })
        .catch((err) => {
          loader.hide();
          if (err.response.data.errors[0] === 'quantity 並沒有任何更改。') {
            this.errorMsg = '購物車之商品數量已達庫存上限';
          }
          $('#error-modal').modal('show');
          setTimeout(() => {
            $('#error-modal').modal('hide');
          }, 2000);
          console.log(err.response);
        });
    },
  },
  created() {
    this.getProduct();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.product {
  padding-top: 4rem;
  .product-header {
    .header-left {
      height: 25rem;
      background-position: center;
      background-repeat: no-repeat;
    }
    .header-right {
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
      line-height: 3rem;
      .header-right-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .desc-price {
          line-height: 2rem;
          .origin-price {
            margin-right: 1rem;
            font-size: 1rem;
            color: #aaaaaa;
            text-decoration: line-through;
          }
          .sale-price {
            font-weight: bold;
          }
        }
      }
    }
  }
  .product-body {
    white-space: pre-line;
  }
}
</style>
