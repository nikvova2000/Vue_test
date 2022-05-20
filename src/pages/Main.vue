<template>
  <div class="navbar__btns">
      <my-button @click="$router.push('/students')">Студенты с подгрузкой</my-button>
      <my-button @click="$router.push('/sections')">Секции с подгрузкой</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/stud')">Студенты ВСЕ</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/sec')">Секции ВСЕ</my-button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
