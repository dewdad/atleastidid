<template>
  <div class="container-fluid">
    <div class="row">
      <ts-banner :path="$route.path" />
    </div>
    <div class="row">
      <div v-show="loggedIn" class="col thoughts">
        <em><span class="h1">All of your</span> <b>Latest Thoughts</b></em>
        <br>
        <ts-thoughts-list />
      </div>
      <div v-show="!loggedIn" class="col welcome">
        <em><span class="h1">Welcome to</span> <b>ThoughtSub.</b></em>
        <br>
        <p class="what-is-it lead">
          ThoughtSub is a place where we can bounce ideas, thoughts and plans anonymously.
          Sing up, login and proceed to brain-dump ideas. You may be pleased to discover some
          like-minded user's on the platform.
        </p>
        <p class="text-muted">
          <router-link to="login">Login</router-link> to view all of our user's latest thoughts.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import ThoughtsList from '@/components/ThoughtsList'

export default {
  name: 'home',
  computed: {
    loggedIn () {
      return this.$store.state.auth.userLoggedIn
    }
  },
  components: {
    'ts-banner': Banner,
    'ts-thoughts-list': ThoughtsList
  }
}
</script>

<style>
.col.welcome,
.col.thoughts {
  padding-top: 20px;
}

.what-is-it {
  max-width: 400px;
  margin: 0 auto 40px auto;
}
</style>
