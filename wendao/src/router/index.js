import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import reg from '../views/reg.vue'
import essays from '../views/essay.vue'
import changeMessage from '../views/changeMessage.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },{
    path:'/login',
    component:login
  },{
    path:'/reg',
    component:reg
  },{
    path:'/essays',
    component:essays
  },{
    path:'/changemessage',
    component:changeMessage
  }
  
]

const router = new VueRouter({
  routes
})

export default router
