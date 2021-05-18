<template>
  <form @submit.prevent="signUp">
    <div class="form-group">
      <label for="signUpEmail">Nick:</label>
      <input
          type="text"
          id="signUpNick"
          placeholder="type your nick here .."
          autocomplete="email"
          v-model="user.nick">
    </div>
    <div class="form-group">
      <label for="signUpEmail">Email address:</label>
      <input
          type="email"
          id="signUpEmail"
          placeholder="type your email here .."
          autocomplete="email"
          v-model="user.email">
    </div>
    <div class="form-group">
      <label for="signUpPassword">Password:</label>
      <input
          :type="password"
          id="signUpPassword"
          placeholder="type your password here .."
          autocomplete="password"
          v-model="user.password">
      <div class="password-action">
        <p v-if="passwordShown" @click="passwordShown = false" :class="{active: password}">hide password</p>
        <p v-else @click="passwordShown = true">show password</p>
      </div>
    </div>

    <button class="">sign-up</button>
  </form>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import IUser from "@/interfaces/IUser";

@Options({name: 'register-component'})
export default class RegisterComponent extends Vue {
  passwordShown: boolean = false
  user: IUser = {
    email: '',
    password: '',
    nick: ''
  }

  get password() {
    return this.passwordShown ? 'text' : 'password'
  }

  async signUp() {
    console.log('registered')
  }
}
</script>

<style scoped>

</style>