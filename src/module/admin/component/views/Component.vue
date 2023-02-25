<template>
    <div class="d-flex gap-3 my-3">
        <div class="col-sm-3 mx-2">
            <div class="card shadow">
                <div class="list-group" v-for="(item, index) in this.viewCollapseComponent" v-bind:key="index">
                    <div class="btn-group list-section m-2">
                        <a href="#" @click.prevent="this.openSectionMenu($event)" class="text-dark col-sm d-flex justify-content-between align-items-center" aria-current="true">
                            {{item.name}}
                            <span class="badge bg-danger rounded-pill" v-if="item.components.length == 0" @click="this.deleteSection(item.id)"><i class="fa fa-fw fa-trash"></i></span>
                        </a>
                        <ul class="dropdown-menu shadow">
                            <li :data-id="comp.id" @click.prevent='this.onComponentClick(comp, item)' v-for="(comp, i) in item.components" ref="list-group-component" v-bind:key="i" class="p-2"><a class="dropdown-item section-item d-flex gap-3 justify-content-between" href="#">{{comp.name}} <span class="badge bg-danger rounded-pill" @click="this.onComponentClickDelete(comp)"><i class="fa fa-fw fa-trash"></i></span> </a>  </li>
                            <li ref="list-group-component" v-bind:key="i" class="p-2"><a class="dropdown-item section-item" href="#" @click.prevent="this.showAddComponent(item)"> <i class="fa fa-fw fa-add"></i> Add Component</a></li>
                        </ul>
                    </div>
                    <!-- <a href="#" :data-id="comp.id" @click.prevent='this.onComponentClick(comp)' class="list-group-item d-flex justify-content-between align-items-start list-group-item-action" v-for="(comp, i) in item.components" ref="list-group-component" v-bind:key="i">{{comp.name}} <span class="badge bg-danger rounded-pill" @click.prevent='this.onOpenModalConfirm(comp)'><i class="fa fa-fw fa-trash"></i></span> </a> -->
                </div>
                <div class="btn-group list-section m-2">
                    <button class="text-dark col-sm btn btn-primary " @click="this.toggleSection">
                        <i class="fa fa-fw fa-add"></i> Add section
                        <!-- <span class="badge bg-danger rounded-pill" v-else><i class="fa fa-fw fa-trash"></i></span> -->
                    </button>
                </div>
            </div>
        </div>
        <div class="col-sm mx-2">
            <div class="card shadow">
                <form @submit.prevent="this.submitSection" :class="{'d-none': this.dNone}">
                <!-- <form @submit.prevent="this.submitSection" :class="{'d-none': this.dNone}"> -->
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="name" class="form-label text-dark">Section Name</label>
                            <input type="text" class="form-control" id="name" v-model="this.form.section.name" placeholder="section name" autocomplete="off">
                        </div>
                        <button type="submit" class="text-primary bg-transparent btn">simpan</button>
                    </div>
                </form>
            </div>
            <form @submit.prevent="this.submitComponent" :class="{'d-none': this.dNoneCompnent}">
                <div class="card shadow mt-2">
                    <div class="card-body">
                        <!-- <div class="mb-3">
                            <label for="section_id" class="form-label text-dark">Section</label>
                            <select class="form-select" id="section_id" aria-label="Default select example" v-model="this.form.sectionId">
                                <option selected>Select Component</option>
                                <option :value="item.value" v-for="(item, index) in this.form.optionsSection" v-bind:key="index">{{item.text}}</option>
                            </select>
                        </div> -->
                        <div class="mb-3">
                            <label for="component_name" class="form-label text-dark">Section name</label>
                            <input type="text"  class="form-control" id="component_name" :value="this.form.section.name" placeholder="component name" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="component_name" class="form-label text-dark">Component name</label>
                            <input type="text" class="form-control" id="component_name" v-model="this.form.componentName" placeholder="component name" autocomplete="off">
                        </div>
                        <div class="mb-3">
                            <label for="file" class="form-label text-dark label-upload">
                                <div v-if="this.componentHtml == ''" class="form-upload-cover">Upload file componen</div>
                                <html v-else v-html="this.componentHtml"></html>
                                <!-- <div v-html="this.component"></div> -->
                            </label>
                            <input type="file" class="form-control d-none" ref="file" @change="this.changeFile" id="file" autocomplete="off">
                        </div>
                        <div class="mb-3">
                            
                        </div>
                        <button type="submit" class="btn btn-sm btn-transparent text-primary">simpan</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    
    <!-- Modal -->
    <div ref="modal_confirm_delete_component" class="modal fade" :class="{show: this.modalComfirm}" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" v-on:click="this.onCloseModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" v-on:click="this.onCloseModal" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" v-on:click="this.onDeleteComponent" class="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../../../config/api";
// import CardFormSection from '../../section/component/CardFormSection.vue';
export default {
    name: "component",
    // components: {
    //     CardFormSection,
    // },
    data(){
        return {
            dNone: true,
            dNoneCompnent: true,
            modalComfirm: false,
            component: null,
            componentHtml: ``,
            form: {
                section: {
                    name: '',
                },
                sectionId: null,
                component: null,
                componentName: '',
                optionsSection: [],
            },
            viewCollapseComponent: [],
            compThumbPath: '',
        }
    },
    methods: {
        showAddComponent(item){
            this.form.section.name = item.name;
            this.form.sectionId = item.id;
            this.dNoneCompnent = false;
            const element = document.querySelectorAll('.show');
            element.forEach(element => {
                console.log(element);
                     if(element.classList.contains('show')){
                        element.classList.remove('show');
                    }else{
                        element.classList.add('show');
                    }
            });
            
        },
        openSectionMenu(event){
            if(event.target.parentElement.childNodes[1].classList.contains('show')){
                event.target.parentElement.childNodes[1].classList.remove('show');
            }else{
                const element = document.querySelectorAll('.show');
                element.forEach(element => {
                    console.log(element);
                        if(element.classList.contains('show')){
                            element.classList.remove('show');
                        }else{
                            element.classList.add('show');
                        }
                });
                event.target.parentElement.childNodes[1].classList.add('show');
            }
            
        },
        async deleteSection(section_id){
            await api.DELETE('/section/' + section_id);
            await this.fetchSection();
        },
        toggleSection(){
            this.dNone = this.dNone == true ? false : true;
        },
        onComponentClickDelete(comp){
            this.component = comp;
            this.onDeleteComponent();
        },
        async onDeleteComponent(){
            const response = await api.DELETE('/component/' + this.component.id);
            console.log(response);
            // if(response.status){
                this.fetchSection();
            // }

            this.modalComfirm = false;
        },
        onComponentClick(comp, section) {
            this.form.sectionId = section.section_id;
            this.form.section.name = section.name;
            this.form.componentName = comp.name;
            this.showAddComponent(section)
        },
        onCloseModal(){
            this.modalComfirm = false;
        },
        onOpenModalConfirm(comp){
            this.component = comp;
            this.modalComfirm = true;
        },
        changeFile(){
            this.form.component = this.$refs.file.files[0];
            
            var fileReader = new FileReader();

            fileReader.onload = (res) => {
                this.componentHtml = res.target.result;
                
            };

            fileReader.onerror = (err) => console.log(err);
            fileReader.readAsText(this.form.component);
            
            console.log(this.componentHtml);
            
        },
        async submitComponent() {
            const Component = new FormData();
            Component.append('file', this.form.component);
            Component.append('name', this.form.componentName);
            Component.append('section_id', this.form.sectionId);

            const response = await api.POST('/component', Component);

            if(response.status){
                this.fetchSection();
            }

            this.form.componentName = '';

        },
        generateOptionSection(){
            this.form.optionsSection = [];
            this.viewCollapseComponent.forEach(element => {
                this.form.optionsSection.push({ value: element.id, text: element.name });
            });

            console.log(this.form.optionsSection);
        },
        async fetchSection() {
            const response = await api.GET('/section');

            const collapseComponent = [];

            response.payload.forEach(element => {
                const collapse = element;
                collapse.target = '#' + element.name;
                collapseComponent.push(collapse);
            });
            this.viewCollapseComponent = collapseComponent;

            this.generateOptionSection();
        },
        async submitSection(){
            const response = await api.POST('/section', {name: this.form.section.name});
            if(response.status){
                this.form.section.name = '';
                await this.fetchSection();
            }
            this.dNone = true;
        }
    },
    created() {
        this.fetchSection();
    }

}
</script>



<style scoped>
   

    .show{
        display: block !important;
    }
    .card{
        transform: none !important;
        transition: none !important
    }

    .card:hover{
        background-color: white !important;
    }

    .list-group-item{
        border: none !important
    }

    .section-item{
        padding: 10px !important;
    }

    .list-section{
        padding: 8px !important;
    }
    .list-section:hover{
        background-color: rgba(108,93,211,.05);
    }

    .dropdown-menu{
        border: none !important;
    }

    .show {
        display: block !important;
        top: 0;
        margin-left: 105% !important;
        margin-top: -10px !important;
    }
    
    .form-upload-cover{
        border: 2px solid rgba(0, 0, 0, 0.05);
        width: 100% !important;
        padding: 50px;
        border-radius: 10px;
        
    }

    .label-upload{
        width: 100% !important;
    }
    
</style>