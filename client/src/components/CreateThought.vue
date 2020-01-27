<template>
  <div class="container-fluid">
    <div class="row">
      <ts-banner />
    </div>
    <div class="row">
      <div class="col create-thought">
        <h2>Create and Submit a New Thought</h2>
        <form class="form create-thought text-left">
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
          <button @click.prevent="submitThought" type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import ThoughtServices from "@/services/thoughts"

export default {
  name: "create-thought",
  data () {
    return {
      title: null,
      description: null,
      body: null
    }
  },
  methods: {
    async submitThought () {
      try {
        const thought = {
          title: this.title,
          description: this.description,
          body: this.body
        }
        await ThoughtServices.createThought(thought).then(response => {
          if (response.status === 200) this.$router.push({ name: 'home' })
        })    
      } catch(err) {
        window.console.log(err)
      }
    }
  },
  components: {
    "ts-banner": Banner
  }
};
</script>

<style scoped>
.col.create-thought {
  padding-top: 20px;
}
.form.create-thought {
  width: 960px;
  margin: 0 auto;
}
</style>