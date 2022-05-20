<template>
  <div>
    <h1>Секции</h1>
    <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск...." v-focus/>
    <div class="app__btns">
      <my-button @click="showDialog">Добавить секцию</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <section-form @create="createSection"/>
    </my-dialog>
    <section-list :sections="sortedAndSearchedSections" @remove="removeSection" v-if="!isSectionsLoading"/>
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMoreSections" class="observer"></div>
    <div class="page__wrapper">
      <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{'current-page': page === pageNumber}" @click="changePage(pageNumber)">
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import SectionForm from "@/comp/SectionForm";
import SectionList from "@/comp/SectionList";
import MyButton from "@/comp/UI/MyButton";
import axios from 'axios';
import MySelect from "@/comp/UI/MySelect";
import MyInput from "@/comp/UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    SectionList, SectionForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'section/setPage',
      setSearchQuery: 'section/setSearchQuery',
      setSelectedSort: 'section/setSelectedSort',
    }),
    ...mapActions({
      loadMoreSections: 'section/loadMoreSections',
      fetchSections: 'section/fetchSections'
    }),
    createSection(section) {
      this.sections.push(section);
      this.dialogVisible = false;
    },
    removeSection(section) {
      this.sections = this.sections.filter(p => p.id !== section.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchSections();
  },
  computed: {
    ...mapState({
      section: state => state.section.sections,
      isSectionsLoading: state => state.section.isSectionsLoading,
      selectedSort: state => state.section.selectedSort,
      searchQuery: state => state.section.searchQuery,
      page: state => state.section.page,
      limit: state => state.section.limit,
      totalPages: state => state.section.totalPages,
      sortOptions: state => state.section.sortOptions
    }),
    ...mapGetters({
      sortedSections: 'section/sortedSections',
      sortedAndSearchedSections: 'section/sortedAndSearchedSections'
    })
  },
}
</script>

<style>

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
  height: 0px;
  background: teal;
}
</style>
