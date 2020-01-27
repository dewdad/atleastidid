<template>
  <div class="container row">
    <div class="card thought" v-for="thought in thoughts" :key="thought.id">
      <div class="card-header">{{ thought.title }}</div>
      <div class="card-body">{{ thought.body }}</div>
      <div class="card-footer">
        Who <i>thunk</i> it? - <span class="card__author-name">{{ thought.author }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ThoughtsService from '@/services/thoughts' 
export default {
  name: 'thoughts-list',
  data () {
    return {
      thoughts: null
    }
  },
  methods: {
    async fetchAllThoughts () {
      try {
        let response = await ThoughtsService.getAllThoughts()
        if (response.status === 200) {
          this.thoughts = response.data.thoughts
        }
      } catch(err) {
        window.console.error(err)
      }
    }
  },
  mounted () {
    if (this.$store.state.auth.userLoggedIn) this.fetchAllThoughts()
  }
}
</script>

<style scoped>
  .card.thought {
    width: 250px;
    margin: 0 15px;
  }
  .card-header,
  .card__author-name {
    text-transform: capitalize
  }
</style>
