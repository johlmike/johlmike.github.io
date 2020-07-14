export default {
  template: `
    <div class="row mt-3">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>編號</th>
            <th>分類</th>
            <th>商品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>庫存</th>
            <th>單位</th>
            <th>上架</th>
            <th>熱門</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,index) in products" :key="'product_' + index">
            <!-- 一頁商品數量目前固定為25個，故顯示之編號也要調整 -->
            <td scope="row" class="align-middle">{{25 * (page - 1) + index + 1}}</td>
            <td class="align-middle">{{product.category}}</td>
            <td class="align-middle">{{product.title}}</td>
            <td class="align-middle">{{product.origin_price}}</td>
            <td class="align-middle">{{product.price}}</td>
            <td class="align-middle">{{product.options.stock}}</td>
            <td class="align-middle">{{product.unit}}</td>
            <td class="align-middle">
              <vs-switch v-model="product.enabled" @input="updateProduct($event, index)"></vs-switch>
            </td>
            <td class="align-middle text-center">
              <i class="fas fa-fire hot-icon" @click="toggleHot(index, false)" v-show="product.options.hot"></i>
              <i class="fal fa-fire hot-icon" @click="toggleHot(index, true)" v-show="!product.options.hot"></i>
            </td>
            <td class="align-middle">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary" @click="toggleModal(index)">編輯</button>
                <button type="button" class="btn btn-outline-danger" @click="deleteProduct(index)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  props: {
    products: Array,
    page: Number
  },
  data() {
    return {
      styles: {},
    };
  },
  methods: {
    updateProduct(evt, index) {
      this.$emit('update-product', evt, index);
    },
    toggleModal(index) {
      this.$emit('toggle-modal', index);
    },
    toggleHot(index, hot) {
      this.$emit('toggle-hot', index, hot);
    },
    deleteProduct(index) {
      this.$emit('delete-product', index);
    }
  }
}