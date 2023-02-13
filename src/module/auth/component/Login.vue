<template>
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-sm-4">
                <div class="card login-page-content">
                    <form @submit.prevent="onSubmit">
                        <div class="card-header">
                            Masuk
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="this.email" id="exampleFormControlInput1" placeholder="name@example.com" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="this.password" id="exampleFormControlInput1" placeholder="password" required>
                            </div>
                            <p class="text-start">Belum punya akun? <router-link to="/auth/signup">Daftar disini</router-link></p>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-success col-sm-12">Login</button>
                            </div>
                            <p class="text-center text-muted">OR</p>
                            <div class="row justify-content-center mb-3">
                                <div class="col-sm-3 text-center">

                                    <a @click.prevent="this.withGoogle" class="btn btn-danger"><i class="fa-brands fa-fw fa-google"></i></a>
                                </div>
                                <div class="col-sm-3 text-center">

                                    <a @click.prevent="this.withFacebook" class="btn btn-primary"><i class="fa-brands fa-fw fa-facebook"></i></a>
                                </div>
                                <div class="col-sm-3 text-center">

                                    <a @click.prevent="this.withGithub" class="btn btn-dark"><i class="fa-brands fa-fw fa-github"></i></a>
                                </div>
                            </div>
                            
                            <!-- <a @click.prevent="this.withFacebook" class="btn btn-primary col-sm-12 mb-3">continue with facebook</a>
                            <a @click.prevent="this.withGithub" class="btn btn-dark col-sm-12 mb-3">continue with Github</a> -->
                            
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
import socialSignIn from '../../../helper/socialSignIn';
export default {
    name: "signin",
    data(){
        return {
            username: '',
            rules_id: 1,
            email: '',
            password: '',
            avatar_url: '',
            providerId: '',
        }
    },
    methods: {
        ...mapActions(['LogIn']),
        logout(e){
            e.preventDefault();
            this.LogOut();
            window.location.href = '/';
        },
        
        async withGithub(){
            const result = await socialSignIn.signIn(socialSignIn.socialProvider.github);
            const user = result.user.reloadUserInfo.providerUserInfo[0];
           
            this.username = user.displayName;
            this.email = user.email ?? '';
            this.avatar_url = user.photoUrl;
            this.providerId = user.providerId;
            
            this.onSubmitProvider();
        },
        async withFacebook(){
            const result = await socialSignIn.signIn(socialSignIn.socialProvider.facebookProvider);
            const user = result.user.reloadUserInfo.providerUserInfo[0];
            this.username = user.displayName;
            this.email = user.email ?? '';
            this.avatar_url = user.photoUrl;
            this.providerId = user.providerId;

            this.onSubmitProvider();
        },
        async withGoogle(){
            const result = await socialSignIn.signIn(socialSignIn.socialProvider.google);
            const user = result.user.reloadUserInfo.providerUserInfo[0];
            this.username = user.displayName;
            this.email = user.email ?? '';
            this.avatar_url = user.photoUrl;
            this.providerId = user.providerId;

            this.onSubmitProvider();
        },
        async onSubmitProvider(){
            const socialLite = {email: this.email, username: this.username, rules_id: this.rules_id, avatar_url: this.avatar_url, providerId: this.providerId};
            const response = await api.POST('auth/social', socialLite, false);
            if(response.status == true){
                this.LogIn(response.payload);
                window.location.href = '/';
            }
        },
        async onSubmit(){
            
            try {
                const response = await api.POST('auth/login', {email: this.email, password: this.password}, false);
                
                if(response.status === true){

                    this.LogIn(response.payload);
                    window.location.href = '/';
                }else{
                    this.showError = true;
                }

            } catch (error) {
                console.log('error : ' + error);
            }
        }
    }
}

</script>
    
<style>
 
</style>