<template>
  <form @submit.prevent="signIn">
    <div class="form-group">
      <label for="signInEmail">Email address:</label>
      <input
          type="email"
          id="signInEmail"
          placeholder="type your email here .."
          autocomplete="email"
          v-model="user.email">
    </div>
    <div class="form-group">
      <label for="signInPassword">Password:</label>
      <input
          :type="password"
          id="signInPassword"
          placeholder="type your password here .."
          autocomplete="password"
          v-model="user.password">
      <div class="password-action">
        <p v-if="passwordShown" @click="passwordShown = false" :class="{active: password}">hide password</p>
        <p v-else @click="passwordShown = true">show password</p>
      </div>
    </div>

    <Button name="authenticate"/>
  </form>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import IUser from '../interfaces/IUser'
import Button from "@/components/Button.vue";

@Options({name: 'login-component',
  components: {Button}
})
export default class LoginComponent extends Vue {
  passwordShown: boolean = false
  user: IUser = {
    email: '',
    password: '',
    nick: ''
  }

  get password() {
    return this.passwordShown ? 'text' : 'password'
  }

  async signIn() {
    console.log('Hello')
  }
}
</script>