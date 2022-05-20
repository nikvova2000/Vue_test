<template>
  <form @submit.prevent>
    <h4>Редактирование записи: {{ section.title}} </h4>
    <my-input v-focus v-model="section.title" type="text" placeholder="Название" />
    <my-input v-focus v-model="section.description" type="text" placeholder="Описание" />
    <my-button style="align-self: flex-end; margin-top: 15px" @click="editSection" >Записать</my-button>
  </form>
</template>

<script>
  import axios from 'axios';

export default {
  data() {
    return {
      student: [],
      section: [],
	    enabled: false,
	    includeFiles: true,
      }
    },
    async created() {
      try {
        const res = await axios.get(`http://localhost:3000/sections/${this.$route.params.id}`);
        this.section = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  methods: {
    createSection() {
      this.$emit("section", sectiont);
	    console.log("STS:", section)
      },
    
    editSection() {
      axios.put(`http://localhost:3000/sections/${this.$route.params.id}`, {
	      id: this.section.id, 
        title: this.section.title,
        description: this.section.description
      });

      this.section = {
	      id: this.section.id, 
        title: this.section.title,
        description: this.section.description
      };
	    this.$emit('create', this.section);
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
