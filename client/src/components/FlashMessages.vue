<template>
  <div id="flash-messages-component" class="alert alert-warning alert-dismissible fade show position-absolute" role="alert">
    <strong>{{ notice.message }}</strong>
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
    notice: {
      type: Object,
      required: true
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