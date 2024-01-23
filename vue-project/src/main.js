import { createApp } from "vue";
import { createPinia } from "pinia";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

import App from "./App.vue";
import router from "./router";
import { instance } from "@/api/axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VCalendar);
app.provide("axios", instance);

app.mount("#app");
