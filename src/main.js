import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'
import components from '@/comp/UI';
import router from "@/router/router";
import directives from '@/directives';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import store from '@/store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts()
const app = createApp(App)
components.forEach(component => { app.component(component.name, component) })
directives.forEach(directive => { app.directive(directive.name, directive) })

app
    .use(router)
    .use(vuetify)
    .use(VCalendar, {})
    .use(store)
    .use(BootstrapVue3)
    .mount('#app');