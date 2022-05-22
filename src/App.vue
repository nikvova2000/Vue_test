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
  background: #f5f6fc;
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .7);
  -moz-box-shadow: 0 0 6px rgba(0, 0, 0, .7);
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, .7);
  position: relative;
  padding: 28px 43px 23px 47px;
  color: #000;
}
@import url('@/css/style.css');
@import url('@/css/mystyle.css');
@import url('@/css/font-awesome.min.css');
@import url('@/css/bootstrap.css');
@import url('@/css/bootstrap-theme.css');
</style>
