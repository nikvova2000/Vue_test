<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ section.title }}</div>
      <div><strong>Описание:</strong> {{ section.description }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/sections/${section.id}`)" >Открыть</my-button>
      <my-button @click="$emit('remove', section)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>
