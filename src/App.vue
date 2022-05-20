<template>
  <navbar></navbar>
  <div class="main">
    <router-view></router-view>
  </div>
<StudentIdPage :student='student' />
</template>

<script>
import Navbar from "@/comp/Navbar";
export default {
  components: {
    Navbar
  }
  
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main {
  padding: 20px;
  width: 1280px;
  margin: 10px auto;
}

</style>
