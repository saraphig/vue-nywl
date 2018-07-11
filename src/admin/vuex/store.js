/**
 * Created by movooc.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import app from './modules/app'
import area from './modules/area'
import login from './modules/login'
import page from './modules/page'
import equipment from './modules/equipment'
import user from './modules/user'
import system from './modules/system'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    page,
    area,
    app,
    login,
    equipment,
    user,
    system
  },
  strict: process.env.NODE_ENV !== 'production'
})
