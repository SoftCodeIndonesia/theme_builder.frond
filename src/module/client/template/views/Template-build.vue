<template>
    <div class="container">
        <div class="row mt-5">
            <span> 
                <span class="dropdown mr-2">
                    <button class="btn btn-sm btn-success dropdown-toggle" @click="this.downloadEvent" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Download
                    </button>
                    <div class="dropdown-menu" :class="{ show: this.dropdownDownloadState }" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" @click.prevent="this.downloadWithBootstrap">Boostrap</a>
                    </div>
                </span>
                <button type="button" class="btn btn-sm btn-primary mr-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add Component</button>
               
                
            </span>
        </div>
        <div class="row mt-3">
            <div v-if="this.loading">
                <p class="text-center">loading</p>
            </div>
            <div class="build_component row" v-else v-for="component, index in this.components" v-bind:key="index">
                <div class="col-sm content_view"><div v-html="component.content"></div></div>
                <div class="col-sm-1 btn_delete display_none"><button class="btn btn-sm btn-danger" @click="this.onDeleteComponent(component.component_id)">delete</button></div>
               
            </div>
            
        </div>
    </div>

    
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Component</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="list-group mt-2" v-for="(item, index) in this.viewCollapseComponent" v-bind:key="index">
                    <div class="list-group-item list-group-item-action active" aria-current="true">
                        {{item.name}}
                    </div>
                    <a href="#" @click.prevent="" @click="this.onComponentSelected(comp)" class="list-group-item list-group-item-action" data-bs-dismiss="modal" aria-label="Close" v-for="(comp, i) in item.components" v-bind:key="i">{{comp.name}}</a>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
import api from '../../../../config/api';
import axios from 'axios';
export default {
    name: 'Template-build',
    data(){
        return {
            dropdownDownloadState: false,
            loading: true,
            template: null,
            viewCollapseComponent: null,
            components: [],
            
            // templateUrl: '';
        }
    },
    methods: {
        async downloadWithBootstrap(){
            const date = new Date();
            
            const response = await axios.post('template/download',{template_id: this.template.id, framework_id: 1}, { responseType: 'blob' });
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
        async downloadEvent(){
            this.dropdownDownloadState = this.dropdownDownloadState ? false : true;
        },
        async onDeleteComponent(template_component_id){
            const response = await api.DELETE(`/template/component/${this.template.id}/${template_component_id}`);
            if(response.status){
                await this.syncTeamplate();
            }
        },
        async onComponentSelected(comp){
            const response = await api.POST('/template/component', {component_id: comp.id, template_id: this.template.id});
            if(response.status){
                this.loading = true;
                await this.syncTeamplate();
                this.loading = false;
            }
        },
        async fetchComponent(){
            const response = await api.GET('/section');
            if(response.status){
                this.viewCollapseComponent = response.payload;
            }
            console.log(response);
        },
        async syncTeamplate(){
            const response = await api.POST('/template/build', {id: this.$route.params.id});
            
            if(response.status){
                this.template = response.payload.template;
                this.components = response.payload.components;
                // this.templateUrl = ''
            }

            this.loading = false;
        },
        async createTemplate() {
            const response = await api.POST('/template');
            console.log(response);
        }
    },
    created() {
         console.log(this.$route);
        this.syncTeamplate();
        this.fetchComponent();
    }
}

</script>