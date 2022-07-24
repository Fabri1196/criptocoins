import { createRouter, createWebHistory } from 'vue-router'
import Situacion from '../views/Situacion.vue'
import Compra from '../views/Compra.vue'
import Venta from '../views/Venta.vue'

const routes = [
  {
    path: '/',
    name: 'situacion',
    component: Situacion
  },
  {
    path: '/compra',
    name: 'compra',
    component: Compra,
  },
  {
    path: '/venta',
    name: 'venta',
    component: Venta,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
