<template>
  <div class="navbar  navbar-inverse navbar-fixed-top">
    <button class="name" @click="$router.push('/')">Владимир Никифоров</button>
    <div class="navbar__btns">
      <my-button @click="$router.push('/students')">Студенты с подгрузкой</my-button>
      <my-button @click="$router.push('/sections')">Секции с подгрузкой</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/stud')">Студенты ВСЕ </my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/sec')">Секции ВСЕ </my-button>
     </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
  top: 0px;
  position: fixed;
}
.name {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  border-radius: 10px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
