<template>
  <div class="home">
    <Carousel :isTop="isTop"></Carousel>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <ProductCategory
            v-bind:categoryList="categoryList"
            @changeCategory="handleCategoryChange"
          ></ProductCategory>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue';
import ProductCategory from '@/components/ProductsCategory.vue';

export default {
  name: 'Home',
  props: {
    isTop: Boolean,
  },
  components: {
    Carousel,
    ProductCategory,
  },
  data() {
    return {
      categoryList: [
        '所有商品',
        '主食飼料',
        '點心零食',
        '營養保健品',
        '居家籠便盆',
        '木屑/砂',
      ],
      activeCategory: '所有商品',
    };
  },
  methods: {
    handleCategoryChange(activeCategory) {
      this.activeCategory = activeCategory;
    },
  },
};
</script>
