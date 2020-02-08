<template>
  <label for class="d-flex align-items-center">
    Completed?
    <input type="checkbox" class="form-control-sm ml-3" v-model="completed" />
  </label>
</template>

<script>
import TasksService from "@/services/tasks";

export default {
  name: "task-checkbox",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      completed: null
    }
  },
  methods: {
    async toggleCompleted(id) {
      window.console.log("toggleCompleted called...");
      await TasksService.toggleCompleted(id, this.completed)
        .then(response => {
          if (response.status === 200) {
            window.console.log(response.data)
            if (this.completed) {
              this.$store.commit('notices/addNotice', { message: response.data.message })
            }
            this.$emit('taskMarked')
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  },
  watch: {
    completed() {
      // this.$store.commit('notices/clearNotices')
      window.console.log("ok");
      window.console.log(JSON.stringify(this.task.id), JSON.stringify(this.completed))
      if (this.completed !== null || this.completed !== undefined)
        this.toggleCompleted(this.task.id);
    }
  }
};
</script>