<template>
  <div id="task-list-component" class="container-fluid py-5">
    <span>All of your <b>Latest Tasks</b></span>
    <div class="row flex">
      <template v-if="hasTasks">
      <div class="col-12">
        <ul class="list-group">
          <li
            v-for="task in tasks" 
            :key="task.id" 
            class="list-group-item">
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
                <p><b>Created:</b> {{ createdAtFormat(task.createdAt) }}</p>
                <a
                  href="#"
                  class="btn btn-danger position-absolute"
                  style="right: 0; top: 0;"
                  @click.prevent="deleteTask(task.id)">Delete</a>
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
  </div>
</template>

<script>
import TasksService from "@/services/tasks";
export default {
  name: "tasks-list",
  data() {
    return {
      tasks: []
    };
  },
  computed: {
    hasTasks() {
      if (this.tasks.length > 0) return true
      return false
    }
  },
  methods: {
    async fetchAllTasks() {
      try {
        let response = await TasksService.getAllTasks();
        if (response.status === 200) {
          window.console.log('Loading tasks:', response.data.tasks)
          this.tasks = response.data.tasks;
        }
      } catch (err) {
        window.console.error(err);
      }
    },
    async deleteTask(id) {
      try {
        window.console.log("Deleting task: " + id + "...");
        let response = await TasksService.deleteTask(id);
        if (response.status === 200) {
          window.console.log('Task deleted...')
          this.tasks = await this.fetchAllTasks();
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

<style scoped></style>
