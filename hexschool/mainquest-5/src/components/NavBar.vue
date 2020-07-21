<template>
  <div>
    <div class="header container-fluid" :class="{'header-top': isTop}">
      <nav class="navbar navbar-expand-lg py-0">
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
            <router-link to="/" v-slot="{ isActive, href }">
              <a :href="href" class="pt-2" :class="{'is-active': isActive}">
                <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
                <a class="nav-link">
                  首頁
                  <span class="sr-only" v-if="isActive">(current)</span>
                </a>
              </a>
            </router-link>
            <router-link to="/about" v-slot="{ isActive, href }">
              <a :href="href" class="pt-2" :class="{'is-active': isActive}">
                <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
                <a class="nav-link">
                  最新消息
                  <span class="sr-only" v-if="isActive">(current)</span>
                </a>
              </a>
            </router-link>
          </div>

          <div>
            <router-link to="/">
              <a class="nav-link nav-logo">萌兔窩</a>
            </router-link>
          </div>

          <div class="d-flex flex-row">
            <router-link to="/about" v-slot="{ isActive, href }">
              <a :href="href" class="pt-2" :class="{'is-active': isActive}">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
                <a class="nav-link">
                  所有產品
                  <span class="sr-only" v-if="isActive">(current)</span>
                </a>
              </a>
            </router-link>
            <router-link to="/about" v-slot="{ isActive }">
              <div class="pt-2" :class="{'is-active': isActive}">
                <font-awesome-icon :icon="['fas', 'user']" class="nav-icon" />
                <a class="nav-link">登入</a>
              </div>
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
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
$Alabaster: #d8e2dc;
$Pink: #ffcad4;
$DarkPink: #f4acb7;
$DarkerPink: #9d8189;

.header {
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: $Pink;
  .nav-icon {
    color: $DarkerPink;
    font-size: 1.3rem;
    margin-bottom: -5px;
  }
  .nav-link {
    color: $DarkerPink;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .nav-logo {
    font-weight: bold;
    font-size: 2rem;
    letter-spacing: 0.5rem;
  }
  .is-active {
    background-color: $DarkerPink;
    .nav-icon {
      color: $Pink;
    }
    .nav-link {
      color: $Pink;
    }
  }
}

.header-top {
  background-color: rgba(0, 0, 0, 0.2);
  .nav-icon {
    color: white;
  }
  .nav-link {
    color: white;
  }
  .is-active {
    background-color: rgba(0, 0, 0, 0.2);
    .nav-icon {
      color: white;
    }
    .nav-link {
      color: white;
    }
  }
}
</style>

// 姓名：必填
// Email：須符合格式
// 電話：必填，超過 8 碼，input type 為 tel
// 地址：必填
// 付款方式：WebATM、ATM、Barcode、Credit、ApplePay、GooglePay
// 留言：非必填
