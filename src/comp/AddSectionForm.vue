<template>
  <form @submit.prevent>
    <h4>Добавит секцию для студента: {{ student.name }}</h4>
    <select v-model="selected">
      <option disabled value="">Выберите один из вариантов</option>
      <option v-for="section in sectionsname" :key="section" v-bind:value="section.id">{{ section.title }}</option>
    </select>
    <span>Выбрано: {{ selected }}</span>
    <!-- <my-select v-model="sectionsname" :options="sectionsname" /> -->
    <div class="data">Дата поступления:</div>
    <v-date-picker class="inline-block h-full" v-model="section.data" type="data"  color="blue" :attributes='attrs' :from-date="new Date()" :model-config="modelConfig" :masks="masks" >
      <template v-slot="{ inputValue, inputEvents }">
	      <div class="flex items-center">
    	    <input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" />
	      </div>
      </template>
    </v-date-picker>
    <my-button style="align-self: flex-end; margin-top: 15px" @click="addSection" >Создать</my-button>
  </form>
</template>

<script>
import StudentIdPage from "@/pages/StudentIdPage";
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
      sections: [],
      sec: [],
      section: [],
      sectionsname: [],
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
    this.sections.forEach( i =>{
      this.str += "id_ne=" + (i.id_section) + "&";
    })
    try {
      const resp = await axios.get(`http://localhost:3000/sections?${this.str}`);
      this.sectionsname = [...this.sectionsname, ...resp.data];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addSection(section) {
      this.section.id = Date.now();
      this.$emit('create', this.section);
      this.section = {
        data:  this.section.data,
        id_section: this.selected,
        id_student: this.student.id
      };
      axios.post(`http://localhost:3000/section_student`, {
        data:  this.section.data,
        id_section: this.selected,
        id_student: this.$route.params.id
      });
      console.log("addSection-local", section, " -- ", this.section);
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
