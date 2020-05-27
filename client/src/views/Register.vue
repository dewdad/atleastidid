<template>
  <div id="register-form">
    <form class="form-register">
      <h1 class="h3 mb-3 font-weight-normal text-capitalize" style="text-align: center">
        {{ $helpers.getPathName($route.path) }}
      </h1>
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
      <button @click.prevent="register" class="btn btn-success btn-block" type="submit">
        <i class="fas fa-sign-in-alt"></i> Sign Up
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
    async register () {
      try {
        let creds = { email: this.email, password: this.password }
        const response = await AuthService.register(creds)
        if (response.status === 200) {
          this.$router.push({ name: 'login' })
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
#register-form {
  width: 412px;
  margin: 10vh auto;
  background-color: #f3f3f3;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
#register-form form {
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: auto;
}
#register-form .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
#register-form .form-control:focus {
  z-index: 2;
}
#register-form .form-register input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#register-form .form-register input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#register-form a {
  display: block;
  padding-top: 10px;
  color: lightseagreen;
}

#register-form button[type="submit"] {
  margin-top: 10px;
}

#register-form .form-reset,
#register-form .form-signup {
  display: none;
}

#register-form .form-signup .social-btn {
  width: 210px;
}

#register-form .form-signup input {
  margin-bottom: 2px;
}

.form-signup .social-login {
  width: 210px !important;
  margin: 0 auto;
}

/* Mobile */

@media screen and (max-width: 500px) {
  #register-form {
    width: 300px;
  }
}
</style>
