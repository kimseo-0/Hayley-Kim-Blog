import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _37167ea6 = () => interopDefault(import('..\\pages\\aboutMe.vue' /* webpackChunkName: "pages_aboutMe" */))
const _bd4f92ae = () => interopDefault(import('..\\pages\\projects.vue' /* webpackChunkName: "pages_projects" */))
const _28467697 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages_search" */))
const _2813dcfa = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages_user" */))
const _512b4fa0 = () => interopDefault(import('..\\pages\\project\\_postId.vue' /* webpackChunkName: "pages_project__postId" */))
const _1f4bc2ce = () => interopDefault(import('..\\pages\\tags\\_tagName.vue' /* webpackChunkName: "pages_tags__tagName" */))
const _ceaced9a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/aboutMe",
    component: _37167ea6,
    name: "aboutMe"
  }, {
    path: "/projects",
    component: _bd4f92ae,
    name: "projects"
  }, {
    path: "/search",
    component: _28467697,
    name: "search"
  }, {
    path: "/user",
    component: _2813dcfa,
    name: "user"
  }, {
    path: "/project/:postId?",
    component: _512b4fa0,
    name: "project-postId"
  }, {
    path: "/tags/:tagName?",
    component: _1f4bc2ce,
    name: "tags-tagName"
  }, {
    path: "/",
    component: _ceaced9a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
