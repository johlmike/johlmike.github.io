// import Vue from 'vue';
// import Vuesax from 'vuesax';

// import 'vuesax/dist/vuesax.css' //Vuesax styles
// Vue.use(Vuesax, {
//   // options here
// });

const app = new Vue({
  el: '#app',
  data: {
    products: [],
    editProduct: {
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
    editingIndex: 0,
    creating: true,
  },
  methods: {
    toggleModal(index) {
      if (index === "new") {
        this.creating = true;
        // 給予一個空的資料物件
        this.editProduct = {
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
        };
      } else {
        this.creating = false;
        this.editingIndex = index;
        // 將要編輯的商品內容放入editProduct
        this.editProduct = JSON.parse(JSON.stringify(this.products[index]));
      }
      $('#productModal').modal('show');
    },
    createProduct() {
      this.products.push(JSON.parse(JSON.stringify(this.editProduct)));
      this.editProduct = {
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
      };
      $('#productModal').modal('hide');
    },
    updateProduct() {
      Object.keys(this.products[this.editingIndex]).forEach(key => {
        this.products[this.editingIndex][key] = JSON.parse(JSON.stringify(this.editProduct[key]));
      });
      $('#productModal').modal('hide');
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
    },
  },
  created() {
    // 建立範本資料
    this.products.push({
      title: "【MOMI】美國特級二割提摩西牧草(1kg)",
      category: "主食飼料",
      content: "美國摩米MOMI二割提摩西草一公斤裝",
      description: "提摩西草的營養比例能照顧兔兔及小型草食類動物每日所需，高纖及相對較低蛋白質含量，適合每天食用，而且不會引致過重。",
      imageUrl: "https://ct.yimg.com/xd/api/res/1.2/wAim4tfi97lJa.N2hB09EQ--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD02MDA7cT04NTtyb3RhdGU9YXV0bzt3PTYwMA--/https://s.yimg.com/ob/image/842f30f3-f604-4835-8d0c-042599081088.jpg",
      enabled: true,
      origin_price: 400,
      price: 330,
      unit: "包",
      stock: 10,
      option: {
        comments: [
          "我家的兔子每天都吃得很開心，大推薦！",
          "包裝打開就有很香的青草味，很棒！",
        ],
        hot: true
      }
    });
    this.products.push({
      title: "【OXBOW】輕食美味系列-紅蘿蔔時蘿牧草烘焙零食",
      category: "點心零食",
      content: "OXBOW紅蘿蔔時蘿牧草烘焙零食一包(85g)",
      description: "完美烘焙的紅蘿蔔時蘿烘焙零食，結合了新鮮紅蘿蔔、時蘿與高纖的提摩西草，創造出美味的點心。",
      imageUrl: "https://www.lovecat.com.tw/product/1727/17503-1m.jpg",
      enabled: true,
      origin_price: 200,
      price: 100,
      unit: "包",
      stock: 50,
      option: {
        comments: [
          "我家的兔子非常愛吃，可惜自己吃起來味道不怎麼樣...",
          "每次都馬上被吃光光，超級受歡迎！",
          "我現在每天放風都餵我們家兔仔吃一片，他出來放風就會跳舞超可愛XD",
        ],
        hot: true
      }
    });
    this.products.push({
      title: "【MARUKAN】雙抽屜式精緻便盆式兔籠",
      category: "兔子專用籠",
      content: "MARUKAN雙抽屜式精緻便盆式兔籠一個",
      description: "日本Marukan雙抽屜精緻兔籠，質感超佳，底部有樹酯洞洞底網，保護兔子不易受傷",
      imageUrl: "https://www.lovecat.com.tw/product/1729/12442-1m.jpg",
      enabled: true,
      origin_price: 4000,
      price: 3750,
      unit: "個",
      stock: 20,
      option: {
        comments: [
          "很大一個！讓兔寶在家時也有足夠的空間可以伸懶腰！",
          "左右各有一個抽屜，清潔起來非常方便，滾輪的設計也很棒。",
          "設計精美，腳踏墊設計也不會讓兔兔的腳踩著會痛，非常好的兔籠！！！",
        ],
        hot: false
      }
    });
  }
});