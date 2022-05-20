import {ref, computed} from 'vue'

export default function useSortedSections(sortedSections) {
    const searchQuery = ref('')

    const sortedAndSearchedSections = computed(() => {
        return sortedSections.value.filter(section => section.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery, sortedAndSearchedSections
    }
};
