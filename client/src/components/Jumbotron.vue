<template>
  <div class="col-md-7 text-center text-md-left">
    <h1 class="page-title mb-3">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jumbotron',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
