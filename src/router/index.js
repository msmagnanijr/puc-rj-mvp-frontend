import Vue from 'vue';
import Router from 'vue-router';
import Subjects from '../components/Subjects.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Subjects',
      component: Subjects,
    },
  ],
});
