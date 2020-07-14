export default {
  template: `
    <div v-show="loading" class="h-100 w-100" :style="styles">
      <div class="d-flex justify-content-center h-100 w-100 align-items-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  `,
  props: {
    loading: Boolean,
  },
  data() {
    return {
      styles: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'fixed',
        zIndex: '99999',
      },
    };
  }
}