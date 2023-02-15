<template>
    <nav class="navbar navbar-expand-lg bg-white">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i class="fa-solid fa-bars"></i></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <!-- <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
                </li> -->
            </ul>
            <span class="navbar-text">
                <!-- <a @click="this.logout" href="" class="nav-link btn btn-success p-2 text-white"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a> -->
                <!-- Example split danger button -->
                <div class="btn-group">
                   
                    <button @click="this.toggleDropdown($event)" type="button" class="btn btn-danger dropdown-toggle">
                        <img :src="this.userData.avatar" class="rounded rounded-circle" width="30" :alt="this.userData.username"> <span class="mx-2">{{ this.userData.username }}</span>
                    </button>
                    <ul class="dropdown-menu dropdown-action-profile">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="" @click="this.logout"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a></li>
                    </ul>
                </div>
                
            </span>
            </div>
        </div>
    </nav>

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
        }
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
        toggleDropdown(event){
            event.preventDefault();
            if(event.target.parentElement.parentElement.childNodes[1].classList.contains('show')){

                event.target.parentElement.parentElement.childNodes[1].classList.remove("show");
            }else{
                event.target.parentElement.parentElement.childNodes[1].classList.add("show");
                
            }
        },
    },
    mounted(){
        console.log(store.getters.StateUser);
    }
}
</script>


<style>
    .dropdown-action-profile{
        margin-top: 25% !important;
    }
</style>