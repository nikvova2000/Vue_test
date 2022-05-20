import axios from "axios";

export const StudentModule = {
    state: () => ({
        students: [],
        isStudentsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 5,
        totalPages: 0,
        sortOptions: [
            { value: 'name', name: 'По названию' },
            { value: 'data', name: 'По дате рождения' },
        ]
    }),
    getters: {
        sortedStudents(state) {
            return [...state.students].sort((student1, student2) => student1[state.selectedSort]?.localeCompare(student2[state.selectedSort]))
        },
        sortedAndSearchedStudents(state, getters) {
            return getters.sortedStudents.filter(student => student.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setStudents(state, students) {
            state.students = students;
        },
        setLoading(state, bool) {
            state.isStudentsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchStudents({ state, commit }) {
            try {
                commit('setLoading', true);
                const response = await axios.get('http://localhost:3000/students', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                console.log("fetchStudents", state.page, state.limit)
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setStudents', response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMoreStudents({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('http://localhost:3000/students', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                console.log("loadMoreStudents", state.page, state.limit)
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setStudents', [...state.students, ...response.data]);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}