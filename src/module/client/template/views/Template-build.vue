<template>
    
    <NavbarBuild :template="this.template" v-if="this.loading == false" />
    <div class="container" v-if="this.components.length > 0">
        <!-- <div class="d-flex">
            <button type="button" class="btn btn-sm btn-primary col-sm float-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add Component</button>
        </div> -->
        <div class="row my-4">
            <div v-if="this.loading">
                <p class="text-center">loading</p>
            </div>
            <div class="build_component row" v-else v-for="component, index in this.components" v-bind:key="index">
                <div class="col-sm content_view"><div v-html="component.content"></div></div>
                <div class="col-sm-1 btn_delete display_none"><button class="btn btn-sm btn-danger" @click="this.onDeleteComponent(component.component_id)">delete</button></div>
               
            </div>
            
        </div>
    </div>

    <div class="canvas py-4" id="canvas" v-else>
        <div class="page-center">
            <div class="page-content m-auto">
                <div id="add">
                    <div class="center mb-2">
                        <img src="asset/ic-add.svg" alt="Icon Add">
                    </div>
                <p>Add new section here</p>
                </div>
            </div>
        </div>
    </div>

    
      <div class="shadow fixed-bottom nav-section-element">
        <div class="page-center mx-3">
          <nav class="navbar navbar-expand-lg">
            <ul class="navbar-nav d-flex gap-3">
                <li class="nav-item dropdown-element-button" @click="this.onDropdownElementButton($event)" v-for="(item, index) in this.viewCollapseComponent" v-bind:key="index">
                    <div class="nav-link btn dropdown-toggle button-section-menu"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{this.helper.capitalizeEveryWord(item.name)}}
                    </div>
                    <ul class="dropdown-menu dropdown-menu-element-section">
                        <li><a class="dropdown-item" href="#" @click.prevent="this.onComponentSelected(comp)" v-for="(comp, i) in item.components" v-bind:key="i">{{this.helper.capitalizeEveryWord(comp.name)}}</a></li>
                    </ul>
                </li>
                
                
            </ul>
          </nav>
        </div>
      </div>


</template>

<script>
import api from '../../../../config/api';
import axios from 'axios';
import NavbarBuild from '../component/Navbar-build.vue';
import helper from '../../../../helper/index';
export default {
    name: 'Template-build',
    data(){
        return {
            helper: helper,
            dropdownDownloadState: false,
            loading: true,
            template: null,
            viewCollapseComponent: null,
            components: [],
            
            // templateUrl: '';
        }
    },
    components: {
        NavbarBuild,
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
        onDropdownElementButton(event){
           
            console.log(event.target.parentElement.childNodes[1].classList);
            if(event.target.parentElement.childNodes[1].classList.contains('show')){
                event.target.parentElement.childNodes[1].classList.remove("show");
            }else{
                const eventTarget = document.querySelector('.show');
                
                if( eventTarget != null && eventTarget.classList.contains('show')){
                    eventTarget.classList.remove("show")
                }
                event.target.parentElement.childNodes[1].classList.add("show");
            }
        },
        async syncTeamplate(){
            const response = await api.POST('/template/build', {id: this.$route.params.id});
            console.log(response);
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
<style scoped>
    .button-section-menu{
        cursor: pointer;
        border-radius: .5rem;
    }
    .button-section-menu:hover{
        background-color: rgba(108,93,211,.05);
    }
    ul.navbar-nav {
        white-space: nowrap;
        overflow-x: auto;
    }

    .nav-section-element{
        margin: 3%;
        border-radius: .5rem !important;
    }

    .nav-section-element > .page-center {
        margin: 1%;
    }

    .dropdown-menu-element-section{
        position: fixed;
        bottom: 0;
        margin-bottom: 7%;
        float: none !important;
        /* transition: margin 2s; */
    }
</style>
<style scoped>
    /* @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
    @import '../../../../assets/css/builder/main.css'; */
    @import '../../../../assets/css/builder/start.css';
</style>