<template>
      <h1 class="app__header">overdoes</h1>
      <p class="app__desc">save your do's here</p>
  <div class="wrapper">
    <header class="app__heading">
    </header>

    <section class="app__authenticate" role="banner">
      <auth-banner/>
    </section>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import AuthBanner from "./components/AuthBanner.vue"

@Options({
  components: {
    AuthBanner,
  },
})
export default class App extends Vue {
}
</script>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 100vw;
  background-color: #e5e4e4;
}

body, html {
  max-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.wrapper {
  width: 45%;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0 rgba(120, 120, 120, .8);
}

.app__heading {
  text-align: center;
}

.app__header {
  font-family: Poppins, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 35px;
  line-height: 1.5;
}

.app__desc {
  font-weight: 300;
  font-size: 18px;
}
</style>
