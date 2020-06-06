<template>
  <div class="col-md-12 py-3 py-sm-8">
    <div class="container-lg p-responsive position-relative">
      <div class="jumbo-registration-wrapper d-md-flex flex-items-center align-items-center">
        <!-- Jumbotron -->
        <jumbotron title="Planning for the Self-Disciplined">
          <p class="mb-4">
            AtleastIDid is a task management platform inspired by the way you work. From
            <a href="#" class="jumbotron-link">Goal Creation</a> to
            <a href="#" class="jumbotron-link">Goal Completion</a>, you can track and audit yourself, manage projects, and build your self-discipline.
          </p>
        </jumbotron>
        <!-- ./Jumbotron -->
        <!-- Register Form -->
        <div class="mx-auto hide-sm" :style="{ 'width': '100%', 'max-width': '400px' }">
          <login-form v-if="!$helpers.loggedIn()" />
        </div>
        <div class="d-sm-none text-center">
          <a
            rel="nofollow"
            class="btn-mktg btn-primary-mktg btn-large-mktg"
            data-ga-click="Signup, Attempt, location:home hero mobile"
            href="#"
          >Sign up and be Productive!</a>
        </div>
        <!-- ./Register Form -->
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import Jumbotron from '@/components/Jumbotron'
export default {
  name: "banner",
  components: {
    Jumbotron,
    LoginForm
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
