import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import ArticleView from "@/views/ArticleView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: MainViewVue,
        },
        {
            path: "/article",
            children: [
                {
                    path: "list",
                    component: ArticleView,
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
