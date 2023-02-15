import { createApp } from 'vue'
import App from './App.vue'
import route from './router'
import store from './store';
import axios from 'axios';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
require('dotenv').config();
const {VUE_APP_API_URI} = process.env;
library.add(fas);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
library.add(fab);
dom.watch();
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.esm';
import 'bootstrap/dist/js/bootstrap.bundle';

import "./assets/css/main.css";


import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net-bs5';
 
DataTable.use(DataTablesLib);

axios.defaults.withCredentials = false;
axios.defaults.baseURL = VUE_APP_API_URI;

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

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const vue = createApp(App);

vue.use(store);
vue.use(DataTable);
vue.component("font-awesome-icon", FontAwesomeIcon);
vue.use(route).mount('#app');
