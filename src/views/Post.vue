<template>
  <div>

    <article>

      <a @click="goBack">Back to All Posts</a>

      <header>
        <img
          v-if="featured_image"
          :src="featured_image"
        >
        <h1 v-html="title"></h1>

        <ul>
          <li>
            <span>Published on {{ date }}</span>
          </li>
          <li>
            <span>
              <a :href="link">View Post at Source</a>
            </span>
          </li>
        </ul>
      </header>

      <PostBody :content="content"></PostBody>

    </article>

    <div>
      <h3>Post a comment</h3>
      <form @submit.prevent="postComment">
        <input type="text" v-model="newComment.author_name" placeholder="Name" required />
        <input type="text" v-model="newComment.author_email" placeholder="Email" required />
        <textarea v-model="newComment.content">Comment</textarea>
        <button type="submit">Submit</button>
      </form>
    </div>


    <div v-for="comment in comments">
      <hr>
      <div v-html="comment.content.rendered"></div>
      <p>{{comment.author_name}}</p>
      <button v-if="comment._links.children" type="button" @click="childComments(comment.id)">See Child Comments</button>
    </div>

  </div>
</template>

<script>
  import bus from '../bus';
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';
  import PostBody from '../components/PostBody';

  import axios from 'axios';

  export default {
    name: 'Post',

    mixins: [utils, ajax],

    data () {
      return {
        post: {},
        date: '',
        link: '',
        title: '',
        content: '',
        featured_image: '',
        comments: [],
        newComment: {
          author_name: '',
          author_email: '',
          date: '',
          post: '',
          content: ''
        }
      }
    },

    created: async function () {
      this.post = await this.setPost();
      this.link = this.post.link;
      this.date = this.getFormattedDate(this.post.date);
      this.title = this.post.title.rendered;
      this.content = this.post.content.rendered;
      this.featured_image = await this.getFeaturedImage(this.post.featured_media);
      this.comments = await this.getComments(this.post.id);

      bus.$emit('toggleLoading', false);
    },

    methods: {
      setPost: function () {
        return new Promise(async (resolve) => {
          let response;

          try {
            response = await this.get(`/posts?slug=${this.$route.params.slug}`);
          } catch (error) {
            this.$router.push({name: 'four-o-four'});
            return;
          }

          resolve(response.data[0]);

        });
      },

      getComments: async function (id) {
        let response;
        try {
          response = await this.get(`/comments?post=${id}&parent=0`);
        } catch (error) {
          return null;
        }

        console.log(response.data)

       return response.data

      },
      updateComments: async function(){
        let $this = this
        axios.get(`https://headless.solutionagency.net/wp-json/wp/v2/comments?post=${this.post.id}`)
            .then(function(response){
              $this.comments = response.data
            })
        
      },
      childComments: async function(id){
        let response;
        try {
          response = await this.get(`/comments?post=${this.post.id}&parent=${id}`);
        } catch (error) {
          return null;
        }

        console.log(response.data)

       // return response.data
      },
      postComment: function(){
        let $this = this
        this.newComment.date = new Date();
        this.newComment.post = this.post.id

        axios.post('https://headless.solutionagency.net/wp-json/wp/v2/comments', this.newComment)
            .then(function(){
              $this.updateComments()
            })
      },

      getFeaturedImage: async function (id) {
        let response;
        try {

          if(post.featured_media <= 0) {
            throw "No featured image.";
          }

          response = await this.get(`/media/${id}`);
        } catch (error) {
          return null;
        }

        return response.data.media_details.sizes['medium'].source_url;
      },
    },

    components: {
      PostBody
    }
  }
</script>

<style scoped lang="scss">

</style>
