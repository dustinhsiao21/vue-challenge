import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Pomodoro from './views/Pomodoro/Index.vue';
import Setting from './views/Pomodoro/Setting.vue';
import TodoList from './components/Pomodoro/TodoList.vue';
import Analytics from './components/Pomodoro/Analytics.vue';
import Ringtones from './components/Pomodoro/Ringtones.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: Pomodoro,
    },
    {
      path: '/pomodoro/setting',
      name: 'pomo-setting',
      component: Setting,
      children: [
        {
          path: 'todolist',
          name: 'pomo-todolist',
          component: TodoList,
        },
        {
          path: 'analytics',
          name: 'pomo-analytics',
          component: Analytics,
        },
        {
          path: 'ringtones',
          name: 'pomo-ringtones',
          component: Ringtones,
        },
      ],
    },
  ],
});
