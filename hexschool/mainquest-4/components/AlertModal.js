export default {
  template: `
    <div class="modal" tabindex="-5" role="dialog" id="alertModal">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="fad fa-exclamation-triangle" style="color: red;"></i> 錯誤訊息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-html="msg"></p>
          </div>
        </div>
      </div>
    </div>
  `,
  data () {
    return {
      msg: "",
    }
  },
  methods: {
    openAlertModal(msg) {
      this.msg = msg;
      $('#alertModal').modal('show');
    },
  }
}