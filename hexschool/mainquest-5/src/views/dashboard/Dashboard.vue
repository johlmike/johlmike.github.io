<template>
  <div class="dashboard">
    <DNavbar></DNavbar>
    <router-view />
    <div class="modal" tabindex="-1" role="dialog" id="error-modal" data-backdrop="static">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">驗證失敗</h5>
          </div>
          <div class="modal-body">
            <p>
              請重新登入
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import DNavbar from '@/components/DNavbar.vue';

export default {
  components: {
    DNavbar,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  methods: {
    authFailed() {
      $('#error-modal').modal('hide');
      document.cookie = 'moerabbitworld-token=;';
      this.$router.push('/master-login');
    },
  },
  mounted() {
    // DOM建立時，檢查是否已有Token
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('moerabbitworld-token'))
      .split('=')[1];
    // 有Token的話，檢查Token是否正確
    if (token) {
      const loader = this.$loading.show();
      // 準備request用url
      const url = `${this.baseUrl}auth/check`;
      // 準備request用data
      const tokenData = {
        api_token: token,
      };
      this.axios
        .post(url, tokenData)
        .then(() => {
          loader.hide();
        })
        .catch((err) => {
          loader.hide();
          $('#error-modal').modal('show');
          setTimeout(this.authFailed, 2000);
          console.log(err.response);
        });
    } else {
      // 沒Token表示沒驗證過，跳轉至管理員登入頁面
      $('#error-modal').modal('show');
      setTimeout(this.authFailed, 2000);
    }
  },
};
</script>

<style>
.dashboard {
  min-height: 100vh;
}
</style>
