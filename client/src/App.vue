<template>
  <div id="app">
    <FlashMessages v-if="notices.length" :notices="notices" />
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import FlashMessages from '@/components/FlashMessages'
import Navigation from '@/components/Header'
export default {
  name: 'app',
  data () {
    return {
      notices: []
    }
  },
  components: {
    FlashMessages,
    Navigation
  },
  watch: {
    $route(to, from ) {
      // ...
      let notices = this.$store.state.notices.notices
      window.console.log(to, from, notices)
      if (notices) {
        this.notices = notices
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
