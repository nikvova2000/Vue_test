<template>
  <input :value="modelValue" @input="updateInput" id="e-mail" class="input" type="email">
</template>

<script>
export default {
  name: 'my-input-email',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

</style>
