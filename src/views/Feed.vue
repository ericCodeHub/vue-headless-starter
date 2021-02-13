<template>
  <div>
    <div>
      <section class="categories">
        <h1>Latest Posts</h1>
        <ul class="categories">
          <li>
            <b-icon id="all-news" icon="square-fill" /> <span>All News</span>
          </li>
          <li>
            <b-icon id="sub-cats" icon="square-fill" /> <span>Cat A</span>
          </li>
          <li>
            <b-icon id="sub-cats" icon="square-fill" /> <span>Cat B</span>
          </li>
          <li>
            <b-icon id="sub-cats" icon="square-fill" /> <span>Cat C</span>
          </li>
        </ul>
      </section>
    </div>
    <div class="post-cards">
      <ul>
        <Card v-for="post in posts" :post="post" :key="post.id" />
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "../bus";
import ajax from "../mixins/ajax";
import Card from "../components/Card";

export default {
  name: "Feed",

  mixins: [ajax],

  data() {
    return {
      posts: [],
      page: 1,
      totalPages: null
    };
  },

  mounted: function() {
    this.getPosts();
  },

  created: function() {
    if (this.$route.name === "page") {
      this.page = this.$route.params.page;
    }
  },

  methods: {
    getPosts: async function() {
      let response;

      try {
        response = await this.get(
          `/posts?per_page=${POSTS_PER_PAGE}&page=${this.page}`
        );
        this.totalPages = response.headers["x-wp-totalpages"];
      } catch (error) {
        bus.$emit("showUpdater", "Are you sure that's a valid endpoint?");
        bus.$emit("toggleLoading", false);
        return;
      }

      this.posts = await this.getFeaturedImages(response.data);

      this.getAdjacentPageData();

      bus.$emit("toggleLoading", false);
    },

    getAdjacentPageData: async function(prevPage = false) {
      let page =
        prevPage === true ? parseInt(this.page) - 1 : parseInt(this.page) + 1;

      let response;

      if (page > 0) {
        try {
          response = await this.get(
            `/posts?per_page=${POSTS_PER_PAGE}&page=${page}`
          );
        } catch (error) {
          console.error(error);
        }

        response.data.forEach(post => {
          if (post.featured_media <= 0) return;
          this.get(`/media/${post.featured_media}`);
        });
      }

      if (!prevPage) {
        this.getAdjacentPageData(true);
      }
    },

    getFeaturedImages: function(posts) {
      return new Promise(resolve => {
        let requests = posts.map(post => {
          return new Promise(async resolve => {
            let response;

            try {
              if (post.featured_media <= 0) {
                throw "No featured image.";
              }

              response = await this.get(`/media/${post.featured_media}`);
              post.featured_image =
                response.data.media_details.sizes["medium_large"].source_url;
            } catch (error) {
              post.featured_image = null;
            }

            resolve(post);
          });
        });

        Promise.all(requests).then(posts => resolve(posts));
      });
    }
  },

  components: {
    Card
  }
};
</script>

<style scoped lang="scss">
.categories {
  display: flex;
  align-items: center;
}
#all-news {
  color: yellow;
  margin-right: 10px;
}
#sub-cats {
  color: #7f7f7f;
  margin-right: 10px;
}
.categories li {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
}
.post-cards {
  width: 25%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
}
.post-cards-old {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
}
</style>
