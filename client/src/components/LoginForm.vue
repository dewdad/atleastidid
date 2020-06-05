<template>
  <form class="home-hero-signup" accept-charset="UTF-8" method="post">
    <fieldset class="form-group">
      <dl class="form-group errored">
        <dt class="input-label">
          <label class="form-label p" for="email">Email</label>
        </dt>
        <dd>
          <input
            v-model="email"
            type="text"
            name="email"
            id="user[email]"
            class="form-control form-control input-block"
            spellcheck="false"
          />
        </dd>
      </dl>
    </fieldset>
    <fieldset class="form-group">
      <dl class="form-group successed">
        <dt class="input-label">
          <label class="form-label p" for="password">Password</label>
        </dt>
        <dd>
          <input
            v-model="password"
            type="password"
            name="password"
            id="user[password]"
            class="form-control form-control input-block"
          />
        </dd>
        <dd
          v-if="error"
          class="error alert alert-danger"
        >[{{ error.status }}] - {{ error.message }}</dd>
      </dl>
    </fieldset>

    <button
      :class="{
        'btn btn-secondary f4 btn-block my-3': !email || !password,
        'btn btn-success f4 btn-block my-3': email && password
      }"
      type="submit"
      @click.prevent="login"
    >Login</button>
    <p class="form-control-note mb-0 mt-3">
      If you already have an account with us click the "Login" button above to enter your dashboard.
      If you don't have an account you can create a <i>free</i> account <router-link to="/register">here</router-link>.
    </p>
  </form>
</template>

<script>
// import AuthService from '@/services/auth'
export default {
  name: "login-form",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async login() {
      this.$store.dispatch("auth/login", { ...this.$data })
    }
  },
  computed: {
    error() {
      return this.$store.state.auth.error;
    }
  }
};
</script>