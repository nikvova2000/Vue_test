<template>
  <div>
    <h1>Студенты</h1>
    <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск...." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog">Добавить студента</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <student-form @create="createStudent" />
    </my-dialog>
    <student-list :students="sortedAndSearchedStudents" @remove="removeStudent" v-if="!isStudentsLoading"/>
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMoreStudents" class="observer"></div>
  </div>
</template>

<script>
import StudentForm from "@/comp/StudentForm";
import StudentList from "@/comp/StudentList";
import MyButton from "@/comp/UI/MyButton";
import axios from 'axios';
import MySelect from "@/comp/UI/MySelect";
import MyInput from "@/comp/UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    StudentList, StudentForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'student/setPage',
      setSearchQuery: 'student/setSearchQuery',
      setSelectedSort: 'student/setSelectedSort',
    }),
    ...mapActions({
      loadMoreStudents: 'student/loadMoreStudents',
      fetchStudents: 'student/fetchStudents'
    }),
    createStudent(student) {
      this.students.push(student);
      this.dialogVisible = false;
    },
    removeStudent(student) {
      this.students = this.students.filter(p => p.id !== student.id)
    },
    changePage(pageNumber) {
      console.log("pageNumber", pageNumber)
      this.page = pageNumber
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchStudents();
  },
  computed: {
    ...mapState({
      students: state => state.student.students,
      isStudentsLoading: state => state.student.isStudentsLoading,
      selectedSort: state => state.student.selectedSort,
      searchQuery: state => state.student.searchQuery,
      page: state => state.student.page,
      limit: state => state.student.limit,
      totalPages: state => state.student.totalPages,
      sortOptions: state => state.student.sortOptions
    }),
    ...mapGetters({
      sortedStudents: 'student/sortedStudents',
      sortedAndSearchedStudents: 'student/sortedAndSearchedStudents'
    })
  },
  // watch: {
  //   page() {
  //      this.fetchStudents()
  //   }
  // }
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}

.observer {
  height: 0px;
  background: teal;
}
</style>
