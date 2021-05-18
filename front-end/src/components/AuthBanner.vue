<template>
  <section class="user-avatar">
    <img src="@/assets/blank_avatar.png" alt="avatar image">
  </section>
  <div v-if="isLogin">
    <LoginComponent/>
  </div>
  <div v-else>
    <RegisterComponent/>
  </div>
  <div v-if="forgottenPass">
    <ForgotComponent/>
  </div>
  <div class="account-action">
    <div class="has-account">
      <a v-if="isLogin" @click="isLogin = false">Don't have account yet?</a>
      <a v-else @click="isLogin = true">Already have account</a>
    </div>
    <a v-if="isLogin" @click="forgottenPass = true">Forgot your password?</a>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import LoginComponent from './LoginComponent.vue'
import RegisterComponent from "@/components/RegisterComponent.vue";
import ForgotComponent from "@/components/ForgotPassword.vue";

@Options({
  name: 'auth-banner',
  components: {
    ForgotComponent,
    RegisterComponent,
    LoginComponent
  }
})
export default class AuthBanner extends Vue {
  isLogin: boolean = true
  forgottenPass: boolean = false
}
</script>

<style scoped>
  .account-action {
    margin-top: 20px;
  }

  .account-action a {
    line-height: 1.66;
    font-family: Poppins, sans-serif;
    font-weight: 600;
    color: rgba(145, 145, 250, 0.7);
    font-size: 15px;
    cursor: pointer;
  }
</style>