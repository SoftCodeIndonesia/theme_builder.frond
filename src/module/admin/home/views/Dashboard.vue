<template>
    <p>dashboard</p>
</template>

<script>
import api from '../../../../config/api';
import axios from 'axios';
export default {
    name: 'Dashboard',
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
            const response = await api.GET('/template');
            
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
        this.syncTeamplate();
        this.fetchComponent();
    }
}

</script>

<style>
#myCanvas{
    background-color: white !important;
}
.btn-add-component {
    border-style: dashed !important;
    cursor: pointer !important;
}
.p-0{
    padding: 0px !important;
}
/* .px-0{
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
.py-0{
    padding-left: 0px !important;
    padding-right: 0px !important;
} */
.border-none{
    border: none !important;
}
.mr-1{
    margin-right: 10px !important;
}
.mr-2{
    margin-right: 20px !important;
}
.mr-3{
    margin-right: 30px !important;
}
.display_none{
    display: none;
}

.build_component:hover > .display_none {
    display: flex !important;
    margin: 10px;
}
/* .build_component{
    position: relative !important;
}
.hover_overlay{
    display: none !important;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgb(251, 85, 159) !important;
}

.build_component:hover > .hover_overlay {
    position: absolute;
    
    display: flex !important;
    opacity: 1;
    top: 0px;
    
}

.build_component:hover > .hover_overlay > button {
    margin: auto;
    opacity: 1 !important;
    background-color: red !important
} */

/* .build_component:hover > *::before{
    width: 100% !important;
    background: red;
    border: 1px solid blue !important;
    position: absolute;
    z-index: 99999;
} */
</style>