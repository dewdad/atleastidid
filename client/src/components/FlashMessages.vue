<template>
  <div
    v-if="notice"
    id="flash-messages-component"
    :class="`alert alert-${notice.type || 'primary'} fade show position-absolute`"
    role="alert">
    {{ notice.message }}
  </div>
</template>

<script>
const $ = window.jQuery
export default {
  name: "flash-messages",
  props: {
    notice: { type: Object }
  },
  updated () {
    window.console.info('FlashMessages component updated')
    this.fadeAway()
  },
  methods: {
    fadeAway () {
      $("#flash-messages-component").fadeTo(2000, 500).slideUp(500, function(){
        $("#flash-messages-component").slideUp(500);
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