<template>
    <ul class="breadcrumbs">
      <li class="current-page">{{ currPage }}</li>
    </ul>
</template>

<script>
export default {
  name: 'breadcrumbs',
  data () {
    return  {
      currPage: null
    }
  },
  props: {
    path: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.currPage = this.$route.name
  }
}
</script>

<style scoped>
.breadcrumbs {
  text-align: left;
  list-style: none;
  background: #fff;
  padding: 10px;
  width: auto;
  display: inline-block;
  position: absolute;
  left: 10px;
  bottom: 10px;
  margin: 0;
}
.breadcrumbs > li {
  text-transform: capitalize
}
</style>