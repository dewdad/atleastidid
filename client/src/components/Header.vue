<template>
  <div id="nav-component" class="position-relative nav">
    <header class="py-3 position-relative w-100 border-bottom">
      <div class="container-fluid d-lg-flex flex-items-center">
        <div id="branding" class="d-lg-flex align-items-center">
          <router-link class="position-relative mb-2" tag="div" to="/">
            <h5 class="branding-title m-0">atleastidid</h5>
            <small>.com</small>
          </router-link>
        </div>
        <nav id="nav" class="col d-lg-flex justify-content-end">
          <router-link
            to="/"
            class="nav-link btn btn-primary mr-1 mb-1">
            {{ !$helpers.loggedIn() ? 'Home' : 'Dashboard' }}
          </router-link>
          <router-link
            v-if="!$helpers.loggedIn()"
            to="/login"
            class="nav-link btn btn-primary mr-1 mb-1">Login</router-link>
          <router-link
            v-if="!$helpers.loggedIn()"
            to="/register"
            class="nav-link btn btn-primary mr-1 mb-1">Register</router-link>
          <router-link
            v-if="$helpers.loggedIn()"
            to="/add-task"
            class="nav-link btn btn-primary mr-1 mb-1">Add a Task</router-link>
          <a
            v-if="$helpers.loggedIn()"
            class="nav-link btn btn-primary mb-1"
            @click.prevent="logout">Logout</a>
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
