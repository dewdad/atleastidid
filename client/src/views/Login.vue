<template>
  <div id="login-form">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">Sign in</h1>
      <input
        v-model="email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      />
      <input
        v-model="password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <button @click.prevent="login" class="btn btn-success btn-block" type="submit">
        <i class="fas fa-sign-in-alt"></i> Sign in
      </button>
    </form>
  </div>
</template>

<script>
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
  margin: 10vh auto;
  background-color: #f3f3f3;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
#login-form form {
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: auto;
}
#login-form .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
#login-form .form-control:focus {
  z-index: 2;
}
#login-form .form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#login-form .form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#login-form a {
  display: block;
  padding-top: 10px;
  color: lightseagreen;
}

#login-form button[type="submit"] {
  margin-top: 10px;
}

#login-form .form-reset,
#login-form .form-signup {
  display: none;
}

#login-form .form-signup .social-btn {
  width: 210px;
}

#login-form .form-signup input {
  margin-bottom: 2px;
}

.form-signup .social-login {
  width: 210px !important;
  margin: 0 auto;
}

/* Mobile */

@media screen and (max-width: 500px) {
  #login-form {
    width: 300px;
  }
}
</style>
