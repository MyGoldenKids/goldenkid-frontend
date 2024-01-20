import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import SurveyViewVue from "@/views/survey/SurveyView.vue";
import ArticleListView from "@/views/ArticleListView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";

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
        },
        {
            path: "/article",
            children: [
                {
                    path: "list",
                    component: ArticleListView,
                },
                {
                    path: "detail",
                    component: ArticleDetailView,
                },
            ],
        },
    ],
});

export default router;
