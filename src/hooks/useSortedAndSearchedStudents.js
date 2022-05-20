import { ref, computed } from 'vue'

export default function useSortedStudents(sortedStudents) {
    const searchQuery = ref('')

    const sortedAndSearchedStudents = computed(() => {
        return sortedStudents.value.filter(student => student.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery,
        sortedAndSearchedStudents
    }
};