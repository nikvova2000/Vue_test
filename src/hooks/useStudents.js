import axios from "axios";
import { ref, onMounted } from 'vue';

export function useStudents(limit) {
    const students = ref([])
    const totalPages = ref(0)
    const isStudentsLoading = ref(true)
    const fetching = async() => {
        try {
            const response = await axios.get('http://localhost:3000/students', {
                params: {
                    _page: 1,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            students.value = response.data;
        } catch (e) {
            alert('Ошибка')
        } finally {
            isStudentsLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        students, isStudentsLoading, totalPages
    }
}