import LoadingPage from '../components/LoadingPage.js';

const app = new Vue({
  el: '#app',
  components: {
    LoadingPage,
  },
  data() {
    return {
      baseUrl: 'https://course-ec-api.hexschool.io/api/',
      uuid: '0ace4b59-2bf0-443c-968c-4c9a458d1cb9',
      adminId: '',
      adminPw: '',
      isLoading: false,
    };
  },
  methods: {
    adminLogin() {
      this.isLoading = true; // 讀取中
      // 準備request用data
      const data = {
        email: this.adminId,
        password: this.adminPw,
      };
      // Login
      axios.post(`${this.baseUrl}auth/login`, data)
        .then(res => {
          this.isLoading = false; // 讀取結束
          const token = res.data.token; // Token
          const expire = new Date(res.data.expired * 1000); // 過期日
          // 存入cookie
          document.cookie = `moerabbitworld-token=${token}; expires=${expire};`;
          window.location = './products.html';
        })
        .catch(err => {
          this.isLoading = false; // 讀取結束
          // 取得error回傳的data
          const data = err.response.data;
          // 取得帳號的錯誤訊息
          const idMsg = data.errors.email ? data.errors.email[0] : '';
          // 取得密碼的錯誤訊息
          const pwMsg = data.errors.password ? data.errors.password[0] : '';
          alert(`${idMsg}\n${pwMsg}`);
        });
    }
  },
  created() {
    // 元件建立時，檢查是否已有Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)moerabbitworld-token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 有Token的話，自動跳轉頁面
    if (token) {
      window.location = './products.html';
    }
  }
})