<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-sm-12">
                <div class="card">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" :class="{active:breadCrumb.active }" v-for="breadCrumb, index in this.$route.meta.breadCrumb" v-bind:key="index"> <router-link v-if="breadCrumb.active == false" :to="breadCrumb.to">{{breadCrumb.text}}</router-link> <span v-else>{{breadCrumb.text}}</span> </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: 'Client-view',
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

