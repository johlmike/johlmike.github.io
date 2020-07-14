// import Vue from 'vue';
// import Vuesax from 'vuesax';

// import 'vuesax/dist/vuesax.css' //Vuesax styles
// Vue.use(Vuesax, {
//   // options here
// });

import LoadingPage from '../components/LoadingPage.js';

const app = new Vue({
  el: '#app',
  components: {
    LoadingPage,
  },
  data() {
    return {
      // api網址
      baseUrl: 'https://course-ec-api.hexschool.io/api/',
      // 我的uuid
      uuid: '0ace4b59-2bf0-443c-968c-4c9a458d1cb9',
      // 驗證用token
      token: '',
      // 商品列表
      products: [],
      // 空product物件
      productTemplate: {
        title: "",
        category: "",
        content: "",
        description: "",
        imageUrl: [],
        enabled: true,
        origin_price: 0,
        price: 0,
        unit: "",
        stock: 0,
        option: {
          comments: [],
          hot: true
        }
      },
      // 編輯中的商品
      editingProduct: {
        title: "",
        category: "",
        content: "",
        description: "",
        imageUrl: [],
        enabled: true,
        origin_price: 0,
        price: 0,
        unit: "",
        stock: 0,
        option: {
          comments: [],
          hot: true
        }
      },
      // 編輯中商品之列表編號（畫面更新）
      editingIndex: 0,
      // 編輯中商品之id（資料庫更新）
      editingId: '',
      // 商品列表頁碼
      page: 1,
      // 因新增和編輯共用Modal，故多一個變數，確認觸發之modal是「新增商品」或「編輯商品」
      // 之後或許調整為將modal元件獨立
      isCreating: true,
      isLoading: false,
    };
  },
  methods: {
    getAllProducts() {
      // 讀取中
      this.isLoading = true;
      // 取得所有商品api的url
      const url = `${this.baseUrl}${this.uuid}/admin/ec/products?page=${this.page}`;
      // 使用get取得所有商品列表
      axios.get(url)
        .then(res => {
          // 讀取結束
          this.isLoading = false;
          // 將商品列表放入元件的data
          this.products = res.data.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    createProduct() {
      // 讀取中
      this.isLoading = true;
      // 新增商品至資料庫
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product`;
      // Ajax
      axios.post(url, this.editingProduct)
        .then(res => {
          // 讀取結束
          this.isLoading = false;
          // 將editingProduct清空
          this.editingProduct = _.cloneDeep(this.productTemplate);
          // 自動跳轉到page 1
          this.page = 1;
          this.getAllProducts();
          // 自動關閉modal
          $('#productModal').modal('hide');
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    updateProduct(evt, index) {
      // 讀取中
      this.isLoading = true;
      // 如果有傳入index，表示使用者直接從列表更新商品狀態(上架、熱門)
      if (index || index === 0) {
        // 儲存編輯中商品之列表編號
        this.editingIndex = index;
        // 儲存編輯中商品之id
        this.editingId = this.products[index].id;
        // 將要編輯的商品內容放入editProduct
        this.editingProduct = _.cloneDeep(this.products[index]);
      }
      // 為了使vue畫面自動更新，故使用forEach針對物件內每個key去更新資料
      Object.keys(this.products[this.editingIndex]).forEach(key => {
        this.products[this.editingIndex][key] = _.cloneDeep(this.editingProduct[key]);
      });
      // 更新資料庫商品資訊
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${this.editingId}`;
      const data = this.products.find(product => { // 使用editingId查找欲更新的商品
        return product.id === this.editingId;
      });
      // Ajax
      axios.patch(url, data).then(res => {
          // 讀取結束
          this.isLoading = false;
          // 自動關閉modal
          $('#productModal').modal('hide');
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    deleteProduct(index) {
      // 讀取中
      this.isLoading = true;
      const id = this.products[index].id;
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${id}`;
      axios.delete(url)
        .then(() => {
          // 讀取結束
          this.isLoading = false;
          // 刷新頁面
          this.getAllProducts();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    toggleModal(index) {
      if (index === "new") {
        // 設定modal為新增狀態
        this.isCreating = true;
        // 給予一個空的資料物件
        this.editingProduct = _.cloneDeep(this.productTemplate);
      } else {
        // 設定modal為編輯狀態
        this.isCreating = false;
        // 儲存編輯中商品之表格編號
        this.editingIndex = index;
        // 儲存編輯中商品之id
        this.editingId = this.products[index].id;
        // 將要編輯的商品內容放入editProduct
        this.editingProduct = _.cloneDeep(this.products[index]);
      }
      $('#productModal').modal('show');
    },
    toggleHot(index, hot) {
      // 更新本地端商品資料
      this.products[index].option.hot = hot;
      // 更新資料庫商品資料
      // ...
    },
  },
  created() {
    // 元件建立時，嘗試取得Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)moerabbitworld-token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 有Token的話，存入Token，並設定Authorization
    if (token) {
      this.token = token;
      // 設定所有axios request的header的Authorization為使用者之token
      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      // 取得所有商品列表
      this.getAllProducts();
    } else { // 沒有的話，跳轉回Login頁面
      window.location = './index.html';
    }
  },
  computed: {
    filterImageUrl() { // 清理陣列內的空值
      return this.editingProduct.imageUrl.filter(url => url);
    },
  }
});