import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import SurveyViewVue from "@/views/survey/SurveyView.vue";
import ArticleListView from "@/views/article/ArticleListView.vue";
import ArticleDetailView from "@/views/article/ArticleDetailView.vue";
import DiaryHomeView from "@/views/diary/DiaryHomeView.vue";
import ArticleWriteView from "@/views/article/ArticleWriteView.vue";
import SignupView from "@/views/member/MemberSignupView.vue";
import LoginView from "@/views/member/MemberLoginView.vue";
import MyPageView from "@/views/member/MemberMyPageView.vue";
import DiaryListView from "@/views/diary/DiaryListView.vue";
import DiaryWriteView from "@/views/diary/DiaryWriteView.vue";
import DiaryCreateView from "@/views/diary/DiaryCreateView.vue";
import DiaryUpdateView from "@/views/diary/DiaryUpdateView.vue"
import ErrorView from "@/views/error/ErrorView.vue";
import JiraHomeView from "@/views/jira/JiraHomeView.vue";

const requireLogin = (to, from, next) => {
    if (!sessionStorage.getItem("isLoggedIn")) { // 로그인하지 않은 경우...
        alert("로그인 후 이용가능합니다.");
        next("/member/login"); // 로그인 페이지로 이동
    } else {
        next();
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "NotFound",
            path: "/error",
            component: ErrorView,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/error",
        },
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
                    beforeEnter: requireLogin,
                },
            ],
        },
        {
            path: "/diary",
            children: [
                {
                    name: "diary-home",
                    path: "home",
                    component: DiaryHomeView,
                    beforeEnter: requireLogin,
                },
                {
                    name: "diary-list",
                    path: "list",
                    component: DiaryListView,
                    beforeEnter: requireLogin,
                },
                {
                    name: "diary-create",
                    path: "create",
                    component: DiaryCreateView,
                    beforeEnter: requireLogin,
                },
                {
                    name: "diary-write",
                    path: "write",
                    component: DiaryWriteView,
                    beforeEnter: requireLogin,
                },
                {
                    name: "diary-update",
                    path: "update/:id",
                    component: DiaryUpdateView,
                    beforeEnter: requireLogin,
                }
            ],
        },
        {
            path: "/member",
            children: [
                {
                    name: "signup",
                    path: "signup",
                    component: SignupView,
                },
                {
                    name: "login",
                    path: "login",
                    component: LoginView,
                },
                {
                    name: "mypage",
                    path: "mypage",
                    component: MyPageView,
                    beforeEnter: requireLogin,
                },
            ],
        },
        {
            path: "/jira",
            children: [
                {
                    name: "jira-home",
                    path: "home",
                    component: JiraHomeView,
                },
            ],
        },
    ],
});

export default router;
