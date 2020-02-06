<template>
  <div id="task-list-component" class="container-fluid">
    <span>All of your <b>Latest Tasks</b></span>
    <div class="row flex">
      <template v-if="hasThoughts">
      <div class="col-12">
        <ul class="list-group">
          <li
            v-for="thought in thoughts" 
            :key="thought.id" 
            class="list-group-item">
            <div class="row position-relative">
              <div class="col">
                <div class="title">
                  <b>Title:</b> {{ thought.title }}
                </div>
                <div class="content">
                  <b>Body:</b> {{ thought.body }}
                </div>
              </div>
              <div class="col">
                <p><b>Created:</b> {{ createdAtFormat(thought.createdAt) }}</p>
                <a
                  href="#"
                  class="btn btn-danger position-absolute"
                  style="right: 0; top: 0;"
                  @click.prevent="deleteThought(thought.id)">Delete</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      </template>
      <template v-else>
        <div class="alert alert-default w-100">
          <p class="text-center">You haven't shared any thoughts.</p>
          <a
            href=""
            @click.prevent="$router.push({ name: 'create-thought' })"
            class="btn btn-primary"
          >Create a Thought</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ThoughtsService from "@/services/thoughts";
export default {
  name: "thoughts-list",
  data() {
    return {
      thoughts: []
    };
  },
  computed: {
    hasThoughts() {
      if (this.thoughts.length > 0) return true
      return false
    }
  },
  methods: {
    async fetchAllThoughts() {
      try {
        let response = await ThoughtsService.getAllThoughts();
        if (response.status === 200) {
          window.console.log('Loading thoughts:', response.data.thoughts)
          this.thoughts = response.data.thoughts;
        }
      } catch (err) {
        window.console.error(err);
      }
    },
    async deleteThought(id) {
      try {
        window.console.log("Deleting thought: " + id + "...");
        let response = await ThoughtsService.deleteThought(id);
        if (response.status === 200) {
          window.console.log('Thought deleted...')
          this.thoughts = await this.fetchAllThoughts();
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
    if (this.$store.state.auth.userLoggedIn) this.fetchAllThoughts();
  }
};
</script>

<style scoped>
.card.thought {
  width: 250px;
  min-height: 250px;
  margin: 0 15px;
}
.card-header,
.card__author-name {
  text-transform: capitalize;
}
.row.flex {
  padding: 20px 0;
  align-items: center;
  flex-flow: wrap;
}
.clickable:hover {
  cursor: pointer;
  color: crimson;
}
.card {
  position: relative;
}
.close-icon {
  position: absolute;
  right: 5px;
  top: 0px;
}
</style>
