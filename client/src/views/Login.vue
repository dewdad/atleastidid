<template>
  <div id="login-form">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
  name: 'login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  components: { LoginForm },
}
</script>

<style>
/* sign in FORM */
#login-form {
  width: 412px;
  margin: 16px auto;
}
#login-form form {
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: auto;
}
/* Mobile */
@media screen and (max-width: 500px) {
  #login-form {
    width: 300px;
  }
}
</style>
