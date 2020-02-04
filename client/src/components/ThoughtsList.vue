<template>
  <div class="container">
    <div class="row flex">
      <template v-if="thoughts.length">
        <div class="card thought" v-for="thought in thoughts" :key="thought.id">
          <div class="card-header"><b>{{ thought.title }}</b></div>
          <div class="card-body">{{ thought.body }}</div>
          <div class="card-footer">
            <span class="card__author-name text-muted">You: </span>
            <small class="card__created">{{ createdAtFormat(thought.createdAt) }}</small>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="alert alert-default w-100">
          <p class="text-center">You haven't shared any thoughts.</p>
          <a
            href
            @click="$router.push({ name: 'create-thought' })"
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
  methods: {
    async fetchAllThoughts() {
      try {
        let response = await ThoughtsService.getAllThoughts();
        if (response.status === 200) {
          this.thoughts = response.data.thoughts;
        }
      } catch (err) {
        window.console.error(err);
      }
    },
    createdAtFormat (dateStr) {
      let d = new Date(dateStr)
      let date = d.toLocaleDateString()
      let time = d.toLocaleTimeString()
      return `${date} | ${time}`
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
  flex-flow: wrap
}
</style>
