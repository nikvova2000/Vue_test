<template>
  <select class="select__all" v-model="modelValue" @change="changeOption">
    <option disabled value="">Сортировать по:</option>
    <option v-for="option in options" :key="option.value" :value="option.value" >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
  select.select__all {
    border: 1px solid #008080;
    padding: 11px;
  }
</style>
