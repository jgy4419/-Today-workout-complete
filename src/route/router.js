import { createRouter, createWebHistory } from 'vue-router';
// 메인 페이지
import Main from '../components/main/Main.vue';
// 404 에러 페이지
import ErrorPage from '../components/404Error.vue';
// 로그인 / 회원가입 관련 페이지
import Login from '../components/login/Login.vue';
import Join from '../components/login/Join.vue';
import SearchId from '../components/login/SearchId';
import SearchPw from '../components/login/SearchPw';
// 커뮤니티 페이지
import Community from '../components/community/Community';
import PostDetail from '../components/community/PostDetail';
import  Write from '../components/community/Write';
import MyPage from '../components/community/MyPage';
import Settings from '../components/community/Settings';

// about 페이지
import About from '../components/about/About';
// 센서판매 페이지
import SensorStore from '../components/sensorStore/StoreMain';


const routes = [
    // 메인페이지
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/:id",
      name: "Error",
      component: ErrorPage
    },
    // 로그인 관련 페이지
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/login/join",
      name: "Join",
      component: Join
    },
    {
      path: "/login/SearchId",
      name: "SearchId",
      component: SearchId
    },
    {
      path: "/login/SearchPw",
      name: "SearchPw",
      component: SearchPw
    },
    // 커뮤니티 페이지
    {
      path: "/community",
      name: "Community",
      component: Community
    },
    {
      path: "/:id/:board/:post",
      name: "PostDetail",
      component: PostDetail
    },
    // 컴포넌트 하나에 url 적용시키기
    {
      path: "/edit/:edit/:id/:post/:board",
      name: "edit",
      component: Write
    },
    {
      path: "/write/:edit",
      name: "Write",
      component: Write
    },
    {
      path: "/myPage",
      name: "MyPage",
      component: MyPage
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    // about 페이지
    {
      path: "/about",
      name: "About",
      component: About
    },
    // 센서 판매 스토어
    {
      path: "/store",
      name: "SensorStore",
      component: SensorStore
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;