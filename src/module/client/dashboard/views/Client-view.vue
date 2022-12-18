<template>
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

