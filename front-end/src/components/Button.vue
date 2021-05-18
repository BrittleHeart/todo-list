<template>
  <button class="auth-button" type="submit">{{ name }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Button',
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
  .auth-button {
    background: rgba(145, 145, 250, 0.7) none;
    border: 1px solid rgb(140, 140, 250);
    border-radius: 3px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: black;
    padding: 7px 10px;
    box-shadow: 2px 2px 2px 0 rgb(120, 120, 120);
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
  }

  .auth-button:hover {
    box-shadow: 4px 4px 2px 0 rgb(120, 120, 120);
  }
</style>