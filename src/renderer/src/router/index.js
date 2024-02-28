import { createRouter, createWebHashHistory } from 'vue-router'

import Step1View from '../views/Step1View.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'step1',
      component: Step1View
    },
    {
      path: '/step2',
      name: 'step2',
      component: () => import('../views/Step2View.vue')
    },
    {
      path: '/step3',
      name: 'step3',
      component: () => import('../views/Step3View.vue')
    },
    {
      path: '/step4',
      name: 'step4',
      component: () => import('../views/Step4View.vue')
    },
    {
      path: '/step5',
      name: 'step5',
      component: () => import('../views/Step5View.vue')
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/latex',
    //   name: 'latex',
    //   component: () => import('../views/LatexView.vue')
    // },
    // {
    //   path: '/bignumber',
    //   name: 'BigNumber',
    //   component: () => import('../views/BigNumberView.vue')
    // }
  ]
})

export default router
