import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import SurveyViewVue from "@/views/survey/SurveyView.vue";
import ArticleListView from "@/views/ArticleListView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";
import DiaryHomeView from "@/views/diary/DiaryHomeView.vue";
import ArticleWriteView from "@/views/ArticleWriteView.vue";
import SignupView from "@/views/member/MemberSignupView.vue";
import LoginView from "@/views/member/MemberLoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "Main",
            path: "/",
            component: MainViewVue,
        },
        {
            path: "/survey",
            component: SurveyViewVue,
        },
        {
            path: "/article",
            children: [
                {
                    path: "list",
                    component: ArticleListView,
                },
                {
                    path: "detail/:id",
                    component: ArticleDetailView,
                },
                {
                    path: "write",
                    component: ArticleWriteView,
                },
            ],
        },
        {
            path: "/diary",
            children: [
                {
                    path: "home",
                    component: DiaryHomeView,
                },
            ],
        },
        {
            path: "/member",
            children: [
                {
                    path: "signup",
                    component: SignupView,
                },
                {
                    path: "login",
                    component: LoginView,
                },
            ],
        },
    ],
});

export default router;
