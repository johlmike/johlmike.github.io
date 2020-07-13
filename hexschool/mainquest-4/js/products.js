// import Vue from 'vue';
// import Vuesax from 'vuesax';

// import 'vuesax/dist/vuesax.css' //Vuesax styles
// Vue.use(Vuesax, {
//   // options here
// });

const app = new Vue({
  el: '#app',
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
        imageUrl: "",
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
        imageUrl: "",
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
      // 編輯中的編號
      editingIndex: 0,
      // 商品列表頁碼
      page: 2,
      // 因新增和編輯共用Modal，故多一個變數，確認觸發之modal是「新增商品」或「編輯商品」
      // 之後或許調整為將modal元件獨立
      creating: true,
    };
  },
  methods: {
    getAllProducts() {
      const url = `${this.baseUrl}${this.uuid}/admin/ec/products?page=${this.page}`;
      axios.get(url)
        .then(res => {
          // 將商品列表放入元件的data
          this.products = res.data.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    createProduct() {
      this.products.push(_.cloneDeep(this.editingProduct));
      this.editingProduct = _.cloneDeep(this.productTemplate);
      $('#productModal').modal('hide');
    },
    updateProduct() {
      Object.keys(this.products[this.editingIndex]).forEach(key => {
        this.products[this.editingIndex][key] = _.cloneDeep(this.editingProduct[key]);
      });
      $('#productModal').modal('hide');
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
    },
    toggleModal(index) {
      if (index === "new") {
        this.creating = true;
        // 給予一個空的資料物件
        this.editingProduct = _.cloneDeep(this.productTemplate);
      } else {
        this.creating = false;
        this.editingIndex = index;
        // 將要編輯的商品內容放入editProduct
        this.editingProduct = _.cloneDeep(this.products[index]);
      }
      $('#productModal').modal('show');
    },
    toggleHot(index, hot) {
      this.products[index].option.hot = hot;
    }
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
  }
});