import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import SurveyViewVue from "@/views/survey/SurveyView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: MainViewVue
        },
        {
            path: "/survey",
            component: SurveyViewVue
        }
    ],
});

export default router;
