<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <button class="btn btn-sm btn-primary">Add User</button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-12">
                <div class="card">
                    <div class="row text-start p-3">
                        <div class="col-sm text-muted fw-bold">Avatar</div>
                        <div class="col-sm text-muted fw-bold">Username</div>
                        <div class="col-sm text-muted fw-bold">Email</div>
                        <div class="col-sm text-muted fw-bold">Register</div>
                        <div class="col-sm text-muted fw-bold">Provider</div>
                    </div>
                    
                </div>
                <div class="card" v-for="user, index in this.users" v-bind:key="index">
                    <div class="row p-3" >
                        <div class="col-sm text-muted"><img v-bind:src="user.avatar" class="img-thumbnail rounded-circle" width="50" alt="img-thumb"/></div>
                        <div class="col-sm text-muted">{{user.username}}</div>
                        <div class="col-sm text-muted">{{user.email}}</div>
                        <div class="col-sm text-muted">{{user.register_at}}</div>
                        <div class="col-sm text-muted">{{user.providerId}}</div>
                    </div>
                </div>
                <!-- <div class="card p-5">
                    <div v-if="this.loading">Loading......</div>
                    <div v-else>
                        <TableView :tbHeaders="this.tbHeaders" :tbData="this.data" />
                    </div>
                    
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../../config/api';
// import TableView from '../../.../../../../components/Table.view.vue';
export default {
    name: 'users',
    components: {
        // TableView,
    },
    data(){
        return {
            loading: true,
            tbHeaders: ['No', 'Username', 'Avatar', 'Rules'],
            data: [["","","",""]],
            users: [],
            
        }
    },
    methods: {
        async onbuttonClick(){
            console.log('button click');
        },  
        async fetchAll(){
            this.data = [];
            this.users = [];
            const response = await api.GET('/users');
            if(response.status){
                this.users = response.payload;
                var i = 1;
                for (const user of response.payload) {
                    this.data.push([
                        i, 
                        user.username, 
                        user.avatar, 
                        user.rules.name, 
                        
                    ]);
                    i++;
                }
            }
            console.log(this.users);
            this.loading = false;

        }
    },
    created() {
        this.fetchAll();
    },
}
</script>
<style>
.table {
    width: 100% !important;
}
.dataTables_filter{
    text-align: end !important;
}
.pagination{
    justify-content: flex-end !important;
}

</style>