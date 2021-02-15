<template>
  <footer>
    <div class="banner">
      <h1>Let's start your next project</h1>
      <b-icon id="footer-arrow" scale="4" icon="arrow-right" />
    </div>
  </footer>
</template>

<script>
export default {
  name: "Foot"
};
</script>

<style scoped lang="scss">
footer {
  display: flex;
}

a {
}
.banner {
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  width: 100%;
  align-items: center;
}
.banner h1 {
  margin: 50px 25px;
}
#footer-arrow {
  margin-right: 25px;
}
</style>
