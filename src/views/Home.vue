<template>
  <div>

    <section>
      <p>Let's say this is a static homepage.</p>
    </section>

  </div>
</template>

<script>
import bus from '../bus';
import ajax from '../mixins/ajax';

export default {
  name: 'Home',
  components: {

  },
  mixins: [ajax],

  data () {
    return {
      posts: [],
      page: 1,
      totalPages: null,
    }
  },

  mounted: function () {
    bus.$emit('toggleLoading', false);
  },

  created: function () {
    if(this.$route.name === 'page') {
      this.page = this.$route.params.page;
    }
  },

  methods: {

  }
}

</script>

<style scoped lang="scss">

  section {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
  }

</style>

