export default {
  template: `
  <div class="row">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" @click.prevent="previousPage">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li :class="{'page-item': true, active: page === currentPage}" v-for="page in totalPage" :key="'page_' + page" @click.prevent="changePage(page)">
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" @click.prevent="nextPage">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  `,
  props: {
    totalPage: Number,
    currentPage: Number,
  },
  data() {
    return {};
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
    previousPage() {
      if( this.currentPage != 1 ){
        this.$emit('change-page', currentPage - 1);
      }
    },
    nextPage() {
      if( this.currentPage !== totalPage ){
        this.$emit('change-page', currentPage + 1);
      }
    }
  }
}