/* eslint-disable */
const types = {
  "SYSTEM": "SYSTEM",
  "TABBARS": "TABBARS"
}
/**
 * [state 存放项目中各种多组件共享的状态]
 * @type {Object}
 */
const state = {
  message: '',
  tabbars: []
}
/**
 * [getters 从state里派生出来的状态，，比如将state中的某种状态进行过滤然后获取到的新的状态]
 * @type {Object}
 */
const getters = {
  getMessage: state => state.message,
  getTabbars: state => state.tabbars
}

/**
 * [actions 通过commit函数调用mutations中的方法来改变状态，可以进行异步操作]
 * @type {Object}
 */
const actions = {
  updateMessage ({ commit, state }, message) {
    commit(types.SYSTEM, { message })
  },
  updateTabbars ({ commit, state }, tabbars) {
    commit(types.TABBARS, { tabbars })
  }
}

/**
 * [mutations 存放更改state里状态的方法]
 * @type {Object}
 */
const mutations = {
  [types.SYSTEM] (state, { message }) {
    state['message'] = message
  },
  [types.TABBARS] (state, { tabbars }) {
    state['tabbars'] = tabbars
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
