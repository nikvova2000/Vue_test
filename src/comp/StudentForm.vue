<template>
  <form @submit.prevent @submit="checkForm">
    <h4>Добавить студента</h4>
    <p v-if="errors.length">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
    <my-input v-focus v-model="student.name" type="text" placeholder="ФИО" />
    <my-input-email v-model="student.email" type="email" placeholder="E-mail" />
    <my-input v-model="student.phone" type="text" placeholder="Телефон" />
    <div class="data">Дата рождения:</div>
    <v-date-picker class="inline-block h-full" v-model="student.data" type="data"  color="blue" :attributes='attrs' :from-date="new Date(2000, 0, 1)" :model-config="modelConfig" :masks="masks" >
       <template v-slot="{ inputValue, inputEvents }">
	<div class="flex items-center">
    	<input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" />
	</div>
       </template>
    </v-date-picker>

    <v-checkbox v-model="student.file" hide-details class="shrink mr-2 mt-0" label="Использовать аватар"></v-checkbox>
    <v-text-field v-model="student.avatar" class="files" label="Ссылка на аватар"></v-text-field>
    <my-button style="align-self: flex-end; margin-top: 15px" @click="createStudent" >Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
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
          dates: '2000-01-01', 
        },
      ],
      student: {
        name: '',
        data: '2000-01-01',  
	      email: '',
	      phone: '',
	      avatar: '',
        file: ''
      }
    }
  },
  methods: {
    createStudent() {
      this.student.id = Date.now();
      this.$emit('create', this.student)
      this.student = {
        name: '',
        data: '',
	      email: '',
	      phone: '',
	      avatar: ''
      }
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
