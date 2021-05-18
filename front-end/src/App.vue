<template>
  <header class="app__heading" role="banner" aria-label="application header" aria-labelledby="Application header">
    <h1 class="app__header">simplest todo-list</h1>
    <p class="app__desc">save your do's here</p>
  </header>

  <section class="app__wrapper" role="application" aria-label="Main application core"
           aria-labelledby="Main application core">
    <article class="app__authenticate" role="article">
      <auth-banner/>
    </article>
  </section>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import AuthBanner from "./components/AuthBanner.vue"
import './index.css'

@Options({
  components: {
    AuthBanner,
  },
})
export default class App extends Vue {
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 10px;
}

.app__wrapper {
  width: 100%;
  margin: 0 auto 10px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0 rgba(120, 120, 120, .8);
}

.app__heading {
  text-align: center;
  margin-bottom: 40px;
}

.app__header {
  font-family: Poppins, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 30px;
  line-height: 1.5;
}

.app__desc {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 17px;
}

.app__wrapper .app__authenticate {
  text-align: center;
}

.user-avatar img {
  width: 8rem;
  margin-bottom: 40px;
}

.form-group {
  margin: 10px 0;
}

.form-group label {
  display: block;
  text-align: left;
}

.form-group input {
  padding: 8px 7px;
  width: 100%;
  outline: none;
  border: 1px solid rgba(40, 32, 32, 0.7);
  transition: border 0.3s ease-in;
  background: none;
  font-family: 'Open Sans', sans-serif;
  border-radius: 3px;
  margin-bottom: 10px;
}

.form-group .password-action {
  text-align: right;
  cursor: pointer;
}

.form-group .password-action .active {
  color: rgba(145, 145, 250, 0.8);
}

.form-group input:focus {
  border: 2px solid rgba(145, 145, 250, 0.8);
}

::placeholder {
  color: rgb(0, 0, 0);
  opacity: 1;
}
</style>
