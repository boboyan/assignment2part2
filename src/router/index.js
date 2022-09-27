import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieList from '../components/MovieList'
import MovieCreate from '../components/MovieCreate'
import Auth from '../components/Auth'
import Register from '../components/Register'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie-list',
    name: 'MovieList',
    component: MovieList,
  },
  {
    path:'/movie-list/:msg',
    name: 'MovieUpdatedList',
    component: MovieList
  },
  {
    path:'/movie-create',
    name:'MovieCreate',
    component: MovieCreate
  },
  {
    path: '/movie-create/:pk',
    name: 'MovieUpdate',
    component: MovieCreate
  },
  {
    path:'/auth',
    name:'Auth',
    component: Auth
  },
  {
    path:'/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// },

export default router
