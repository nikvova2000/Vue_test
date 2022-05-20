import { ref, computed } from 'vue'

export default function useSortedSections(sections) {
    const selectedSort = ref('')
    const sortedSections = computed(() => {
        return [...sections.value].sort((section1, section2) => section1[selectedSort.value]?.localeCompare(section2[selectedSort.value]))
    })

    return {
        selectedSort, sortedSections
    }
};