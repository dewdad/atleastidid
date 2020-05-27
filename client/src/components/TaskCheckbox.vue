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
      let message = ''
      await TasksService.toggleCompleted(id, this.completed)
        .then(response => {
          if (response.status === 200) {
            if (response.data.complete === true) {
              message = `Task ${id} was completed!`
            } else {
              message = `Task ${id} is incomplete!`
            }
            this.$store.commit('notices/addNotice', { message })
            this.$emit('taskMarked', response.data)
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  },
  watch: {
    completed () {
      this.toggleCompleted(this.task.id);
    }
  }
};
</script>