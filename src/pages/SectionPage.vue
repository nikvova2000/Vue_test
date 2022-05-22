<template>
  <div>
    <h1>Секции</h1>
    <my-input v-model="searchQuery" placeholder="Поиск...." v-focus />

    <div class="app__btns">
      <my-button @click="showDialog">Создать секцию</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <section-form @create="createSection"/>
    </my-dialog>

    <section-list :sections="sortedAndSearchedSections" @remove="removeSection" v-if="!isSectionsLoading" />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMoreSections" class="observer"></div>
  </div>
</template>

<script>
import SectionForm from "@/comp/SectionForm";
import SectionList from "@/comp/SectionList";
import MyButton from "@/comp/UI/MyButton";
import axios from 'axios';
import MySelect from "@/comp/UI/MySelect";
import MyInput from "@/comp/UI/MyInput";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    SectionList, 
    SectionForm
  },
  data() {
    return {
      sections: [],
      dialogVisible: false,
      isSectionsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'description', name: 'По описанию'},
      ]
    }
  },
  methods: {
    createSection(section) {
      this.sections.push(section);
      console.log("Create section", section);
      if (section.title == ''){
         alert("Поле Название не заполнено");
      }
      if (section.description == ''){
         alert("Описание не заполнено");
      }
      axios.post(`http://localhost:3000/sections`, {
        title:  section.title,
        description: section.description
      });
      this.$router.go(section);
      this.dialogVisible = false;
    },
    removeSection(section) {
      this.sections = this.sections.filter(p => p.id !== section.id)
      console.log("Remove section", section);
      axios.delete(`http://localhost:3000/sections/${section.id}`)
        .then((response) => {
          console.log(response)
        }, (error) => {
          console.log(error)
        })
        // this.$router.go(section);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchSections() {
      try {
        this.isSectionsLoading = true;
        const response = await axios.get('http://localhost:3000/sections', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.sections = response.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isSectionsLoading = false;
      }
    },
    async loadMoreSections() {
      try {
        this.page += 1;
        const response = await axios.get('http://localhost:3000/sections', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.sections = [...this.sections, ...response.data];
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchSections();
  },
  computed: {
    sortedSections() {
      return [...this.sections].sort((section1, section2) => section1[this.selectedSort]?.localeCompare(section2[this.selectedSort]))
    },
    sortedAndSearchedSections() {
      return this.sortedSections.filter(section => section.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
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
