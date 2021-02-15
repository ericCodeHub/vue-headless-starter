<template>
  <div>
    <li>
      <router-link
        id="card-link"
        v-if="post.featured_image"
        :to="{ name: 'post', params: { slug: post.slug } }"
      >
        <img :src="post.featured_image" alt="" />
      </router-link>

      <h4>
        <router-link
          :to="{ name: 'post', params: { slug: post.slug } }"
          v-html="post.title.rendered"
        >
        </router-link>
        <span> -- {{ getFormattedDate(post.date) }}</span>
      </h4>
    </li>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    post: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
h4 {
  font-weight: bolder;
  font-size: 1.25vw;
}
a {
  color: black;
}
a:active {
  text-decoration: underline;
}
a:hover {
  text-decoration: underline;
}
</style>
