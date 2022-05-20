<template>
  <div class="post">
    <div>
      <div><strong>ФИО:</strong> {{ student.name }}</div>
      <div><strong>Дата рождения:</strong> {{ student.data }}</div>
     <div><strong>E-mail:</strong> {{ student.email }}</div>
     <div><strong>Телефон:</strong> {{ student.phone }}</div>
     <div><strong>Фото:</strong> {{ student.avatar }}</div>
     <div><strong>Показывать фото:</strong>{{ student.file }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/students/${student.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', student)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    student: {
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
