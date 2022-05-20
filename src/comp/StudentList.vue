<template>
  <div v-if="students.length > 0">
    <h3>Список студентов</h3>
    <transition-group name="user-list">
      <student-item v-for="student in students" :student="student" :key="student.id" @remove="$emit('remove', student)"/>
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    Список студентов пуст
  </h2>
</template>

<script>
import StudentItem from "@/comp/StudentItem";
export default {
  components: {StudentItem},
  props: {
    students: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.user-list-move {
  transition: transform 0.4s ease;
}
</style>
