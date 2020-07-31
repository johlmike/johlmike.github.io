<template>
  <div>
    <div class="header container-fluid">
      <nav class="navbar navbar-expand-lg py-0">
        <div class="container-fluid d-flex justify-content-round">
          <div class="nav-block d-flex flex-row">
            <router-link to="/master-rabbit/" v-slot="{ isActive, href }" exact>
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
                <span>商品列表</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/master-rabbit/coupon-manage" v-slot="{ isActive, href }">
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
                <span>優惠券列表</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/master-rabbit/order-manage" v-slot="{ isActive, href }">
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'carrot']" class="nav-icon" />
                <span>訂單列表</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/master-rabbit/picture-manage" v-slot="{ isActive, href }">
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
                <span>圖片儲存列表</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
          </div>
          <div class="nav-block d-flex flex-row">
            <a href="#" class="nav-link" @click.prevent="logout">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
              <span>登出</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = 'moerabbitworld-token=;';
      this.$router.push('/master-login');
    },
  },
};
</script>

<style lang="scss" scoped>
$Alabaster: #d8e2dc;
$Pink: #ffcad4;
$DarkPink: #f4acb7;
$DarkerPink: #9d8189;

.header {
  background-color: $Pink;
  nav {
    height: 3.5rem;
  }
  .nav-block {
    .nav-link {
      color: $DarkerPink;
      font-weight: bold;
      font-size: 1rem;
      border-radius: 0.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
      .nav-icon {
        color: $DarkerPink;
        font-size: 1rem;
        margin-bottom: -5px;
        margin: 0 0.5rem -0.05rem 0;
      }
      &:hover {
        background-color: $DarkerPink;
        text-decoration: none;
        color: white;
        .nav-icon {
          color: white;
        }
      }
    }
    .is-active {
      background-color: $DarkerPink;
      color: white;
      .nav-icon {
        color: white;
      }
    }
    .nav-logo {
      font-weight: bold;
      font-size: 2rem;
      letter-spacing: 0.5rem;
      margin-right: -0.5rem;
      &:hover {
        background-color: $Pink;
        color: $DarkerPink;
      }
    }
  }
}
</style>
