import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "./views/Feed";
import Work from "./views/Work";
import Home from "./views/Home";
import FourOFour from "./views/FourOFour";
import Post from "./views/Post";
import Preview from "./views/Preview";
import bus from "./bus";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "posts",
    path: "/blog",
    component: Feed
  },
  {
    name: "work",
    path: "/work",
    component: Work
  },
  {
    name: "post",
    path: "/posts/:slug",
    component: Post
  },
  {
    name: "page",
    path: "/page/:page",
    component: Feed
  },
  {
    name: "four-o-four",
    path: "/404",
    component: FourOFour
  },
  {
    name: "preview",
    path: "/_preview/*",
    component: Preview
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.afterEach(() => {
  //-- Bump the key on App component to force component to update on route change.
  bus.$emit("bumpViewKey");
});

export default router;
