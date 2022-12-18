<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-sm-3">
                <div class="list-group mt-2" v-for="(item, index) in this.viewCollapseComponent" v-bind:key="index">
                    <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between active" aria-current="true">
                        {{item.name}}
                        <span class="badge bg-danger rounded-pill" @click.prevent="this.deleteSection(item.id)" v-if="item.components.length == 0"><i class="fa fa-fw fa-trash"></i></span>
                        <!-- <span class="badge bg-danger rounded-pill" v-else><i class="fa fa-fw fa-trash"></i></span> -->
                    </a>
                    
                    <a href="#" :data-id="comp.id" @click.prevent='this.onComponentClick(comp)' class="list-group-item d-flex justify-content-between align-items-start list-group-item-action" v-for="(comp, i) in item.components" ref="list-group-component" v-bind:key="i">{{comp.name}} <span class="badge bg-danger rounded-pill" @click.prevent='this.onOpenModalConfirm(comp)'><i class="fa fa-fw fa-trash"></i></span> </a>
                </div>
            </div>
            <div class="col-sm">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-sm">Add Section</div>
                            <div class="col-sm text-end"><button @click="this.toggleSection" class="btn btn-sm btn-primary"><span class="fa fa-fw fa-plus"></span></button></div>
                        </div>
                    </div>
                        <form @submit.prevent="this.submitSection" :class="{'d-none': this.dNone}">
                            <div class="card-body">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Section Name</label>
                                    <input type="text" class="form-control" id="name" v-model="this.form.section.name" placeholder="section name" autocomplete="off">
                                </div>
                            </div>
                            <div class="card-footer text-right">
                                <button type="submit" class="btn btn-sm btn-primary">simpan</button>
                            </div>
                        </form>
                    </div>
                <form @submit.prevent="this.submitComponent">
                    <div class="card mt-2">
                        <div class="card-header">
                            Add Component
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="section_id" class="form-label">Section</label>
                                <select class="form-select" id="section_id" aria-label="Default select example" v-model="this.form.sectionId">
                                    <option selected>Select Component</option>
                                    <option :value="item.value" v-for="(item, index) in this.form.optionsSection" v-bind:key="index">{{item.text}}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="component_name" class="form-label">Component name</label>
                                <input type="text" class="form-control" id="component_name" v-model="this.form.componentName" placeholder="component name" autocomplete="off">
                            </div>
                            <div class="mb-3">
                                <label for="file" class="form-label">File Component</label>
                                <input type="file" class="form-control" ref="file" @change="this.changeFile" id="file" autocomplete="off">
                            </div>
                        </div>
                        <div class="card-footer text-right">
                            <button type="submit" class="btn btn-sm btn-primary">simpan</button>
                        </div>
                    </div>
                </form>
            </div>
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
import api from '../../../../config/api';
// import CardFormSection from '../../section/component/CardFormSection.vue';
export default {
    name: "component",
    // components: {
    //     CardFormSection,
    // },
    data(){
        return {
            dNone: true,
            modalComfirm: false,
            component: null,
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
        }
    },
    methods: {
        async deleteSection(section_id){
            await api.DELETE('/section/' + section_id);
            await this.fetchSection();
        },
        toggleSection(){
            this.dNone = this.dNone == true ? false : true;
        },
        async onDeleteComponent(){
            const response = await api.DELETE('/component/' + this.component.id);
            console.log(response);
            // if(response.status){
                this.fetchSection();
            // }

            this.modalComfirm = false;
        },
        onComponentClick(comp) {
            this.form.sectionId = comp.section_id;
            this.form.componentName = comp.name;
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
        }
    },
    created() {
        this.fetchSection();
    }

}
</script>

<style>
.show{
    display: block !important;
}
</style>