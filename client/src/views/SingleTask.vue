<template>
  <div class="container">
    <div class="row">
      <div class="col card rounded border mt-4 shadow pt-4">
        <header class="mb-3 p-2">
          <h1 class="page-title">{{ task.title }}</h1>
          <hr class="my-1">
          <small class="text-muted">Authored: {{ task.author }}</small>
          <br>
          <small class="text-muted">Created: {{ Date(task.createdAt).toLocaleString() }}</small>
        </header>
        <dd class="task-status p-2">
          <h3 class="mr-2">Status:</h3>
          <hr class="my-1">
          <h4 :class="{ 'text-danger': task.completed == false, 'text-success': task.completed }">
            {{ !task.completed ? 'Incomplete' : 'Complete' }}
          </h4>
        </dd>
        <dd class="task-description p-2">
          <h3>Description:</h3>
          <hr class="my-1">
          <p>{{ task.description }}</p>
        </dd>
        <dd class="task-body p-2">
          <h3>Body:</h3>
          <hr class="my-1">
          <p>{{ task.body }}</p>
        </dd>
        <!-- <p>Your are viewing task: <pre>{{ task }}</pre></p> -->
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '@/services/tasks'
export default {
  name: 'single-task',
  props: ['id'],
  data () {
    return {
      taskId: null,
      task: {}
    }
  },
  methods: {
    fetchTask() {
      var vm = this
      TaskService.getTask(this.taskId)
        .then(response => vm.task = response.data.task)
        .catch(error => window.console.error(error))
    }
  },
  mounted () {
    const ID = this.$props.id
    window.console.log(this.$props)
    if (ID != null || ID != undefined) {
      this.$data.taskId = ID
      this.fetchTask()
    }

  }
}
</script>