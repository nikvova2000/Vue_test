<template>
  <form @submit.prevent>
    <h4>Новая секция</h4>
    <my-input v-focus v-model="section.title" type="text" placeholder="Название" />
    <my-input v-model="section.description" type="text" placeholder="Описание" />
    <my-button style="align-self: flex-end; margin-top: 15px" @click="createSection" >Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      section: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    createSection() {
      this.section.id = Date.now();
      this.$emit('create', this.section)
      this.section = {
        title: '',
        description: ''
      }
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>
