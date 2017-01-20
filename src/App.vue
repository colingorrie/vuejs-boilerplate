<template>
  <div class="App">
    <div class="pure-g">
      <div class="pure-u-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="sass">
  @import "./styles/variables";
  @import "./styles/reset";

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
  }

  html, button, input, select, textarea,
  .pure-g [class *= "pure-u"] {
    font-family: $source-sans;
  }

  .pure-g > div {
    box-sizing: border-box;
  }  

  .App {

  }
</style>
