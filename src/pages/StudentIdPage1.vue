<template>
  <div>
    <h1>Это страница студента {{ student.name }} с ID = {{ $route.params.id }} = {{ student.id }}</h1>
  </div> 
  <div>
    <h2>Дата рождения: {{ student.data }}</h2> 
    <h2>Email: {{ student.email}}</h2> 
    <h2>Телефон: {{ student.phone }}</h2> 
    <div v-if="student.file === true">
	<v-img :src="student.avatar" max-width="250"></v-img>
    </div>
  </div>
	<div class="section">
	<div v-for="section in sections"> 
		<div v-if="sectionsname[section.id-1].title">{{ sectionsname[section.id-1].title }}</div>
	<my-button v-on:click.prevent.stop="onRemove(section)">Удалить</my-button>
	</div>
	</div>
</template>

<script>
import StudentForm from "@/comp/StudentForm";
import MyButton from "@/comp/UI/MyButton";
import axios from 'axios';
import MySelect from "@/comp/UI/MySelect";
import MyInput from "@/comp/UI/MyInput";
import { loadFonts } from '@/plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
loadFonts()
export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    StudentForm
  },
  data() {
    return {
      student: [],
      sections: [],
      sectionsname: [],
      dialogVisible: false,
    }
  },

  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/students/${this.$route.params.id}`);
      this.student = res.data;
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(`http://localhost:3000/section_student?id_student=${this.$route.params.id}`);
        this.sections = [...this.sections, ...response.data];
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(`http://localhost:3000/sections`);
        this.sectionsname = [...this.sectionsname, ...response.data];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async loadMoreSectionST() {
    	try {
     	   const response = await axios.get(`http://localhost:3000/section_student?id_student=${this.$route.params.id}`);
           this.sections = [...this.sections, ...response.data];
    	} catch (error) {
     	 console.log(error);
    	}
    },
    createStudent(section) {
    this.students.push(student);
     this.dialogVisible = false;
    },
    onRemove (section) {
      this.$emit('remove', section)
    },
    rmSection: function (idsection) {
      this.sections = this.sections.filter(p => p.id !== section.idsection)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },

}
</script>

<style scoped>

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
  height: 30px;
  background: green;
}
</style>

