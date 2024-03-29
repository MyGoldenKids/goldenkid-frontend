import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import  VueAwesomePaginate  from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import router from "./router";
import { instance } from "@/api/axios";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);
app.use(VCalendar);
app.use(VueAwesomePaginate);
app.provide("axios", instance);

app.mount("#app");
