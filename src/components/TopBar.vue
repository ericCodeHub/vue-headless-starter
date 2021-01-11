<template>
  <nav>
    <div v-if="!loading">
      <div v-for="item in menu.items">
        <router-link :to="item.url">{{item.title}}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import bus from '../bus';
import axios from 'axios';

export default {
  name: "TopBar",

  data() {
    return {
      loading: true,
      menu: null,
    };
  },

  computed: {

  },

  methods: {
    showUpdater: function() {
      this.$emit("showUpdater");
    },
    updateURLs: function(){
      for (var i = 0; i < this.menu.items.length; i++) {
        this.menu.items[i].url = this.menu.items[i].url.substring(34)
      }
    },
    getMenu: async function () {
      let $this = this
      axios.get('http://headless.solutionagency.net/wp-json/menus/v1/menus/primary')
            .then(function (response) {
              $this.menu = response.data; 
              $this.updateURLs()
              $this.loading = false
            })


      

      bus.$emit('toggleLoading', false);
    },
  },
  mounted(){
    this.getMenu()
  }
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 2rem;

  @include media($small) {
    flex-direction: row;
  }
}

div {
  display: flex;
  align-items: center;
  flex-direction: column;

  @include media($mobile) {
    flex-direction: row;
  }
}

button {
  @include media($mobile) {
    margin: 0 0 0 1rem;
  }
}

h1 {
  margin: 0;
}

a {
  font-weight: bold;
  padding: 5px;
}

p {
  text-align: center;
  margin: 0.5rem 0 1rem;

  @include media($mobile) {
    margin: 0;
    text-align: right;
  }
}
</style>
