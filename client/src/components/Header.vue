<template>
  <div id="nav">
    <div class="nav__left">
      <router-link to="/">
        <h5 class="branding">ThoughtSub.</h5>
      </router-link>
    </div>
    <div class="nav__right">
      <!-- <router-link to="/">Home</router-link>| -->
      <router-link v-show="!loggedIn" to="/login">Login</router-link>
      <router-link v-show="!loggedIn" to="/register">Register</router-link>
      <router-link v-show="loggedIn" to="/share-a-thought">Submit Thought</router-link>
      <a href="" v-show="loggedIn" @click="logout">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ts-header",
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

<style scoped>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav a {
  padding: 18px 10px;
  display: inline-block;
  height: 60px;
}
#nav {
  padding: 0;
  /* background: #999; */
  height: 60px;
  position: relative;
  /* opacity: 0.75; */
}
.nav__left {
  position: absolute;
  left: 0;
  bottom: 0;
  padding-left: 40px;
  width: 50%;
  text-align: left;
}
.branding {
  margin: 0;
}
.nav__right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  padding-right: 40px;
  height: 60px;
  width: 50%;
  text-align: right;
}
</style>
