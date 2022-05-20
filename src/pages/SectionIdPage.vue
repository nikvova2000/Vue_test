<template>
  <div>
    <h1>Это страница секции: {{ section.title }} </h1>
  </div>

    <div>
     <div class="student">
        <div class="app__btns">
          <my-button  @click="showDialog">Редактировать запись</my-button>
          <my-button  @click="showDialogSec(section.id)">Добавить студента</my-button>
        </div>
  <my-dialog v-model:show="dialogVisible">
    <edit-section-form @create="editSection" />
  </my-dialog>

  <my-dialog v-model:show="dialogVisibleSec">
    <add-student-form @create="addStudent(student)" />
  </my-dialog>
  <div>
       <h2>Описание секции: </h2> 
    <p>{{ section.description }}</p>
     </div>
    
    <h2>Студенты: </h2> 
    <div class="student">
	    <div v-for="student in students" :key="student" track-by="id" v-on:click.prevent="onEdit">
        <div v-for="sm in studentsname" :key="sm" track-by="id">
			    <p v-if="student.id_student == sm.id">
				    <my-button @click="$router.push(`/students/${ sm.id }`)" >{{ sm.name }}: Дата поступления: {{ student.data}}</my-button>
            <my-button v-on:click.prevent.stop="deleteEvent(student.id)">Удалить</my-button>
			    </p>
		  </div>
  	</div>
  </div>
  </div>
  </div>
</template>

<script>
  import EditSectionForm from "@/comp/EditSectionForm";
  import AddStudentForm from "@/comp/AddStudentForm"
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
      EditSectionForm,
      AddStudentForm
    },

    data() {
      return {
        student: [],
        students: [],
        sections: [],
        section: [],
        sectionsname: [],
        studentsname: [],
        dialogVisible: false,
        dialogVisibleSec: false,
        editing: false,
      }
    },
    async created() {
      try {
        const resp = await axios.get(`http://localhost:3000/students`);
        this.studentsname = [...this.studentsname, ...resp.data];
      } catch (error) {
          console.log(error);
      }

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
    addStudent(student) {
      this.student.id = Date.now();
      this.$emit('create', this.student)
      this.student = {
        data: this.student.data,
        id_section:  this.section.id_section,
        id_student: this.section.id_student
      };
      console.log("addSection", student, " -- ", this.student);
      this.$router.go(student);
      this.dialogVisibleSec = false;
    },
    showDialog(section) {
	    console.log("showDialog", section, " -- ", this.section);
      this.dialogVisible = true;
    },
    showDialogSec(id) {
      this.student.id_section = id;
      this.$emit('create', this.student);
      this.student = {
        id_student: '',
      }
	    console.log("showDialogSec", id, " -- ", this.section.id);
      this.dialogVisibleSec = true;
    },
    editSection(section) {
      console.log("editSection", this.$route.params.id, " -- ", this.section);
      this.dialogVisible = false;
      this.$router.go(section);
    },
  }
}
</script>

<style scoped>

</style>
