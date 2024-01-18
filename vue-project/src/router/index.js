import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import ArticleView from "@/views/ArticleView.vue";

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
            ],
        },
    ],
});

export default router;
