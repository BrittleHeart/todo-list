<template>
  <label :for="element">{{ elementContent }}</label>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "Label",
  props: {
    element: {
      type: String,
      required: true
    },
    elementContent: {
      type: String,
      required: true
    }
  }
})

</script>

<style scoped>
  label {
    display: block;
    text-align: left;
    font-family: Poppins, sans-serif;
  }
</style>