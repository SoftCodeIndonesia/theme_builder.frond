<template>
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-sm-4">
                <div class="card login-page-content">
                    <form @submit.prevent="onSubmit">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="this.email" id="exampleFormControlInput1" placeholder="name@example.com" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="this.password" id="exampleFormControlInput1" placeholder="password" required>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary col-sm-12">Login</button>
                            </div>
                            <p>Belum punya akun? <router-link to="/auth/signup">Daftar disini</router-link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import api from '../../../config/api';

export default {
    name: "signin",
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['LogIn']),
        async onSubmit(){
            const response = await api.POST('auth/login', {email: this.email, password: this.password}, false);
                
            if(response.status === true){

                this.LogIn(response.payload);
                window.location.href = '/';
            }
            // try {
            //     const response = await api.POST('auth/login', {email: this.email, password: this.password}, false);
            //     console.log(response);
            //     if(response.status === true){

            //         this.LogIn(response.payload);
            //         this.$router.push('/');
            //         this.showError = false;
            //     }else{
            //         this.showError = true;
            //     }

            // } catch (error) {
            //     console.log('error : ' + error);
            // }
        }
    }
}

</script>

<style>
.login-page-content{
    margin-top: 50% !important;
}
</style>