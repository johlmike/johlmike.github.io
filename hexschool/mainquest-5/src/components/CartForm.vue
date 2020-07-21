<template>
  <div class="container-fluid">
    <div class="row">
      <ValidationObserver v-slot="{ invalid }" class="w-100">
        <form class="pb-5 col-6 offset-3">
          <ValidationProvider rules="required" v-slot="{ errors, classes }" mode="lazy">
            <div class="form-group">
              <label for="name">收件人姓名</label>
              <input
                type="text"
                name="收件人姓名"
                id="name"
                v-model="userData.name"
                :class="classes"
                class="form-control"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="email|required" v-slot="{ errors, classes }" mode="lazy">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                name="Email"
                id="email"
                v-model="userData.email"
                :class="classes"
                class="form-control"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="min:8|required" v-slot="{ errors, classes }" mode="lazy">
            <div class="form-group">
              <label for="tel">電話</label>
              <input
                type="tel"
                name="電話"
                id="tel"
                v-model="userData.tel"
                :class="classes"
                class="form-control"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors, classes }" mode="lazy">
            <div class="form-group">
              <label for="address">地址</label>
              <input
                type="text"
                name="地址"
                id="address"
                v-model="userData.address"
                :class="classes"
                class="form-control"
              />
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="form-group">
            <label for="payment">付款方式</label>
            <select class="form-control" id="payment" v-model="userData.payment">
              <option value="WebATM">WebATM</option>
              <option value="ATM">ATM</option>
              <option value="Barcode">Barcode</option>
              <option value="Credit">Credit</option>
              <option value="ApplePay">ApplePay</option>
              <option value="GooglePay">GooglePay</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">留言</label>
            <textarea class="form-control" id="message" rows="3"
            v-model="userData.message"></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-submit"
            v-on:click.prevent="sendOrder"
            :disabled="invalid"
          >送出訂單</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      userData: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: 'WebATM',
        message: '',
      },
    };
  },
  methods: {
    sendOrder() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/orders`;
      this.axios
        .post(url, this.userData)
        .then(() => {
          loader.hide();
          this.userData = {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: 'WebATM',
            message: '',
          };
          // this.$bus.$emit('clearCart');
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$Alabaster: #d8e2dc;
$Pink: #ffcad4;
$DarkPink: #f4acb7;
$DarkerPink: #9d8189;

.form-group {
  text-align: left;
  font-size: 1.3rem;
  color: $DarkerPink;
}
.btn-submit {
  color: white;
  width: 100%;
  margin-top: 1rem;
  font-weight: bold;
  border-color: $DarkerPink;
  background-color: $DarkerPink;
  &:active,
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 202, 212, 0.5) !important;
    border-color: $DarkerPink !important;
    background-color: $DarkerPink !important;
  }
}
</style>
