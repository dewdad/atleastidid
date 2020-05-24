<template>
  <div class="container-fluid">
    <div v-if="!$helpers.loggedIn()" class="row">
      <banner />
    </div>
    <div class="row py-5">
      <div class="col">
        <h2 class="page-title">Create and Submit a New Task</h2>
        <hr>
        <form class="form text-left">
          <div class="form-group">
            <label for="title">Title</label>
            <input v-model="title" type="text" class="form-control" id="title" name="title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input v-model="description" type="text" class="form-control" id="description" name="description" />
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <textarea v-model="body" class="form-control" id="body" name="body" />
          </div>
          <button @click.prevent="submitTask" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import TasksServices from "@/services/tasks"

export default {
  name: "create-task",
  data () {
    return {
      title: null,
      description: null,
      body: null
    }
  },
  methods: {
    async submitTask () {
      try {
        const task = {
          title: this.title,
          description: this.description,
          body: this.body
        }
        await TasksServices.createTask(task).then(response => {
          if (response.status === 200) this.$router.push({ name: 'home' })
        })    
      } catch(err) {
        window.console.error(err)
      }
    }
  },
  components: {
    "banner": Banner
  }
};
</script>
