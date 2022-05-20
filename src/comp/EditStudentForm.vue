<template>
  <form @submit.prevent>
    <h4>Редактирование записи: {{ student.name }} </h4>
    <my-input v-focus v-model="student.name" type="text" placeholder="ФИО" />
    <my-input v-model="student.email" type="text" placeholder="E-mail" />
    <my-input v-model="student.phone" type="text" placeholder="Телефон" />
    <div class="data">Дата рождения:</div>
    <v-date-picker class="inline-block h-full" v-model="student.data" type="data"  color="blue" :attributes='attrs' :from-date="new Date(1967, 6, 22)" :model-config="modelConfig" :masks="masks" >
      <template v-slot="{ inputValue, inputEvents }">
	      <div class="flex items-center">
    	    <input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" />
	      </div>
      </template>
    </v-date-picker>

    <v-checkbox v-model="student.file" hide-details class="shrink mr-2 mt-0" label="Использовать аватар"></v-checkbox>
    <v-text-field v-model="student.avatar" class="files" label="Ссылка на аватар"></v-text-field>
    <my-button style="align-self: flex-end; margin-top: 15px" @click="editStudent" >Записать</my-button>
  </form>
</template>

<script>
  import axios from 'axios';

export default {
  data() {
    return {
      student: [],
	    enabled: false,
	    includeFiles: true,
	    date: '0000-00-00',
      masks: {
        input: 'YYYY-MM-DD',
      },
        modelConfig: {
          type: 'string',
          mask: 'YYYY-MM-DD', 
        },
        attrs: [
          {
            highlight: true,
            dates: new Date(), 
          },
        ],
      }
    },
    async created() {
      try {
        const res = await axios.get(`http://localhost:3000/students/${this.$route.params.id}`);
        this.student = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  methods: {
    createStudent() {
      this.$emit("student", student);
	    console.log("STS:", student)
      },
    
    editStudent() {
      axios.put(`http://localhost:3000/students/${this.$route.params.id}`, {
	      id: this.student.id, 
        name: this.student.name,
        data: this.student.data,
	      email: this.student.email,
	      phone: this.student.phone,
	      avatar: this.student.avatar,
	      file: this.student.file
      });
      
      this.student = {
	      id: this.student.id, 
        name: this.student.name,
        data: this.student.data,
	      email: this.student.email,
	      phone: this.student.phone,
	      avatar: this.student.avatar,
	      file: this.student.file
      };
	    this.$emit('create', this.student);
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.border.px-2.py-1.rounded {
    margin: 10px 0px;
    height: 35px;
    width: 100%;
    padding: 0px 12px;
    border: 1px solid teal;
}
.data {
    margin-top: 11px;
}
</style>
