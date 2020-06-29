let app = new Vue({
  el: '#app',
  data: {
    appID: "0ace4b59-2bf0-443c-968c-4c9a458d1cb9",
    products: [],
    category: ['道奇兔', '獅子兔', '白兔'],
    showDutch: true,
    showLion: false,
    showWhite: false,
  },
  created() {
    const vm = this;
    axios.get(`https://course-ec-api.hexschool.io/api/${vm.appID}/ec/products`)
      .then((res) => {
        this.products = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    filterDutch() {
      return this.products.filter(product => product.category === '道奇兔');
    },
    filterLion() {
      return this.products.filter(product => product.category === '獅子兔');
    },
    filterWhite() {
      return this.products.filter(product => product.category === '白兔');
    }
  },
  methods: {
    showCategory(category) {
      this.showDutch = false;
      this.showLion = false;
      this.showWhite = false;
      switch (category) {
        case '道奇兔':
          this.showDutch = true;
          break;
        case '獅子兔':
          this.showLion = true;
          break;
        case '白兔':
          this.showWhite = true;
          break;
      }
      return;
    },
  }
})