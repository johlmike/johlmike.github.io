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
                    <div class="form-group" :key="editingProduct.id + '_' + index">
                      <label :for="'imageUrl' + '_' + index">圖片網址</label>
                      <input type="text" :id="'imageUrl' + '_' + index" class="form-control"
                        v-model.lazy="editingProduct.imageUrl[index-1]"
                        @change.lazy="editingProduct.imageUrl = filterImageUrl">
                    </div>
                    <img v-show="editingProduct.imageUrl[index-1]" :src="editingProduct.imageUrl[index-1]"
                      :alt="editingProduct.title + '_' +  index" class="img-fluid mb-2">
                  </template>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">商品名稱</label>
                    <input type="text" name="title" id="title" class="form-control" v-model="editingProduct.title">
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label for="category">商品分類</label>
                        <input type="text" name="category" id="category" class="form-control"
                          v-model="editingProduct.category">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="stock">庫存</label>
                        <input type="number" name="stock" id="stock" class="form-control"
                          v-model.number="editingProduct.options.stock" min="0">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="unit">單位</label>
                        <input type="text" name="unit" id="unit" class="form-control" v-model="editingProduct.unit">
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <div class="form-group">
                        <label for="origin_price">原價</label>
                        <input type="number" name="origin_price" id="origin_price" class="form-control"
                          v-model.number="editingProduct.origin_price" min="0">
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="price">售價</label>
                        <input type="number" name="price" id="price" class="form-control"
                          v-model.number="editingProduct.price"
                          min="0">
                      </div>
                    </div>
                    <div class="col">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col">
                      <label for="content">商品敘述</label>
                      <textarea class="form-control" id="content" rows="3" v-model="editingProduct.content"></textarea>
                    </div>
                    <div class="col">
                      <label for="description">商品說明</label>
                      <textarea class="form-control" id="description" rows="3"
                        v-model="editingProduct.description"></textarea>
                    </div>
                  </div>
                  <div class="form-row mt-3">
                    <div class="col">
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="enabled"
                          v-model="editingProduct.enabled">
                        <label class="custom-control-label" for="enabled">是否上架？</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="hot"
                          v-model="editingProduct.options.hot">
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
      editingProduct: {},
      errorMsg: "",
    };
  },
  methods: {
    save(mode) {
      if (this.checkForm()) {
        this.$emit('save', mode, this.editingProduct);
      } else {
        this.$emit('alert', this.errorMsg);
      }
    },
    checkForm() {
      let ready = true;
      let errorMsg = "";
      // 商品圖片 至少上傳一張
      if (!this.editingProduct.imageUrl[0]) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品圖片</span> 至少需上傳一張<br>";
      }
      // 商品名稱 為必填項目
      if (!this.editingProduct.title) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品名稱</span> 為必填項目<br>";
      }
      // 商品分類 為必填項目
      if (!this.editingProduct.category) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品分類</span> 為必填項目<br>";
      }
      // 商品敘述 為必填項目
      if (!this.editingProduct.content) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品敘述</span> 為必填項目<br>";
      }
      // 商品說明 為必填項目
      if (!this.editingProduct.description) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品說明</span> 為必填項目";
      }
      this.errorMsg = errorMsg;
      return ready;
    },
    openEditingModal() {
      $('#productModal').modal('show');
    },
    closeEditingModal() {
      $('#productModal').modal('hide');
    }
  },
  created() {
    this.editingProduct = _.cloneDeep(this.product);
  },
  watch: {
    product() {
      this.editingProduct = _.cloneDeep(this.product);
    },
  },
  computed: {
    filterImageUrl() { // 清理陣列內的空值
      return this.editingProduct.imageUrl.filter(url => url);
    },
  },
}