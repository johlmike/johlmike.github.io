<template>
  <div class="home">
    <Carousel :isTop="isTop"></Carousel>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <ProductCategory
            v-bind:categoryList="categoryList"
            @changeCategory="handleCategoryChange"
          />
        </div>
        <div class="col-md-9">
          <ProductsTable :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue';
import ProductCategory from '@/components/ProductsCategory.vue';
import ProductsTable from '@/components/ProductsTable.vue';

export default {
  name: 'Home',
  props: {
    isTop: Boolean,
  },
  components: {
    Carousel,
    ProductCategory,
    ProductsTable,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      categoryList: [
        '所有商品',
        '主食飼料',
        '點心零食',
        '營養保健品',
        '居家籠便盆',
        '木屑/砂',
      ],
      products: [],
      activeCategory: '所有商品',
      totalPages: 1,
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = `${this.baseUrl}${this.uuid}/ec/products?page=${page}`;
      this.axios.get(url).then((res) => {
        const currentPage = res.data.meta.pagination.current_page;
        this.totalPages = res.data.meta.pagination.total_pages;
        this.products = this.products.concat(res.data.data);
        // 如果商品列表超過一頁且尚未讀取完畢，再執行一次 getProducts
        if (currentPage !== this.totalPages) {
          this.getProducts(page + 1);
        }
      });
    },
    handleCategoryChange(activeCategory) {
      this.activeCategory = activeCategory;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
</style>
