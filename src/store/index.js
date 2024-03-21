// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    projectName: ''
  },
  mutations: {
    setProjectName(state, name) {
      state.projectName = name;
    }
  }
});
