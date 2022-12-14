import Vuex from "vuex";
import { createApp } from 'vue';
import createPersistedState from "vuex-persistedstate";
import authServices from '../service/auth_service'

createApp(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        authServices,
    },
    plugins: [createPersistedState()],
});