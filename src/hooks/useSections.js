import axios from "axios";
import {ref, onMounted} from 'vue';

export function useSections(limit) {
    const sections = ref([])
    const totalPages = ref(0)
    const isSectionsLoading = ref(true)
    const fetching = async () => {
        try {
            const response = await axios.get('http://localhost:3000/sections', {
                params: {
                    _page: 1,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            sections.value = response.data;
        } catch (e) {
            alert('Ошибка')
        } finally {
            isSectionsLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        sections, isSectionsLoading, totalPages
    }
}
