<template>
  <div id="flash-messages-component" class="alert alert-warning alert-dismissible fade show position-absolute" role="alert">
    <strong>{{ lastNotice }}</strong>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "flash-messages",
  props: {
    notices: {
      type: Array,
      required: true
    }
  },
  computed: {
    lastNotice () {
      return this.notices[this.notices.length - 1].message
    }
  }
};
</script>

<style scoped>
#flash-messages-component {
  z-index: 1000;
  width: 100%;
}
</style>