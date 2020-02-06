<template>
  <div class="container-fluid">
    <div v-if="!loggedIn" class="row">
      <banner :path="$route.path" />
    </div>
    <div class="row">
      <div v-show="loggedIn" class="col thoughts">
        <task-list />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import TaskList from '@/components/TaskList'

export default {
  name: 'home',
  computed: {
    loggedIn () {
      return this.$store.state.auth.userLoggedIn
    }
  },
  components: {
    'banner': Banner,
    'task-list': TaskList
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
