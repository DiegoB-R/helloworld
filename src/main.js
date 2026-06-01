import { createApp } from 'vue'
import { createPinia } from 'pinia'
//ur amigables 
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

//Importar las vistas
import HomeView from './views/HomeView.vue'

//Configurar las rutas 

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        
    ]
})


//Montar aplicaciones y dependencias
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
