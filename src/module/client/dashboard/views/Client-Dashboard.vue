<template>
    <NavbarClient :onCreate="this.createTemplate" />
    <div class="container">
        <div v-if="this.loadState">
            <p class="text-center">Loading......</p>
        </div>
        <div class="container-recently py-5" v-else>
            <div class="page-center">
                <div class="content-recently">
                    <div class="header d-flex space-between my-auto">
                        <h3 class="bold">Recently viewed</h3>
                        <a href="#" class="my-auto nav-link">See all</a>
                    </div>
                    <div class="d-grid temp-column-4 gap-3 mt-4">
                        <div class="card" v-for="template, index in this.templates" v-bind:key="index" @click.prevent="this.toEdit(template.id)">
                            <img :src="template.source" alt="Project">
                            <div class="detail-card-custom p-3">
                                <p class="semibold">{{template.name}}</p>
                                <span>Edited 3 hours ago</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        
        <!-- <div class="row mt-2">
            <div class="col-sm-3" v-for="template, index in this.templates" v-bind:key="index">
                <div class="card">
                    <div class="card-body">

                        <img :src="template.source" class="card-img-top" alt="" width="100px">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm"><p class="card-title">{{template.name}}</p></div>
                            <div class="dropdown col-sm-2">
                                <a href="" @click="this.toggleDropdown($event)" ref="more_row_template"><i class="fa-solid btn fa-ellipsis-vertical"></i></a>
                                

                                <div class="dropdown-menu" :class="{ show: this.dropdownDownloadState }">
                                    <a class="dropdown-item" href="#" @click.prevent="this.toEdit(template.id)">Edit</a>
                                    <a class="dropdown-item" href="#" @click.prevent="this.downloadWithBootstrap(template.id, 1)">Download</a>
                                    <a class="dropdown-item" href="#" @click.prevent="this.deleteTemplate(template.id, $event)" >Delete</a>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>

</template>

<script>

import api from '../../../../config/api';
import axios from 'axios';
import NavbarClient from "../../../../components/Navbar-client.vue";

export default {
    name: 'Client-Dashboard',
    data(){
        return {
            dropdownDownloadState: false,
            loadState: true,
            templates: [],
            
        }
    },
    components: {
        NavbarClient,
    },
    
    methods: {

        async deleteTemplate(template_id, event) {
            this.toggleDropdown(event);
            await api.DELETE(`/template/${template_id}`);
            await this.retrieveTemplate();
        },
        toggleDropdown(event){
            event.preventDefault();
            if(event.target.parentElement.parentElement.childNodes[1].classList.contains('show')){

                event.target.parentElement.parentElement.childNodes[1].classList.remove("show");
            }else{
                event.target.parentElement.parentElement.childNodes[1].classList.add("show");
                
            }
        },
        async downloadWithBootstrap(template_id,framework_id){
            const date = new Date();
            
            const response = await axios.post('template/download',{template_id: template_id, framework_id: framework_id}, { responseType: 'blob' });
            if (response.data.error) {
                console.error(response.data.error)
            }

            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            console.log(response.headers);
            const fileName = `${date.getTime()}.html`;
            fileLink.setAttribute('download', fileName);
            fileLink.setAttribute('target', '_blank');
            document.body.appendChild(fileLink);
            fileLink.click();
        },
        async toEdit(template_id){
            this.$router.push({
                name: 'build', 
                params: { id: template_id }
            });
        },
        async createTemplate(){
            const response = await api.POST('/template', {name: `untitle-${this.templates.length}`});
            if(response.status){
                this.toEdit(response.payload.id)
            }
            await this.retrieveTemplate();
        },
        async retrieveTemplate(){
            this.loadState = true;
            const response = await api.GET('/template');
            if(response.status){
                this.templates = response.payload;
            }
            this.loadState = false;
        },
    },
    created(){
        this.retrieveTemplate();
    }
}
</script>

<style>
.card-title{
    width: 100% !important;
    text-overflow: ellipsis !important;
}
</style>

<style scoped>
    @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
    @import '../../../../assets/css/builder/main.css';
    @import '../../../../assets/css/builder/home.css';
</style>