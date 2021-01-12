<template>
  <div>

    <section>
      <p>Let's say this is a static homepage with a Gravity Forms contact form.</p>
    </section>

    <GravityForm formId="1"></GravityForm>

  </div>
</template>

<script>
import bus from '../bus';
import ajax from '../mixins/ajax';
import GravityForm from '../components/GravityForm';

export default {
  name: 'Home',
  components: {
    GravityForm
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

