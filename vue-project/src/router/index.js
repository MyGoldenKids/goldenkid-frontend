import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import SurveyViewVue from "@/views/survey/SurveyView.vue";
import ArticleListView from "@/views/article/ArticleListView.vue";
import ArticleDetailView from "@/views/article/ArticleDetailView.vue";
import DiaryHomeView from "@/views/diary/DiaryHomeView.vue";
import ArticleWriteView from "@/views/article/ArticleWriteView.vue";
import SignupView from "@/views/member/MemberSignupView.vue";
import LoginView from "@/views/member/MemberLoginView.vue";
import MyPageView from "@/views/member/MemberMyPageView.vue"
import DiaryListView from "@/views/diary/DiaryListView.vue";
import DiaryWriteView from "@/views/diary/DiaryWriteView.vue";

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
                {
                    path: "list",
                    component: DiaryListView,
                },
                {
                    path: "write",
                    component: DiaryWriteView,
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
                {
                    path: "mypage",
                    component: MyPageView
                }
            ],
        },
    ],
});

export default router;
