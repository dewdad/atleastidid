<template>
  <div class="container-fluid">
    <div class="row">
      <ts-banner :path="$route.path" />
    </div>
    <div class="row">
      <div class="col welcome">
        <em><span class="h1">Welcome to</span> <b>ThoughtSub.</b></em>
        <br>
        <br>
        <h4 class="text-muted">Please login to view the latest thoughts.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'

export default {
  name: 'home',
  components: {
    'ts-banner': Banner
  }
}
</script>

<style>
.col.welcome {
  padding-top: 20px;
}
</style>
