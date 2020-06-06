<template>
  <div id="login-form">
    <login-form />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import AuthService from '@/services/auth'
export default {
  name: 'login',
  data () {
    return {
      username: null,
      email: null,
      password: null,
      error: null
    }
  },
  components: { LoginForm },
  methods: {
    async login () {
      try {
        let creds = { email: this.email, password: this.password }
        const response = await AuthService.login(creds)
        if (response.status === 200) {
          this.$store
            .dispatch('auth/setAuthToken', response.data.token)
            .then(() => this.$router.push({ name: 'list-tasks' }))
          window.location.reload
        }
      } catch(err) {
        this.error = err
        window.console.error(err)
      }
    }
  }
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
