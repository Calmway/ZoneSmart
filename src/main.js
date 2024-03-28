import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import store from './store/index';
import router from './router';


createApp(App).use(store).use(router).mount('#app')

(() => {
    let authorized = null;
    if (localStorage.getItem('auth')) {
        authorized = JSON.parse(localStorage.getItem('auth'))
    }
    if (!store.state.validToken) {
        router.push('/login')
    } else {
        router.push('/')
    }
})()