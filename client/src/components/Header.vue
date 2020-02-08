<template>
  <div id="nav-component" class="position-relative bg-dark py-2">
    <header class="f4 py-2 position-relative">
      <div class="container-fluid d-lg-flex flex-items-center">
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
            v-show="!$helpers.loggedIn()"
            class="mx-2">
            <router-link
              to="/login"
              class="btn btn-success">Login</router-link>
          </span>
          <span 
            v-show="!$helpers.loggedIn()"
            class="mx-2">
            <router-link
              to="/register"
              class="btn btn-primary">Register</router-link>
          </span>
          <span 
            v-show="$helpers.loggedIn()"
            class="mx-2">
            <router-link
              to="/add-task"
              class="btn btn-success">Add a Task</router-link>
          </span>
          <span
            v-show="$helpers.loggedIn()" 
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
  name: "navigation",
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      .then(() => {
        if (!this.$store.state.auth.userLoggedIn) {
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
