<template>
  <!-- <div class="banner">
    <ts-breadcrumb :path="$route.path" />
  </div>-->
  <div class="py-6 py-sm-8">
    <div :class="`container-lg p-responsive position-relative ${(loggedIn) ? 'py-5' : ''}`">
      <div class="d-md-flex flex-items-center align-items-center">
        <div class="col-md-7 text-center text-md-left">
          <h1 class="page-title mb-3">Built for the Self-Disciplined</h1>
          <p class="mb-4">
            AtleastIDid is a task management platform inspired by the way you work. From
            <a href="#" class="jumbotron-link">Goal Creation</a> to
            <a href="#" class="jumbotron-link">Goal Completion</a>, you can track and audit yourself, manage projects, and build your self-discipline alongside 40 million&nbsp;users.
          </p>
        </div>
        <div v-show="!loggedIn" class="mx-auto col-sm-8 col-md-6 hide-sm">
          <div class="rounded-bottom text-white bg-dark py-4 px-4 px-md-3 px-lg-4">
            <form
              class="home-hero-signup"
              autocomplete="off"
              accept-charset="UTF-8"
              method="post"
            >
              <!-- <input
                type="hidden"
                name="authenticity_token"
                value="4kCkAqUSFMzw3R3Z56bR9qBJnUfmHZYRQ2iTSz+JIw5LcHnabAId0UPo3h+ua6uVKbgDPRcyqMfVbKVr6NmjyQ=="
              /> -->
              <fieldset class="form-group">
                <dl class="form-group mt-0">
                  <dt class="input-label">
                    <label class="form-label h5" for="user[login]">Username</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      name="user[login]"
                      id="user[login]"
                      class="form-control form-control-lg input-block"
                      autocomplete="off"
                      spellcheck="false"
                    />
                  </dd>
                </dl>
              </fieldset>
              <fieldset class="form-group">
                <dl class="form-group errored">
                  <dt class="input-label">
                    <label class="form-label h5" for="user[email]">Email</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      name="user[email]"
                      id="user[email]"
                      class="form-control form-control-lg input-block js-email-notice-trigger is-autocheck-errored"
                      autocomplete="off"
                      spellcheck="false"
                    />
                  </dd>
                  <dd class="error">Email is invalid or already taken</dd>
                </dl>
              </fieldset>
              <fieldset class="form-group">
                <dl class="form-group successed">
                  <dt class="input-label">
                    <label class="form-label h5" for="user[password]">Password</label>
                  </dt>
                  <dd>
                    <input
                      type="password"
                      name="user[password]"
                      id="user[password]"
                      class="form-control form-control-lg input-block"
                    />
                    <p class="form-control-note text-gray-dark">
                      Make sure it's
                      <span data-more-than-n-chars>at least 15 characters</span> OR
                      <span data-min-chars class="text-green">at least 8 characters</span>
                      <span data-number-requirement class="text-green">including a number</span>
                      <span data-letter-requirement class="text-green">and a lowercase letter</span>.
                      <a
                        href="https://help.github.com/articles/creating-a-strong-password"
                        class="tooltipped tooltipped-s"
                        aria-label="Learn more about strong passwords"
                      >Learn more</a>.
                    </p>
                  </dd>
                </dl>
              </fieldset>

              <button
                class="btn btn-secondary f4 btn-block my-3"
                type="submit"
                data-ga-click="Signup, Attempt, location:home hero"
              >Sign up for GitHub</button>
              <p class="form-control-note mb-0 mt-3">
                By clicking “Sign up for GitHub”, you agree to our
                <a
                  class
                  href="https://help.github.com/terms"
                  target="_blank"
                >Terms of Service</a> and
                <a
                  class
                  href="https://help.github.com/privacy"
                  target="_blank"
                >Privacy Statement</a>.
                <span class="js-email-notice">We’ll occasionally send you account related emails.</span>
              </p>
            </form>
          </div>
        </div>
        <div class="d-sm-none text-center">
          <a
            rel="nofollow"
            class="btn-mktg btn-primary-mktg btn-large-mktg"
            data-ga-click="Signup, Attempt, location:home hero mobile"
            href="#"
          >Sign up for GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Breadcrumbs from '@/components/Breadcrumbs'
export default {
  name: "banner",
  computed: {
    loggedIn () {
      return this.$store.getters["auth/loggedIn"]
    }
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
