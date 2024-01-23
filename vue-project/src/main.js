import { createApp } from "vue";
import { createPinia } from "pinia";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VCalendar);
app.use(axios);

app.mount("#app");
app.config.globalProperties.axios = axios; // axios 전역 설정
