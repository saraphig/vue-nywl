/**
 * Created by zhengguorong on 16/6/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import page from './modules/page'
import app from './modules/app'
import login from './modules/login'
import area from './modules/area'
import monitor from './modules/monitor'
import alarm_setup from './modules/alarm_setup'
import comp from './modules/global_comp'
import equipment from './modules/equipment'
import farming_manage from './modules/farming_manage'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        monitor,
        home,
        page,
        app,
        area,
        login,
        comp,
        alarm_setup,
        equipment,
        farming_manage
    },
    strict: process.env.NODE_ENV !== 'production'
})
