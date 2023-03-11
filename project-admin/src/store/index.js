import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tradeMark from './product/tradeMark'
import attr from './product/attr'
import spu from './product/spu'
import sku from './product/sku'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tradeMark,
    attr,
    spu,
    sku
  },
  getters
})

export default store
