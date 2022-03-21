import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ac44db72 = () => interopDefault(import('..\\pages\\chats.vue' /* webpackChunkName: "pages_chats" */))
const _e895c852 = () => interopDefault(import('..\\pages\\contacts.vue' /* webpackChunkName: "pages_contacts" */))
const _7ea0cc02 = () => interopDefault(import('..\\pages\\posts.vue' /* webpackChunkName: "pages_posts" */))
const _ef2c5056 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _350c6338 = () => interopDefault(import('..\\pages\\report.vue' /* webpackChunkName: "pages_report" */))
const _5d8989b4 = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages_users" */))
const _3763c5c9 = () => interopDefault(import('..\\pages\\chat\\_roomId.vue' /* webpackChunkName: "pages_chat__roomId" */))
const _b01a85bc = () => interopDefault(import('..\\pages\\postForm\\_postId.vue' /* webpackChunkName: "pages_postForm__postId" */))
const _181faf7e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chats",
    component: _ac44db72,
    name: "chats"
  }, {
    path: "/contacts",
    component: _e895c852,
    name: "contacts"
  }, {
    path: "/posts",
    component: _7ea0cc02,
    name: "posts"
  }, {
    path: "/profile",
    component: _ef2c5056,
    name: "profile"
  }, {
    path: "/report",
    component: _350c6338,
    name: "report"
  }, {
    path: "/users",
    component: _5d8989b4,
    name: "users"
  }, {
    path: "/chat/:roomId?",
    component: _3763c5c9,
    name: "chat-roomId"
  }, {
    path: "/postForm/:postId?",
    component: _b01a85bc,
    name: "postForm-postId"
  }, {
    path: "/",
    component: _181faf7e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
