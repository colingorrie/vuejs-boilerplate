<template>
  <div class="Login" v-show="!isAuthenticated">
    <h2>Log In</h2>
    <form class="pure-form pure-form-aligned" @submit.prevent="validate">
      <legend>Enter your email and password</legend>
      <fieldset>

        <div class="pure-control-group">
          <label for="email">Email</label>
          <input id="email" name="email" placeholder="Email" type="text" v-model="credentials.email" v-validate data-vv-rules="required">
          <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="pure-control-group">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" v-model="credentials.password" v-validate data-vv-rules="required">
          <span class="error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
        </div>

        <div class="pure-controls">
          <button class="pure-button pure-button-primary">Log In</button>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    }
  },
  methods: {
    submit() {
      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      };
      this.$store.dispatch("getToken", credentials)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(() => {});
    },
    validate() {
      this.$validator.validateAll();

      if (!this.errors.any()) {
        this.submit();
      }
    }
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="sass">
  .Login {}
</style>
