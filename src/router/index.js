import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRegister from '../components/loginRegister'
import second from '../components/second.vue'
import clientManagement from '../components/client/clientManagement'
import contractManagement from '../components/contract/contractManagement'
import employeeManagement from '../components/employee/employeeManagement'
import projectManagement from '../components/project/projectManagement'
import resultProcessing from '../components/result/resultProcessing'
import groupManagement from '../components/group/groupManagement'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
      {
          path:'/',
          name:'login',
          component: loginRegister
      },
      {
          path:'/second',
          name:'second',
          component: second,
          children:[
              {path:'/result/resultProcessing',name:'resultProcessing',component: resultProcessing},
              {path:'/project/projectManagement', name:'projectManagement', component: projectManagement},
              {path:'/employee/employeeManagement', name:'employeeManagement', component: employeeManagement},
              {path:'/client/clientManagement', name:'clientManagement', component: clientManagement},
              {path:'/contract/contractManagement', name:'contractManagement', component: contractManagement},
              {path:'/group/groupManagement', name:'groupManagement', component: groupManagement}
          ]
      },

      ]
})

export default router
