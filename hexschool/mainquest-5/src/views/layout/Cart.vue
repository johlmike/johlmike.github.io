<template>
  <div class="cart">
    <NavBar :isTop="false"></NavBar>
    <div class="container">
      <CartTable></CartTable>
      <CartForm></CartForm>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CartTable from '@/components/CartTable.vue';
import CartForm from '@/components/CartForm.vue';

export default {
  components: {
    NavBar,
    CartTable,
    CartForm,
  },
};
</script>

<style lang="scss" scoped>
$Alabaster: #d8e2dc;

.cart {
  background-color: $Alabaster;
}
.container {
  padding-top: 5rem;
}
</style>
