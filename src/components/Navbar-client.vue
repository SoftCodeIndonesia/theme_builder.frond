<template>
    <!-- <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">BUILD</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <span class="navbar-text">
                <a @click="this.logout" href="" class="nav-link"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a>
            </span>
            </div>
        </div>
    </nav> -->
    <!-- navbar  -->
    <div class="shadow">
      <div class="page-center">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a href="#" class="nav-link">
              <div class="profile d-flex my-auto gap-3">
                <div class="asset my-auto">
                  <img :src="this.userData.avatar" alt="username" class="h-2xl w-2xl rounded-circle">
                </div>
                <div class="profile__detail my-auto desktop">
                  <p id="username"><b>{{ this.userData.username }}</b></p>
                  <p id="email">{{ this.userData.email }}</p>
                </div>
              </div>
            </a>
            <!-- <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> -->
            <form autocomplete="off" action="/action_page.php">
              <div class="autocomplete" style="width:300px;">
                <input id="myInput" type="text" name="myCountry" placeholder="Search Template">
              </div>
              <!-- <input type="submit"> -->
            </form>
            <div class="cta d-flex gap-2">
              <button  @click.prevent="this.onCreate" class="btn btn-primary">Create New Template</button>
              <button  @click="this.logout" class="btn btn-danger">LogOut</button>
              <!-- <a class="dropdown-item" href="" @click="this.logout"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a> -->
              </div>
          </div>
        </nav>
      </div>
    </div>

    <Sidebar/>
</template>

<script>
import Sidebar from './Sidebar.vue';
import { mapActions } from "vuex";
import store from '../store/index';
export default {
    name: "Navbar",

    data(){
        return {
            userData: store.getters.StateUser,
            template_name: "",
        }
    },
    props: {
      onCreate: Function,
    },
    components: {
        Sidebar,
    },
    methods: {
        ...mapActions(['LogOut']),
        logout(e){
            e.preventDefault();
            this.LogOut();
            window.location.href = '/';
        },
    }
}
</script>

