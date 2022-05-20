<template>
  <form @submit.prevent>
    <h4>Добавит студента в секцию: {{ section.title }}</h4>
    <select v-model="selected">
      <option disabled value="">Выберите один из вариантов</option>
      <option v-for="student in studentsname" :key="student" v-bind:value="student.id">{{ student.name }}</option>
    </select>
    <span>Выбрано: {{ selected }}</span>
    <div class="data">Дата поступления:</div>
    <v-date-picker class="inline-block h-full" v-model="student.data" type="data"  color="blue" :attributes='attrs' :from-date="new Date()" :model-config="modelConfig" :masks="masks" >
      <template v-slot="{ inputValue, inputEvents }">
	      <div class="flex items-center">
    	    <input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" />
	      </div>
      </template>
    </v-date-picker>
    <my-button style="align-self: flex-end; margin-top: 15px" @click="addStudent" >Создать</my-button>
  </form>
</template>

<script>
import SectionIdPage from "@/pages/SectionIdPage";
import MyButton from "@/comp/UI/MyButton";
import axios from 'axios';
import MySelect from "@/comp/UI/MySelect";
import MyInput from "@/comp/UI/MyInput";
import { loadFonts } from '@/plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
loadFonts()

export default {
  data() {
    return {
      selected: '',
      student: [],
      students: [],
      sections: [],
      sec: [],
      section: [],
      studentsname: [],
      SectionsName: '',
      selectedSort: '',
      str: '',
      element: '',
      masks: {
        input: 'YYYY-MM-DD',
      },
      attrs: [
        {
          highlight: true,
          dates: new Date(), 
        },
      ],
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', 
      },
    }
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/sections/${this.$route.params.id}`);
      this.section = res.data;
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(`http://localhost:3000/section_student?id_section=${this.$route.params.id}`);
      this.students = [...this.students, ...response.data];
    } catch (error) {
      console.log(error);
    }
    this.students.forEach( i =>{
      this.str += "id_ne=" + (i.id_student) + "&";
    })
    try {
      const resp = await axios.get(`http://localhost:3000/students?${this.str}`);
      this.studentsname = [...this.studentsname, ...resp.data];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addStudent(student) {
      this.student.id = Date.now();
      this.$emit('create', this.student);
      this.student = {
        data:  this.student.data,
        id_student: this.selected,
        id_section: this.section.id
      };
      axios.post(`http://localhost:3000/section_student`, {
        data:  this.student.data,
        id_student: this.selected,
        id_section: this.$route.params.id
      });
      console.log("addStudent-local", student, " -- ", this.student);
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.data {
    margin-top: 11px;
}
select {
    border: 1px solid #008080;
    padding: 11px;
}
</style>
