export default {
  template: `
    <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="productModal"
      aria-hidden="true" id="productModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-4">
                  <!-- 一次最多上傳五張圖片 -->
                  <template v-for="index in 5">
                    <div class="form-group" :key="product.id + '_' + index">
                      <label :for="'imageUrl' + '_' + index">圖片網址</label>
                      <input type="text" :id="'imageUrl' + '_' + index" class="form-control"
                        v-model.lazy="product.imageUrl[index-1]"
                        @change.lazy="product.imageUrl = filterImageUrl">
                    </div>
                    <img v-show="product.imageUrl[index-1]" :src="product.imageUrl[index-1]"
                      :alt="product.title + '_' +  index" class="img-fluid mb-2">
                  </template>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">商品名稱</label>
                    <input type="text" name="title" id="title" class="form-control" v-model="product.title">
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label for="category">商品分類</label>
                        <input type="text" name="category" id="category" class="form-control"
                          v-model="product.category">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="stock">庫存</label>
                        <input type="number" name="stock" id="stock" class="form-control"
                          v-model.number="product.options.stock" min="0">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="unit">單位</label>
                        <input type="text" name="unit" id="unit" class="form-control" v-model="product.unit">
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label for="origin_price">原價</label>
                        <input type="number" name="origin_price" id="origin_price" class="form-control"
                          v-model.number="product.origin_price" min="0">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="price">售價</label>
                        <input type="number" name="price" id="price" class="form-control"
                          v-model.number="product.price"
                          min="0">
                      </div>
                    </div>
                    <div class="col">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <label for="content">商品敘述</label>
                      <textarea class="form-control" id="content" rows="3" v-model="product.content"></textarea>
                    </div>
                    <div class="col">
                      <label for="description">商品說明</label>
                      <textarea class="form-control" id="description" rows="3"
                        v-model="product.description"></textarea>
                    </div>
                  </div>
                  <div class="form-row mt-3">
                    <div class="col">
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="enabled"
                          v-model="product.enabled">
                        <label class="custom-control-label" for="enabled">是否上架？</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="hot"
                          v-model="product.options.hot">
                        <label class="custom-control-label" for="hot">是否為熱門商品？</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="save('edit')" v-show="!isCreating">儲存修改</button>
            <button type="button" class="btn btn-primary" @click="save('new')" v-show="isCreating">新增商品</button>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    product: Object,
    isCreating: Boolean,
  },
  data() {
    return {
    };
  },
  methods: {
    save(mode) {
      this.$emit('save', mode, this.product);
    },
  },
  computed: {
    filterImageUrl() { // 清理陣列內的空值
      return this.product.imageUrl.filter(url => url);
    },
  },
}