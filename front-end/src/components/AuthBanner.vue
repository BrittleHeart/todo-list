<template>
  <h2 class="auth-banner__header">Sign in</h2>

  <form @submit.prevent="signIn">
    <div class="form-group">
      <label for="signInEmail">Email address:</label>
      <input
          type="email"
          id="signInEmail"
          placeholder="type your email here .."
          autocomplete="email"
          v-model="user.email">
      <p>{{ user.email }}</p>
    </div>
    <div class="form-group">
      <label for="signInPassword">Password:</label>
      <input
          type="password"
          id="signInPassword"
          placeholder="type your password here .."
          autocomplete="password"
          v-model="user.password">
      <p>{{ user.password }}</p>
    </div>

    <button class="">sign-in</button>
  </form>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import IUser from "@/interfaces/IUser"

@Options({name: 'auth-banner'})
export default class AuthBanner extends Vue {
  user: IUser = {
    email: '',
    password: ''
  }

  async signIn() {

  }
}
</script>

<style scoped>

</style>