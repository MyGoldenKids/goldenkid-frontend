import { createRouter, createWebHistory } from "vue-router";
import MainViewVue from "@/views/MainView.vue";
import SurveyViewVue from "@/views/survey/SurveyView.vue";
import SignupView from "@/views/member/MemberSignupView.vue";
import LoginView from "@/views/member/MemberLoginView.vue";
import MyPageView from "@/views/member/MemberMyPageView.vue";
import ErrorView from "@/views/error/ErrorView.vue";
import ArticleListView from "@/views/article/ArticleListView.vue";
import ArticleDetailView from "@/views/article/ArticleDetailView.vue";
import ArticleWriteView from "@/views/article/ArticleWriteView.vue";
import ArticleUpdateView from "@/views/article/ArticleUpdateView.vue"
import DiaryHomeView from "@/views/diary/DiaryHomeView.vue";
import DiaryListView from "@/views/diary/DiaryListView.vue";
import DiaryWriteView from "@/views/diary/DiaryWriteView.vue";
import DiaryCreateView from "@/views/diary/DiaryCreateView.vue";
import DiaryUpdateView from "@/views/diary/DiaryUpdateView.vue"
import JiraHomeView from "@/views/jira/JiraHomeView.vue";
import JiraPlan0View from "@/views/jira/JiraPlan0View.vue";
import JiraPlan1View from "@/views/jira/JiraPlan1View.vue";
import JiraPlan2View from "@/views/jira/JiraPlan2View.vue";
import JiraPlan3View from "@/views/jira/JiraPlan3View.vue";

const requireLogin = (to, from, next) => {
    import("@/stores/member-store").then(({ useMemberStore }) => {
        const memberStore = useMemberStore();
        if (!memberStore.isLoggedIn) {
            alert("로그인 후 이용가능합니다.");
            next("/member/login");
        } else {
            next();
        }
    });
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
                    name: "article-home",
                    path: "list",
                    component: ArticleListView,
                },
                {   
                    name: "article-detail",
                    path: "detail/:id",
                    component: ArticleDetailView,
                },
                {   
                    name: "article-write",
                    path: "write",
                    component: ArticleWriteView,
                    beforeEnter: requireLogin,
                },
                {   
                    name: "article-modify",
                    path: "modify",
                    component: ArticleUpdateView,
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
                {
                    name: "jira-plan0",
                    path: "plan0",
                    component: JiraPlan0View,
                },
                {
                    name: "jira-plan1",
                    path: "plan1",
                    component: JiraPlan1View,
                },
                {
                    name: "jira-plan2",
                    path: "plan2",
                    component: JiraPlan2View,
                },
                {
                    name: "jira-plan3",
                    path: "plan3",
                    component: JiraPlan3View,
                },
            ],
        },
    ],
});

export default router;
