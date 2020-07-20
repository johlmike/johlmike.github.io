<template>
  <div>
    <div class="header container-fluid" :class="{'header-pink': !isTop}">
      <nav class="navbar navbar-expand-lg">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container d-flex justify-content-between">
          <div class="d-flex flex-row">
            <router-link to="/">
              <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
              <a class="nav-link" href="#">
                首頁
                <span class="sr-only">(current)</span>
              </a>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
              <a class="nav-link" href="#">最新消息</a>
            </router-link>
          </div>

          <div>
            <router-link to="/">
              <a class="nav-link nav-logo" href="#">萌兔窩</a>
            </router-link>
          </div>

          <div class="d-flex flex-row">
            <router-link to="/">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
              <a class="nav-link" href="#">所有產品</a>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['fas', 'user']" class="nav-icon" />
              <a class="nav-link" href="#">登入</a>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTop: Boolean,
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  color: white;
}

.header-pink {
  background-color: pink;
}

.nav-link {
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
}

.nav-logo {
  font-weight: bold;
  font-size: 2rem;
}

.nav-icon {
  color: white;
  font-size: 1.3rem;
  margin-bottom: -5px;
}
</style>

// 姓名：必填
// Email：須符合格式
// 電話：必填，超過 8 碼，input type 為 tel
// 地址：必填
// 付款方式：WebATM、ATM、Barcode、Credit、ApplePay、GooglePay
// 留言：非必填
