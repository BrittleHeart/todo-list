<template>
  <p v-if="error">{{ error }}</p>
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
import Button from "@/components/Button.vue"
import axios, {AxiosResponse} from 'axios'

@Options({name: 'login-component',
  components: {Button}
})
export default class LoginComponent extends Vue {
  passwordShown: boolean = false
  error: string = ''
  user: IUser = {
    email: '',
    password: '',
  }

  get password() {
    return this.passwordShown ? 'text' : 'password'
  }

  async signIn() {
    const response: AxiosResponse<any> = await axios.post('http://localhost:3500/api/v1/auth/login', {
      email: this.user.email,
      password: this.user.password
    })

    const { data } = response

    if (data.status === 401) {
      this.error = 'Unauthorized access'
      return
    }

    console.log(data.token)
  }
}
</script>