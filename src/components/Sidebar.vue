<template>
    <!-- sidebar -->
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <router-link to="/" class="text-muted list-group-item fw-bold text-dark" id="offcanvasWithBothOptionsLabel">MANAGEMENT</router-link>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="list-group list-group-menu-sidebar">
                <a href="" v-for="data, key in this.menu" v-bind:key="key" @click.prevent="this.to(data.path)" class="list-group-item text-muted border-none px-0 list-group-item-action">{{data.name}}</a>
                
                <!-- <a class="list-group-item border-none px-0 list-group-item-action" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Link with href
                </a>
                    <div class="collapse mt-2" id="collapseExample">
                        <div class="card card-body border-none">
                            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                        </div>
                    </div>
                 -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "sidebar",
    data(){
        return {
            title: 'MANAGEMENT',
            menu: [
                {
                    name: 'Role',
                    path: '/rules'
                },
                {
                    name: 'Users',
                    path: '/user'
                },
                {
                    name: 'Component',
                    path: '/component'
                },
                {
                    name: 'Meta Data',
                    path: '/meta'
                },
            ]
        }
    },
    methods: {
        to(path){
            this.modal = false;
            this.$router.push({ path: path })
        }
    }
    
}
</script>
<style>
    .offcanvas {
        /* background-color: transparent !important; */
        margin: 1% 1% !important;
        border-radius: .5rem;
    }
</style>