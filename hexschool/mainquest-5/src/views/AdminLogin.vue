<template>
  <div class="d-flex vh-100 justify-content-center">
    <div class="d-flex flex-column align-self-center">
      <form>
        <h3>萌兔窩管理後台</h3>
        <div class="form-group mt-3">
          <input
            v-model="adminEmail"
            type="email"
            class="form-control form-control-sm"
            name="adminEmail"
            id="inputAdminEmail"
            placeholder="信箱"
            autofocus
          />
        </div>
        <div class="form-group">
          <input
            v-model="adminPassword"
            type="password"
            class="form-control form-control-sm"
            name="adminPassword"
            id="inputAdminPassword"
            placeholder="密碼"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100" @click.prevent="adminLogin">
          <i class="fas fa-sign-in-alt"></i> 登入
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      adminEmail: '',
      adminPassword: '',
    };
  },
  methods: {
    adminLogin() {
      const loader = this.$loading.show();
      // 準備request用url
      const url = `${this.baseUrl}auth/login`;
      // 準備request用data
      const adminData = {
        email: this.adminEmail,
        password: this.adminPassword,
      };
      // Login
      this.axios
        .post(url, adminData)
        .then((res) => {
          loader.hide();
          const { token } = res.data; // Token
          const expire = new Date(res.data.expired * 1000); // 過期日
          document.cookie = `moerabbitworld-token=${token}; expires=${expire};`; // 存入cookie
          this.$router.push('/master-rabbit');
        })
        .catch((err) => {
          loader.hide();
          const { data } = err.response; // 取得error回傳的data
          const idMsg = data.errors.email ? data.errors.email[0] : ''; // 取得帳號的錯誤訊息
          const pwMsg = data.errors.password ? data.errors.password[0] : ''; // 取得密碼的錯誤訊息
          alert(`${idMsg}\n${pwMsg}`);
        });
    },
  },
  created() {
    // 元件建立時，檢查是否已有Token
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
        .then((res) => {
          loader.hide();
          this.$router.push('/master-rabbit');
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    }
  },
};
</script>

<style></style>
