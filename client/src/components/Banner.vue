<template>
  <div class="banner">
    <ts-breadcrumb :path="$route.path" />
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: 'banner',
  components: {
    'ts-breadcrumb': Breadcrumbs
  }
};
</script>

<style scoped>
.banner {
  position: relative;
  display: block;
  width: 100%;
  height: 300px;
  background: radial-gradient(
        circle at 0% 50%,
        rgba(96, 16, 48, 0) 9px,
        #613 10px,
        rgba(96, 16, 48, 0) 11px
      )
      0px 10px,
    radial-gradient(
      at 100% 100%,
      rgba(96, 16, 48, 0) 9px,
      #613 10px,
      rgba(96, 16, 48, 0) 11px
    ),
    #8a3;
  background-size: 20px 20px;
}
</style>
