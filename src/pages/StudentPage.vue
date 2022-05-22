<template>
  <div>
    <h1>Студенты</h1>
    <my-input v-model="searchQuery" placeholder="Поиск...." v-focus />
    <div class="app__btns">
      <my-button  @click="showDialog">Добавить студента</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <student-form  @create="createStudent" />
    </my-dialog>
    <student-list :students="sortedAndSearchedStudents" @remove="removeStudent" v-if="!isStudentsLoading" />
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
import MyInputEmail from "@/comp/UI/MyInputEmail";
export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyInputEmail,
    StudentList, 
    StudentForm
  },
  data() {
    return {
      students: [],
      dialogVisible: false,
      isStudentsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'name', name: 'По имени'},
        {value: 'data', name: 'По дате рождения'},
      ]
    }
  },
  methods: {
    createStudent(student) {
      // this.students.push(student);
      console.log("Create student", student);
      if (student.avatar == ''){
         student.avatar = 'https://oir.mobi/uploads/posts/2020-01/1579279411_11-15.jpg'
      } 
      if (student.file == ''){
         student.file = false
      } 
      if (student.name == ''){
         alert("Поле ФИО не заполнено");
         errorform = 1;
      } else if (student.email == ''){
          alert("Поле E-mail не заполнено");
          errorform = 1;
      } else if (!this.validEmail(student.email)) {
          alert("Укажите корректный адрес электронной почты.");
          erroform = 1;
      } else if (student.phone == ''){
         student.phone = 'Нет телефона'
         errorform = 1;
      }  else {
        axios.post(`http://localhost:3000/students`, {
          name:  student.name,
          data: student.data,
          email: student.email,
          phone: student.phone,
          file: student.file,
          avatar: student.avatar
        });
        this.$router.go(student);
        this.dialogVisible = false;
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    removeStudent(student) {
      let proceed = confirm("Вы точно хотите удалить?");
	    if (proceed) {
		    this.students = this.students.filter(p => p.id !== student.id)
        console.log("Remove student", student);
        axios.delete(`http://localhost:3000/students/${student.id}`)
          .then((response) => {
            console.log(response)
          }, (error) => {
            console.log(error)
          })
	    }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchStudents() {
      try {
        this.isStudentsLoading = true;
        const response = await axios.get('http://localhost:3000/students', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.students = response.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isStudentsLoading = false;
      }
    },
    async loadMoreStudents() {
      try {
        this.page += 1;
        const response = await axios.get('http://localhost:3000/students', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.students = [...this.students, ...response.data];
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchStudents();
  },
  computed: {
    sortedStudents() {
      return [...this.students].sort((student1, student2) => student1[this.selectedSort]?.localeCompare(student2[this.selectedSort]))
    },
    sortedAndSearchedStudents() {
      return this.sortedStudents.filter(student => student.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: end;
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
