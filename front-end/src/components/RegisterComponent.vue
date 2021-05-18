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

    <Button name="register account" />
  </form>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import IUser from "@/interfaces/IUser";
import Button from "@/components/Button.vue";
import axios, {AxiosResponse} from 'axios'

@Options({name: 'register-component',
  components: {Button}
})
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
    const response: AxiosResponse<any> = await axios.post('http://localhost:3500/api/v1/auth/register', {
      nick: this.user.nick,
      email: this.user.email,
      password: this.user.password
    })

    const {status} = response
    if(status === 400 || status === 500)
      throw new Error('Account could not be created')

    console.log('Account created')
  }
}
</script>

<style scoped>

</style>