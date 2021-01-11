<template>
  <nav>
    <ul>
      <li>
        <router-link
          :class="{'is-disabled' : currentPage === 1}"
          :to="{ name: 'page', params: {page: this.currentPage - 1} }"
        >
          Previous Page
        </router-link>
      </li>
      <li>
        <router-link
          :class="{'is-disabled' : currentPage === this.totalPages}"
          :to="{ name: 'page', params: {page: this.currentPage + 1} }"
        >
          Next Page
        </router-link>
      </li>
    </ul>

    <p>page <strong>{{ currentPage }}</strong> out of <strong>{{ totalPages }}</strong></p>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    currentPage: {
      default: 1
    },

    totalPages: {
      default: 1
    }
  }
}

</script>

<style scoped lang="scss">

</style>
