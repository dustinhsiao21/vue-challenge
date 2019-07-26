import Vue from 'vue';
import Vuex from 'vuex';

import pomodoro from './components/pomodoro';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pomodoro,
  },
});
