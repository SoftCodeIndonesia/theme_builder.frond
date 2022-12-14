<template>
    <nav class="navbar navbar-expand-lg bg-light">
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
                <a @click="this.logout" href="" class="nav-link"><i class="fa-solid fa-right-from-bracket"></i> Keluar</a>
            </span>
            </div>
        </div>
    </nav>

    <Sidebar/>
</template>

<script>
import Sidebar from './Sidebar.vue';
import { mapActions } from "vuex";
export default {
    name: "Navbar",
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