<template>
  <div v-if="sections.length > 0">
    <h3>Список секций</h3>
    <transition-group name="user-list">
      <section-item v-for="section in sections" :section="section" :key="section.id" @remove="$emit('remove', section)" />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    Список секций пуст
  </h2>
</template>

<script>
import SectionItem from "@/comp/SectionItem";
export default {
  components: {SectionItem},
  props: {
    sections: {
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
