<template>
  <div 
    id="flash-messages-component"
    class="alert alert-primary alert-dismissible fade show position-absolute"
    role="alert">
    <strong>{{ notice.message }}</strong>
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
  },
  watch: {
    notice () {
      window.console.log('notice watcher...')
      window.jQuery("#flash-messages-component").fadeTo(2000, 500).slideUp(500, function(){
        window.jQuery("#flash-messages-component").slideUp(500);
      });
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