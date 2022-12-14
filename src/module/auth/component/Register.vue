<template>
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-sm-4">
                <div class="card register-page-content">
                    <form @submit.prevent="this.onSignUp">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Username</label>
                                <input type="text" class="form-control" v-model="v$.form.username.$model" id="exampleFormControlInput1" placeholder="username" required>
                                <p class="text-danger" v-for="(error, index) of v$.form.username.$errors" :key="index">{{error.$message}}</p>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="v$.form.email.$model" id="exampleFormControlInput1" placeholder="name@example.com" required>
                                <p class="text-danger" v-for="(error, index) of v$.form.email.$errors" :key="index">{{error.$message}}</p>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="v$.form.password.$model" id="exampleFormControlInput1" placeholder="password" required>
                                <p class="text-danger" v-for="(error, index) of v$.form.password.$errors" :key="index">{{error.$message}}</p>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Konfirmasi Password</label>
                                <input type="password" class="form-control" v-model="v$.form.confirmPassword.$model" id="exampleFormControlInput1" placeholder="konfirmasi password" required>
                                <p class="text-danger" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">{{error.$message}}</p>
                            </div>
                            <div class="mb-3">
                                <div v-if="this.loadState" class="btn btn-primary col-sm-12">Loading.....</div>
                                <button v-else type="submit" :disabled="v$.form.$invalid" class="btn btn-primary col-sm-12">Login</button>
                            </div>
                            <p v-if="this.errorSignUpMessage != null" class="text-danger">{{this.errorSignUpMessage}}</p>
                            <p>Sudah punya akun? <router-link to="/auth/signin">Masuk disini</router-link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import api from '../../../config/api';
export default {
    setup () {
        return { v$: useVuelidate() }
    },
    name: 'register',
    data(){
        return {
            errorSignUpMessage: null,
            loadState: false,
            form: {
                rules_id: 1,
                username: null,
                email: null,
                password: null,
                confirmPassword: null,
            }
        }
    },
    validations() {
        return {
            form: {
                username: { required },
                email: { required, email },
                password: { required, min: minLength(6) },
                confirmPassword: { 
                    required,min: minLength(6), sameAsPassword: sameAs(this.form.password),
                }
            },
        }
    },
    methods: {
        async onSignUp(){
            this.loadState = true;
            const response = await api.POST('/auth', {rules_id: this.form.rules_id,username: this.form.username,email: this.form.email, password: this.form.password}, false);
            if(response.status){
                this.$router.push('/auth/signin')
            }else{
                this.errorSignUpMessage = response.message;
            }
            this.loadState = false;
        }
    }
}

</script>

<style>
.register-page-content{
    margin-top: 30% !important;
}
</style>