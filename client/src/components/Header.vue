<template>
  <!-- <div id="nav">
    <div class="nav__left">
      <router-link to="/">
        <h5 class="branding">Atleast I Did...</h5>
      </router-link>
    </div>
    <div class="nav__right">
      <router-link to="/">Home</router-link>
      <router-link v-show="!loggedIn" to="/login">Login</router-link>
      <router-link v-show="!loggedIn" to="/register">Register</router-link>
      <router-link v-show="loggedIn" to="/add-task">Add a Task</router-link>
      <a href="" v-show="loggedIn" @click="logout">Logout</a>
    </div>
  </div> -->
  <div id="header-component" class="position-relative bg-dark py-2">
    <header class="f4 py-2 position-relative">
      <div class="container d-lg-flex flex-items-center">
        <div id="branding" class="position-relative d-lg-flex align-items-center">
          <router-link to="/">
            <h5 class="branding m-0">Atleast I Did...</h5>
          </router-link>
        </div>
        <nav id="nav" class="col d-lg-flex flex-row-reverse">
          <span class="mx-2">
            <router-link
              to="/"
              class="btn btn-primary">Home</router-link>
          </span>
          <span 
            v-show="!loggedIn"
            class="mx-2">
            <router-link
              to="/login"
              class="btn btn-success">Login</router-link>
          </span>
          <span 
            v-show="!loggedIn"
            class="mx-2">
            <router-link
              to="/register"
              class="btn btn-primary">Register</router-link>
          </span>
          <span 
            v-show="loggedIn"
            class="mx-2">
            <router-link
              to="/add-task"
              class="btn btn-success">Add a Task</router-link>
          </span>
          <span
            v-show="loggedIn" 
            class="mx-2">
            <a @click="logout" class="btn btn-danger">Logout</a>
          </span>
        </nav>

      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "header",
  computed: {
    loggedIn () {
      return this.$store.state.auth.userLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then(() => {
        if (!this.$store.auth.state.userLoggedIn) {
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
};
</script>

<style scoped >
#header-component a {
  color: #fff;
}
</style>
