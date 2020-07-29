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
        <div class="container-fluid d-flex justify-content-round">
          <div class="nav-block d-flex flex-row">
            <router-link to="/" v-slot="{ isActive, href }" exact>
              <a :href="href" :class="{'is-active': isActive}" class="nav-link">
                <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
                <span>首頁</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <!-- <router-link to="/" v-slot="{ isActive, href }">
              <a :href="href" :class="{'is-active': isActive}" class="nav-link">
                <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
                <span>最新消息</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/" v-slot="{ isActive, href }">
              <a :href="href" :class="{'is-active': isActive}" class="nav-link">
                <font-awesome-icon :icon="['fas', 'carrot']" class="nav-icon" />
                <span>產品</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link> -->
          </div>

          <div class="nav-block logo">
            <img src="../assets/logo.svg" alt="萌兔窩Logo">
          </div>

          <div class="nav-block nav-block-right d-flex flex-row">
            <router-link to="/cart" v-slot="{ isActive, href }">
              <a :href="href" :class="{'is-active': isActive}" class="nav-link">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
                <span>購物車</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/about" v-slot="{ isActive, href }">
              <a :href="href" :class="{'is-active': isActive}" class="nav-link">
                <font-awesome-icon :icon="['fas', 'user']" class="nav-icon" />
                <span>登入</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
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
  nav {
    height: 3.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: $Pink;
  .nav-block {
    width: 30%;
    .nav-link {
      color: $DarkerPink;
      font-weight: bold;
      font-size: 1rem;
      border-radius: 0.5rem;
      margin-right: 0.5rem;
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

.nav-block-right {
  justify-content: flex-end;
  .nav-link {
    margin-right: 0;
    margin-left: 0.5rem;
  }
}

.header-top {
  background-color: rgba(255, 255, 255, 0.2);
  .nav-block {
    .nav-link {
      color: white;
      .nav-icon {
        color: white;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0);
        color: white;
        .nav-icon {
          color: white;
        }
      }
    }
    .is-active {
      background-color: rgba(255, 255, 255, 0);
      color: white;
      .nav-icon {
        color: white;
      }
    }
  }
}

.logo {
  height: 3.5rem;
  img {
    height: 100%;
  }
}
</style>
