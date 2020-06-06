<template>
  <div id="task-list-component" class="container-fluid py-5">
    <span>
      All of your
      <b>Latest Tasks</b>
    </span>
    <div v-if="hasTasks && !loading" class="row flex">
      <template v-if="hasTasks">
        <div class="col-12">
          <ul class="list-group">
            <li
              v-for="task in tasks"
              :key="task.id"
              :class="`list-group-item task-${task.id}`"
              :data-id="task.id"
            >
              <div class="row position-relative">
                <div class="col d-flex align-items-center">
                  <div class="title mb-0">
                    <b>Title:</b>
                    {{ task.title }}
                  </div>
                  <!-- <div class="content">
                    <b>Body:</b>
                    {{ task.body }}
                  </div> -->
                </div>
                <div class="col d-flex align-items-center">
                  <p v-if="completedTime" class="mb-0">
                    <b>Completed:</b>
                    {{ completedTime.split(',')[0] + " | " + completedTime.split(',')[1] }}
                  </p>
                  <p class="mb-0">
                    <b>Created:</b>
                    {{ task.createdAt | dateCreated }}
                  </p>
                </div>
                <div class="col completion d-flex align-items-center">
                  <TaskCheckbox :task="task" @taskMarked="taskWasMarked" />
                </div>
                <div class="col actions">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <router-link
                      tag="a"
                      class="btn btn-primary"
                      :to="`/task/${task.id}`">
                      👁️
                    </router-link>
                    <button type="button" class="btn btn-primary">Middle</button>
                    <a
                      href="#"
                      class="btn btn-primary"
                      @click.prevent="deleteTask(task.id)">
                      🗑️
                    </a>
                  </div>
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
            href 
            @click.prevent="$router.push({ name: 'create-task' })"
            class="btn btn-primary">Create a Task</a>
        </div>
      </template>
    </div>
    <div v-else>
      <div class="alert alert-danger mt-1">You haven't created a task yet :(</div>
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
  components: { TaskCheckbox },
  computed: {
    hasTasks() {
      if (this.tasks.length > 0) return true;
      return false;
    }
  },
  methods: {
    taskWasMarked(task) {
      if (task) {
        window.console.log(task)
        let taskEl = window.document.querySelector(`.task-${task.id}`)
        if (task.completed) {
          taskEl.classList.add('completed-task')
        } else {
          taskEl.classList.remove('completed-task')
        }
      }
    },
    async fetchAllTasks() {
      try {
        let response = await TasksService.getAllTasks();
        if (response.status == 200) {
          this.tasks = response.data.tasks;
          this.loading = false;
        }
      } catch (err) {
        window.console.error(err);
      }
    },
    async deleteTask(id) {
      try {
        let response = await TasksService.deleteTask(id);
        if (response.status == 200) {
          await this.fetchAllTasks();
        }
      } catch (err) {
        window.console.error(err);
      }
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
