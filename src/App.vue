<template>
  <div v-if="this.isAuthenticate && this.userData.rules !== undefined ">
    <div v-if="['admin','developer'].includes(this.userData.rules.name)">
      <Navbar/>
    </div>
    <div v-else>
      <NavbarClient/>
    </div>
    <div class="container mb-3">
        <div class="row mt-3">
            <div class="col-sm-12">
              <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                          <li class="breadcrumb-item" :class="{active:breadCrumb.active }" v-for="breadCrumb, index in this.$route.meta.breadCrumb" v-bind:key="index"> <router-link v-if="breadCrumb.active == false" :to="breadCrumb.to">{{breadCrumb.text}}</router-link> <span v-else>{{breadCrumb.text}}</span> </li>
                      </ol>
                  </nav>
            </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
  <div v-else>
    <Auth/>
  </div>
  
</template>

<script>
import Auth from './module/auth/views/Auth.vue';
import Navbar from './components/Navbar.vue';
import NavbarClient from './components/Navbar-client.vue';
import store from './store';
export default {
  name: 'App',
  data(){
    return{
      isAuthenticate: store.getters.isAuthenticated,
      userData: store.getters.StateUser
    }
  },
  components: {
    Navbar,
    NavbarClient,
    Auth,
  },
  created(){
    console.log(store.getters.StateUser)
  }
}
</script>

<style>
ol{
  margin: 5px !important;
}
/* .wrapbody{
  background-color: rgb(213, 213, 213);
} */
</style>
