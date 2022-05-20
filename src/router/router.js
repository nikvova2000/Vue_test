import Main from "@/pages/Main";
import { createRouter, createWebHistory } from "vue-router";
import SectionPage from "@/pages/SectionPage";
import StudentPage from "@/pages/StudentPage";
import SectionIdPage from "@/pages/SectionIdPage";
import SectionPageWithStore from "@/pages/SectionPageWithStore";
import StudentIdPage from "@/pages/StudentIdPage";
import StudentPageWithStore from "@/pages/StudentPageWithStore";


const routes = [{
        path: '/',
        component: Main
    },
    {
        path: '/stud',
        component: StudentPage
    },
    {
        path: '/sec',
        component: SectionPage
    },
    {
        path: '/students/:id',
        component: StudentIdPage
    },
    {
        path: '/students',
        component: StudentPageWithStore
    },
    {
        path: '/sections/:id',
        component: SectionIdPage
    },
    {
        path: '/sections',
        component: SectionPageWithStore
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;