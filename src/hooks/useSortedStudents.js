import { ref, computed } from 'vue'

export default function useSortedStudents(students) {
    const selectedSort = ref('')
    const sortedStudents = computed(() => {
        return [...students.value].sort((student1, student2) => student1[selectedSort.value]?.localeCompare(student2[selectedSort.value]))
    })

    return {
        selectedSort, sortedStudents
    }
};