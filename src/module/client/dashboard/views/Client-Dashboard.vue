<template>
    
    <div class="container">
        
        <div class="row mt-3">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <button type="button" class="btn btn-sm btn-primary mr-2" data-bs-toggle="modal" data-bs-target="#createTemplate" >Create template</button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-body"><TemplateListVue></TemplateListVue></div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div v-if="this.loadState">
            <p class="text-center">Loading......</p>
        </div>
        <div class="row mt-2" v-else>
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
                            <!-- <i class="fa-solid btn fa-ellipsis-vertical col-sm-1" data-toggle="dropdown" aria-expanded="false">
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </i> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="createTemplate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createTemplate" aria-hidden="true">
        <div class="modal-dialog">
            <form @submit.prevent="this.createTemplate">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Template</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="template-name" class="form-label">Template name</label>
                                <input type="text" class="form-control" v-model="this.form.template_name" id="template-name" placeholder="template name" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import api from '../../../../config/api';
import axios from 'axios';
export default {
    name: 'Client-Dashboard',
    data(){
        return {
            dropdownDownloadState: false,
            loadState: true,
            templates: [],
            form: {
                template_name: null,
                
            }
        }
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
            await api.POST('/template', {name: this.form.template_name});
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