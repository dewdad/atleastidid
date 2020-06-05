<template>
  <div id="nav-component" class="position-relative nav">
    <header class="py-3 position-relative w-100 border-bottom">
      <div class="container-fluid d-lg-flex flex-items-center">
        <div id="branding" class="position-relative d-lg-flex align-items-center">
          <router-link tag="div" to="/">
            <h5 class="branding-title m-0">atleastidid</h5>
            <small>.com</small>
          </router-link>
        </div>
        <nav id="nav" class="col d-lg-flex flex-row-reverse text-white">
          <span class="mx-2">
            <router-link
              to="/"
              class="btn btn-primary">
              {{ !$helpers.loggedIn() ? 'Home' : 'Dashboard' }}
            </router-link>
          </span>
          <span 
            v-if="!$helpers.loggedIn()"
            class="mx-2">
            <router-link
              to="/login"
              class="btn btn-primary">Login</router-link>
          </span>
          <span 
            v-if="!$helpers.loggedIn()"
            class="mx-2">
            <router-link
              to="/register"
              class="btn btn-primary">Register</router-link>
          </span>
          <span 
            v-if="$helpers.loggedIn()"
            class="mx-2">
            <router-link
              to="/add-task"
              class="btn btn-success">Add a Task</router-link>
          </span>
          <span
            v-if="$helpers.loggedIn()" 
            class="mx-2">
            <a @click.prevent="logout" class="btn btn-danger">Logout</a>
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
