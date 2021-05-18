<template>
  <section class="user-avatar">
    <img src="@/assets/blank_avatar.png" alt="avatar image">
  </section>

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

    <button class="">sign-in</button>
  </form>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import IUser from "@/interfaces/IUser"

@Options({name: 'auth-banner'})
export default class AuthBanner extends Vue {
  passwordShown: boolean = false
  user: IUser = {
    email: '',
    password: ''
  }

  get password(): string {
    return this.passwordShown ? 'text' : 'password'
  }

  async signIn() {
    console.log('Hello')
  }
}
</script>

<style scoped>
  .user-avatar img {
    width: 8rem;
    margin-bottom: 20px;
  }

  .form-group {
    margin: 10px 0;
  }

  .form-group label {
    display: none;
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

  .form-group input:focus {

  }
</style>