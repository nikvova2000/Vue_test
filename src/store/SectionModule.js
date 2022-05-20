import axios from "axios";

export const SectionModule = {
    state: () => ({
        sections: [],
        isSectionsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalSections: 0,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'description', name: 'По содержимому'},
        ]
    }),
    getters: {
        sortedSections(state) {
            return [...state.sections].sort((section1, section2) => section1[state.selectedSort]?.localeCompare(section2[state.selectedSort]))
        },
        sortedAndSearchedSections(state, getters) {
            return getters.sortedSections.filter(section => section.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setSections(state, sections) {
            state.sections = sections;
        },
        setLoading(state, bool) {
            state.isSectionsLoading = bool
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
        async fetchSections({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('http://localhost:3000/sections', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setSections', response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMoreSections({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('http://localhost:3000/sections', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setSections', [...state.sections, ...response.data]);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}
