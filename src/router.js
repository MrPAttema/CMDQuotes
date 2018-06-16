import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Shuffle from './views/Shuffle.vue'
import Upload from './views/Upload.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/topvoted',
            name: 'topvoted',
            component: Shuffle
        },
        {
            path: '/upload',
            name: 'upload',
            component: Upload
        }
    ]
})
