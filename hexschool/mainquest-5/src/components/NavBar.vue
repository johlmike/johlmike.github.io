<template>
  <div>
    <div class="header container-fluid" :class="{'header-pink': !isTop}">
      <nav class="navbar navbar-expand-lg">
        <router-link to="/">
          <a class="navbar-brand" href="#">萌兔窩</a>
        </router-link>|
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

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <router-link to="/">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  首頁
                  <span class="sr-only">(current)</span>
                </a>
              </li>
            </router-link>
            <router-link to="about">
              <li class="nav-item">
                <a class="nav-link" href="#">最新消息</a>
              </li>
            </router-link>
            <router-link to="/">
              <li class="nav-item">
                <a class="nav-link" href="#">所有產品</a>
              </li>
            </router-link>
            <router-link to="/">
              <li class="nav-item">
                <a class="nav-link" href="#">萌兔小學堂</a>
              </li>
            </router-link>
          </ul>
          <!-- <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜尋</button>
          </form>-->
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

.navbar-brand {
  color: white;
  font-weight: bold;
}

.nav-link {
  color: white;
  font-weight: bold;
}

.header-pink {
  background-color: pink;
}
</style>

// 姓名：必填
// Email：須符合格式
// 電話：必填，超過 8 碼，input type 為 tel
// 地址：必填
// 付款方式：WebATM、ATM、Barcode、Credit、ApplePay、GooglePay
// 留言：非必填
