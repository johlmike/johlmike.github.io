import LoadingPage from '../components/LoadingPage.js';

const app = new Vue({
  el: '#app',
  components: {
    LoadingPage,
  },
  data() {
    return {
      baseUrl: 'https://course-ec-api.hexschool.io/api/',
      uuid: '0ace4b59-2bf0-443c-968c-4c9a458d1cb9',
      token: '',
      products: [],
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
        options: {
          hot: true,
          stock: 0,
        }
      },
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
        options: {
          hot: true,
          stock: 0,
        }
      },
      editingIndex: 0,
      editingId: '',
      page: 1,
      // 因新增和編輯共用Modal，故多一個變數，確認觸發之modal是「新增商品」或「編輯商品」
      // 之後或許調整為將modal元件獨立
      isCreating: true,
      isLoading: false,
    };
  },
  methods: {
    getAllProducts() {
      this.isLoading = true; // 讀取中
      const url = `${this.baseUrl}${this.uuid}/admin/ec/products?page=${this.page}`;
      // Ajax
      axios.get(url)
        .then(res => {
          this.isLoading = false; // 讀取結束
          this.products = res.data.data; // 將商品列表放入元件的data
          // 將options之String轉換為Object
          this.products.forEach((product, index) => {
            if (product.options) { // 如果該商品有options的話
              this.products[index].options = JSON.parse(product.options);
            }
            this.getProduct(product.id, data => { // description需要使用單一商品讀取
              this.products[index].description = data.description;
            });
          });
        })
        .catch(err => {
          this.isLoading = false; // 讀取結束
          // error401 表示驗證失敗，跳轉回登入頁面重新登入
          if (err.response.status === 401) {
            document.cookie = `moerabbitworld-token=;`;
            window.location = './index.html';
          }
          console.log(err.response);
        });
    },
    getProduct(id, cb) {
      this.isLoading = true; // 讀取中
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${id}`;
      axios.get(url)
        .then(res => {
          this.isLoading = false; // 讀取結束
          cb(res.data.data);
        })
        .catch(err => {
          this.isLoading = false; // 讀取結束
          console.log(err.response);
        });

    },
    createProduct() {
      this.isLoading = true; // 讀取中
      // 準備Ajax使用之url和data
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product`;
      const data = _.cloneDeep(this.editingProduct);
      // 將options轉換成字串(為符合後端要求)
      data.options = JSON.stringify(data.options);
      // Ajax
      axios.post(url, data)
        .then(res => {
          this.isLoading = false; // 讀取結束
          this.editingProduct = _.cloneDeep(this.productTemplate); // 將editingProduct清空
          this.page = 1; // 自動跳轉到page 1
          this.getAllProducts(); // 重新讀取商品列表
          $('#productModal').modal('hide'); // 自動關閉modal
        })
        .catch(err => {
          this.isLoading = false; // 讀取結束
          console.log(err.response);
        });
    },
    updateProduct(evt, index) {
      this.isLoading = true; // 讀取中
      // 如果有傳入index，表示使用者直接從列表更新商品狀態(上架、熱門)
      if (index || index === 0) {
        this.editingIndex = index; // 儲存使用者欲編輯商品之表格編號
        this.editingId = this.products[index].id; // 儲存使用者欲編輯商品之id
        this.editingProduct = _.cloneDeep(this.products[index]); // 將要編輯的商品內容放入editProduct
      }
      // 為了使vue畫面自動更新，故使用forEach針對物件內每個key去更新資料
      Object.keys(this.products[this.editingIndex]).forEach(key => {
        this.products[this.editingIndex][key] = _.cloneDeep(this.editingProduct[key]);
      });
      // 準備Ajax使用之url和data
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${this.editingId}`;
      const data = _.cloneDeep(this.products.find(product => { // 使用editingId查找欲更新的商品並clone一份
        return product.id === this.editingId;
      }));
      // 將options轉換成字串(為符合後端要求)
      data.options = JSON.stringify(data.options);
      // Ajax
      axios.patch(url, data).then(res => {
          this.isLoading = false; // 讀取結束
          $('#productModal').modal('hide'); // 自動關閉modal
        })
        .catch(err => {
          this.isLoading = false; // 讀取結束
          console.log(err.response);
        });
    },
    deleteProduct(index) {
      this.isLoading = true; // 讀取中
      const id = this.products[index].id;
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${id}`;
      axios.delete(url)
        .then(() => {
          this.isLoading = false; // 讀取結束
          this.getAllProducts(); // 刷新頁面
        })
        .catch(err => {
          this.isLoading = false; // 讀取結束
          console.log(err.response);
        });
    },
    toggleModal(index) {
      if (index === "new") {
        this.isCreating = true; // 設定modal為新增狀態
        this.editingProduct = _.cloneDeep(this.productTemplate); // 給予一個空的資料物件
      } else {
        this.isCreating = false; // 設定modal為編輯狀態
        this.editingIndex = index; // 儲存編輯中商品之表格編號
        this.editingId = this.products[index].id; // 儲存編輯中商品之id
        this.editingProduct = _.cloneDeep(this.products[index]); // 將要編輯的商品內容放入editProduct
      }
      $('#productModal').modal('show');
    },
    toggleHot(index, hot) {
      // 更新本地端商品資料
      this.products[index].options.hot = hot;
      // 更新資料庫商品資料
      this.updateProduct(null, index);
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