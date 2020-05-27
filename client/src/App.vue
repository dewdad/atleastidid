<template>
  <div id="app">
    <FlashMessages v-if="notice" :notice="notice" />
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
    return {
      notice: null
    }
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
      window.console.log('watching notices!', val)
      const latest = val.slice(-1)[0]
      window.console.log('latest notification:', latest)
      this.notice = latest
    }
  },
  created () {
    window.console.log(this.notices)
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
