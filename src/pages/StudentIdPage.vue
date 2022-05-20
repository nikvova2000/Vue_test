<template>
  <div>
    <h1>Страница студента {{ student.name }}</h1>
  </div>
  <div class="student">
  <div class="app__btns">
    <my-button  @click="showDialog">Редактировать запись</my-button>
    <my-button  @click="showDialogSec(student.id)">Добавить секцию</my-button>
  </div>
  
  <my-dialog v-model:show="dialogVisible">
    <edit-student-form @create="editStudent" />
  </my-dialog>

  <my-dialog v-model:show="dialogVisibleSec">
    <add-section-form @create="addSection(section)" />
  </my-dialog>
  <div>
    <div v-if="student.file === true">
	    <v-img :src="student.avatar" max-width="250"></v-img>
    </div>
    <h2>ФИО: {{ student.name }}</h2>
    <h2>Дата рождения: {{ student.data }}</h2> 
    <h2>Email: {{ student.email}}</h2> 
    <h2>Телефон: {{ student.phone }}</h2> 
  </div>
  <br>
  </div>
    <h2>Секции студента:</h2>
  
  <div class="section">
	  <div v-for="section in sections" :key="section" track-by="id" v-on:click.prevent="onEdit">
		  <div v-for="sm in sectionsname" :key="sm" track-by="id">
			  <p v-if="section.id_section === sm.id">
				  <my-button @click="$router.push(`/sections/${ sm.id }`)" >{{ sm.title }}: Дата поступления: {{ section.data}}</my-button>
			  </p>
		  </div>
	    <a href="#" v-on:click.prevent.stop="deleteEvent(section.id)">Удалить</a>
  	</div>
  </div>
</template>

<script>
  import EditStudentForm from "@/comp/EditStudentForm";
  import AddSectionForm from "@/comp/AddSectionForm"
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
      EditStudentForm,
      AddSectionForm
    },
  data() {
    return {
      student: [],
      sections: [],
      section: [],
      sectionsname: [],
      dialogVisible: false,
      dialogVisibleSec: false,
      editing: false,
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
      const resp = await axios.get(`http://localhost:3000/sections`);
      this.sectionsname = [...this.sectionsname, ...resp.data];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    deleteEvent: function(sectionid) {
	    let proceed = confirm("Вы точно хотите удалить?");
	    if (proceed) {
		    const index = this.sections.findIndex((p) => p.id === sectionid)
		    this.sections.splice(index, 1)
        console.log("index delete event", sectionid)
        axios.delete(`http://localhost:3000/section_student/${sectionid}`)
          .then((response) => {
            console.log(response)
          }, (error) => {
            console.log(error)
          })
        this.$router.go(sectionid);
	    }
    },
    editStudent(student) {
      console.log("editStudent", this.$route.params.id, " -- ", this.student);
      this.dialogVisible = false;
      this.$router.go(student);
    },
    addSection(section) {
      this.section.id = Date.now();
      this.$emit('create', this.section)
      this.section = {
        data: this.section.data,
        id_section:  this.section.id_section,
        id_student: this.section.id_student
      };
      console.log("addSection", section, " -- ", this.section);
      this.$router.go(section);
      this.dialogVisibleSec = false;
    },
    onRemove (section) {
      this.$emit('remove', section)
    },
    rmSection: function (idsection) {
      this.sections = this.sections.filter(p => p.id !== section.idsection)
    },
    showDialog(student) {
	    console.log("showDialog", student, " -- ", this.student);
      this.dialogVisible = true;
    },
    showDialogSec(id) {
      this.section.id_student = id;
      this.$emit('create', this.section);
      this.section = {
        id_section: '',
      }
	    console.log("showDialogSec", id, " -- ", this.student.id);
      this.dialogVisibleSec = true;
    },
  },

}
</script>

<style scoped>

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

.main {
    padding: 20px;
    width: 1280px;
    margin: 10px auto;
} 
.v-responsive.v-img {
    width: 100%;
    float: right;
}
.app__btns.left {
    float: left;
    display: contents;
}
</style>

