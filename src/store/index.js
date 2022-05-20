import {createStore} from "vuex";
import {StudentModule} from "@/store/StudentModule";
import {SectionModule} from "@/store/SectionModule";

export default createStore({
    state: {
      isAuth: false,
    },
    modules: {
        student: StudentModule,
        section: SectionModule
    }
})
