<template>
  <div class="container-fluid">
    <div class="row">
      <div v-show="$helpers.loggedIn()" class="col thoughts">
        <task-list />
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'

export default {
  name: 'home',
  components: {
    'task-list': TaskList
  }
}
</script>
