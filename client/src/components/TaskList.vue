<template>
  <div id="task-list-component" class="container-fluid py-5">
    <span>All of your <b>Latest Tasks</b></span>
    <div v-if="hasTasks && !loading" class="row flex">
      <template v-if="hasTasks">
      <div class="col-12">
        <ul class="list-group">
          <li
            v-for="task in tasks" 
            :key="task.id" 
            :class="`list-group-item task-${task.id}`"
            :data-id="task.id">
            <div class="row position-relative">
              <div class="col">
                <div class="title">
                  <b>Title:</b> {{ task.title }}
                </div>
                <div class="content">
                  <b>Body:</b> {{ task.body }}
                </div>
              </div>
              <div class="col">
                <p v-if="completedTime"><b>Completed:</b> {{ completedTime.split(',')[0] +  " | " + completedTime.split(',')[1] }}</p>
                <p><b>Created:</b> {{ createdAtFormat(task.createdAt) }}</p>
              </div>
              <div class="col">
                <a
                  href="#"
                  class="btn btn-danger position-absolute"
                  style="right: 0; top: 0;"
                  @click.prevent="deleteTask(task.id)">Delete</a>
                  <TaskCheckbox :task="task" @taskMarked="taskWasMarked(task)" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      </template>
      <template v-else>
        <div class="alert alert-default w-100">
          <p class="text-center">You haven't shared any tasks.</p>
          <a
            href=""
            @click.prevent="$router.push({ name: 'create-task' })"
            class="btn btn-primary"
          >Create a Task</a>
        </div>
      </template>
    </div>
    <div v-else>
      <div class="alert alert-danger mt-1">
        You haven't created a task yet :(
      </div>
      <router-link tag="a" to="/add-task">Click here</router-link> to create your first task!
    </div>
    <div v-if="loading" class="row text-center">
      <div class="py-5 w-100 position-relative">
        <div class="spinner-border text-primary position-absolute" role="status"></div>
        <span>Loading all your tasks. Please hang tight...</span>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCheckbox from "@/components/TaskCheckbox";
import TasksService from "@/services/tasks";
export default {
  name: "tasks-list",
  data() {
    return {
      loading: true,
      completedTime: null,
      tasks: []
    };
  },
  components: {
    TaskCheckbox
  },
  computed: {
    hasTasks() {
      if (this.tasks && this.tasks.length) return true
      return false
    }
  },
  methods: {
    taskWasMarked(task) {
      var el = document.querySelector(`.task-${task.id}`)
      if (el.classList.contains('completed-task') && !this.completed) {
        this.completedTime = null
        el.classList.remove('completed-task')
        return
      }

      if (task.completed) {
        this.completedTime = new Date().toLocaleString()
        el.classList.add('completed-task')
      } 
    },
    async fetchAllTasks() {
      try {
        let response = await TasksService.getAllTasks();
        if (response.status === 200) {
          this.tasks = response.data.tasks
          this.loading = false
        }
      } catch (err) {
        window.console.error(err);
      }
    },
    async deleteTask(id) {
      try {
        let response = await TasksService.deleteTask(id);
        if (response.status === 200) {
          await this.fetchAllTasks()
        }
      } catch (err) {
        window.console.error(err);
      }
    },
    createdAtFormat(dateStr) {
      let d = new Date(dateStr);
      let date = d.toLocaleDateString();
      let time = d.toLocaleTimeString();
      return `${date} | ${time}`;
    }
  },
  mounted() {
    if (this.$store.state.auth.userLoggedIn) this.fetchAllTasks();
  }
};
</script>

<style scoped>
  .completed-task .title,
  .completed-task .content {
    text-decoration: line-through;
  }
  .spinner-border.text-primary.position-absolute {
    left: calc(50% - 20px);
    top: 0px;
  }
</style>
