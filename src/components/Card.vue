<template>
  <li>
    <router-link
      v-if="post.featured_image"
      :to="{ name: 'post', params: { slug: post.slug } }">
      <img :src="post.featured_image" alt=""/>
    </router-link>
    <span>
      <i>&mdash;</i>
        {{ getFormattedDate(post.date) }}
      <i>&mdash;</i>
    </span>
    <h3>
      <router-link
        :to="{
          name: 'post',
          params: {
            slug: post.slug
          }
        }"
        v-html="post.title.rendered">
      </router-link>
    </h3>
  </li>
</template>

<script>
export default {
  name: 'Card',

  props: {
    post: {
      type: Object
    }
  }
}

</script>

<style scoped lang="scss">

</style>

