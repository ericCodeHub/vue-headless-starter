<template>
  <div>

  <form v-if="form" @submit.prevent="onSubmit">

    <div v-for="field in form.fields">
      <label :for="'field_' + field.id">{{field.label}}</label>
      <input v-if="field.type == 'text'" type="text" :name="'field_' + field.id" :placeholder="field.placeholder" />
      <input v-if="field.type == 'email'" type="email" :name="'field_' + field.id" :placeholder="field.placeholder" />
      <textarea v-if="field.type == 'textarea'" :name="'field_' + field.id">{{field.placeholder}}</textarea>
    </div>

    <button type="submit">{{form.button.text}}</button>
  </form>

  </div>
</template>

<script>
import axios from 'axios';
import bus from '../bus';

export default {
  name: 'GravityForm',
  components: {
  },
  props: {
    formId: String
  },
  data () {
    return {
      form: {}
    }
  },

  mounted: function () {
    let $this = this

    axios.get('https://headless.solutionagency.net/wp-json/gf/v2/forms/' + this.formId, {
      auth: {
        username: GF_USERNAME,
        password: GF_PASSWORD
      }
    })
    .then(response => {
      $this.form = response.data
    })
  },

  created: function () {
    
  },

  methods: {
    onSubmit(){
      axios.post('https://headless.solutionagency.net/wp-json/gf/v2/forms/1/submissions', this.form)
        .then(function (response) {
            //console.log(response);
            if(response.data.is_valid === true){
                // you had a successful call
            }
        })
        .catch(function (error) {
            if(error.response ){
                if(error.response.data.is_valid === false ){
                    alert('Please refresh and try again');
                }
            }
        });
    }
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

