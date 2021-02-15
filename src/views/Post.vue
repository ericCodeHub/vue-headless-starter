<template>
  <div class="page-body">
    <article>
      <a @click="goBack">Back to All Posts</a>

      <header>
        <h1 v-html="title"></h1>
        <span>{{ date }}</span>
      </header>

      <div>
        <img id="featured-image" v-if="featured_image" :src="featured_image" />
      </div>

      <div class="mid-page">
        <div class="post-content">
          <PostBody :content="content"></PostBody>
        </div>

        <div class="related-content">
          <h3>Related Topics</h3>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import bus from "../bus";
import utils from "../mixins/utils";
import ajax from "../mixins/ajax";
import PostBody from "../components/PostBody";

export default {
  name: "Post",

  mixins: [utils, ajax],

  data() {
    return {
      post: {},
      date: "",
      link: "",
      title: "",
      content: "",
      featured_image: ""
    };
  },

  created: async function() {
    this.post = await this.setPost();
    this.link = this.post.link;
    this.date = this.getFormattedDate(this.post.date);
    this.title = this.post.title.rendered;
    this.content = this.post.content.rendered;
    this.featured_image = await this.getFeaturedImage(this.post.featured_media);

    bus.$emit("toggleLoading", false);
  },

  methods: {
    setPost: function() {
      return new Promise(async resolve => {
        let response;

        try {
          response = await this.get(`/posts?slug=${this.$route.params.slug}`);
        } catch (error) {
          this.$router.push({ name: "four-o-four" });
          return;
        }

        resolve(response.data[0]);
      });
    },

    getFeaturedImage: async function(id) {
      let response;
      try {
        if (this.post.featured_media <= 0) {
          throw "No featured image.";
        }

        response = await this.get(`/media/${id}`);
      } catch (error) {
        return null;
      }

      return response.data.media_details.sizes["medium_large"].source_url;
    }
  },

  components: {
    PostBody
  }
};
</script>

<style scoped lang="scss">
.mid-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: left right;
  grid-gap: 50px;
}
.page-body {
  margin: 10px 50px;
}
a:hover {
  text-decoration: underline;
}
h1 {
  font-weight: bold;
}
h3 {
  font-weight: bolder;
}
#featured-image {
  width: 100%;
  margin: 25px 0px;
}
</style>
