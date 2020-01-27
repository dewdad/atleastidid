<template>
  <div class="container-fluid">
    <div class="row">
      <ts-banner :path="$route.path" />
    </div>
    <div class="row">
      <div v-show="loggedIn" class="col thoughts">
        <em><span class="h1">All the</span> <b>Latest Thoughts</b></em>
        <br>
        <br>
        <ts-thoughts-list />
      </div>
      <div v-show="!loggedIn" class="col welcome">
        <em><span class="h1">Welcome to</span> <b>ThoughtSub.</b></em>
        <br>
        <br>
        <h4 class="text-muted">Please login to view the latest thoughts.</h4>
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
</style>
