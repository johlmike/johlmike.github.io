<template>
  <div class="products-category">
    <ul class="list-group">
      <li
        v-for="(category, index) in categoryList"
        :key="'cat_' + index"
        class="list-group-item"
        :class="{ active: index === 0 }"
        @click="handleClick(category)"
      >
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default() {
        return ['所有商品'];
      },
    },
  },
  methods: {
    handleClick(activeCategory) {
      const listItems = document.querySelectorAll('.list-group-item');
      listItems.forEach((item) => {
        if (item.innerText === activeCategory) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      this.$emit('changeCategory', activeCategory);
    },
  },
};
</script>

<style scoped>
.products-category {
  position: -webkit-sticky;
  position: sticky;
  top: 6.5rem;
}

.list-group-item {
  cursor: pointer;
}
</style>
