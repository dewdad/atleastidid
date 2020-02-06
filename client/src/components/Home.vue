<template>
  <div class="container-fluid">
    <div v-if="!$helpers.loggedIn()" class="row">
      <banner :path="$route.path" />
    </div>
    <div class="row">
      <div v-show="$helpers.loggedIn()" class="col thoughts">
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
  components: {
    'banner': Banner,
    'task-list': TaskList
  }
}
</script>
