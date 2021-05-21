<template>
  <section class="heading_card">
    <h3 class="card_header">Forgotten password</h3>
    <i class="heading_card-icon">&times;</i>
  </section>

  <label for="forgottenPass">Password:</label>
  <input
      :type="password"
      id="forgottenPass"
      placeholder="type your password here .."
      autocomplete="password"
      v-model="user.password">
  <label for="forgottenPassConfirm">Confirm password:</label>
  <input
      :type="password"
      id="forgottenPassConfirm"
      placeholder="type your password here .."
      autocomplete="password"
      v-model="password_confirm">
  <div class="password-action">
    <p v-if="passwordShown" @click="passwordShown = false" :class="{active: password}">hide password</p>
    <p v-else @click="passwordShown = true">show password</p>
  </div>

  <Button name="send email link" button-type="submit" />
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import IUser from "../interfaces/IUser";
import Button from "@/components/atoms/Button.vue";

@Options({name: 'forgot-component',
  components: {Button}
})
export default class RegisterComponent extends Vue {
  passwordShown: boolean = false
  password_confirm: string = ''
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