<template>
  <button
      :class="{
        'primary-button': buttonClassType === 'primary',
        'secondary-button': buttonClassType === 'secondary'
      }"
      :type="buttonType">
    {{ name }}
  </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Button',
  props: {
    name: {
      type: String,
      required: true
    },
    buttonClassType: {
      type: String,
      required: false,
      default: () => 'primary'
    },
    buttonType: {
      type: String,
      required: true,
      default: () => 'submit'
    }
  }
})
</script>

<style scoped>
.primary-button {
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

.primary-button:hover {
  box-shadow: 4px 4px 2px 0 rgb(120, 120, 120);
}
</style>