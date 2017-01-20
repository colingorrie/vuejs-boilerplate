<template>
  <div class="Home">
    <h1>Things</h1>
    <p>You have {{ things.length }} things.</p>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    things() { return this.$store.state.things.items; }
  },
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
  .Home {

  }
</style>
