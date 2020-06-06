<template>
  <div id="app">
    <FlashMessages :notice="notice" />
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import FlashMessages from '@/components/FlashMessages'
import { mapState } from 'vuex'
import Navigation from '@/components/Header'
export default {
  name: 'app',
  data () {
    return { notice: null }
  },
  computed: {
    ...mapState('notices', { notices: state => state.notices })
  },
  components: {
    FlashMessages,
    Navigation
  },
  watch: {
    notices (val) {
      if (val) {
        const latest = val.slice(-1)[0]
        window.console.log('latest notification:', latest)
        this.notice = latest
      }
    }
  },
  created () {
    window.console.log('state notices:', this.notices)
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
