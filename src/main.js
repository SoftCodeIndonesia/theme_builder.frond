import { createApp } from 'vue'
import App from './App.vue'
import route from './router'
import store from './store';
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.esm';
import 'bootstrap/dist/js/bootstrap.bundle';


import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net-bs5';
 
DataTable.use(DataTablesLib);

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.response.use(undefined, function(error) {
    if (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch("LogOut");
        return route.push("/auth/signin");
      }
    }
});


const vue = createApp(App);

vue.use(store);
vue.use(DataTable);
// vue.use(BootstrapVue3);
vue.component("font-awesome-icon", FontAwesomeIcon);
vue.use(route).mount('#app');
