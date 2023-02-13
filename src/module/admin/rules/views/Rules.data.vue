<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <router-link to="/rules/create" class="btn btn-sm btn-primary">Add New Rules</router-link>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-12">
                <div class="card my-1" v-for="rule, index in rules" v-bind:key="index">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm">
                                <!-- <input class="form-check-input mr-1" type="checkbox" v-model="rule.check" true-value="yes" false-value="no" :id="rule.id">
                                <label class="form-check-label" :for="rule.id">
                                </label> -->
                                {{rule.name}}
                            </div>
                            <div class="col-sm text-end">
                                <router-link :to="{ name: 'edit-rules', params: { id: rule.id, }}" class="btn btn-sm mr-1 btn-warning"><span class="fa fa-fw fa-edit"></span></router-link>
                                <button class="btn btn-sm btn-danger" @click="this.onDeleteRules(rule.id)"><span class="fa fa-fw fa-trash"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import api from '../../../../config/api';
export default {
    name: "Rules-data",
    components: {
    },
    data(){
        return{
            isLoading: true,
            rules: [],
        }
    },
    methods: {
        // async delete
        async onDeleteRules(id){
            const reponse = await api.DELETE(`/rules/${id}`);
            if(reponse.status){
                this.isLoading = true;
                await this.fetchRules();
            }
        },  
        async fetchRules(){
            try {
                this.rules = [];
                const response = await api.GET('/rules');
                if(response.status){
                    response.payload.forEach(element => {
                        var rule = element;
                        rule.check = false;

                        this.rules.push(rule);
                    });
                }
                this.isLoading = false;
            } catch (error) {
                console.log(error);
            }
        }
    },
    created(){
        this.fetchRules();
    }
}
</script>