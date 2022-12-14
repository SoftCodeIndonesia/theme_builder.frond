<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <button class="btn btn-sm btn-primary">Add User</button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-12">
                <div class="card p-5">
                    <DataTable class="table table-bordered" :data="this.data">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Avatar</th>
                                <th>Rules</th>
                            </tr>
                        </thead>
                     </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../../config/api';
import DataTable from 'datatables.net-vue3';
export default {
    name: 'users',
    components: {
        DataTable,
    },
    data(){
        return {
            data: [["","","",""]],
        }
    },
    methods: {
        async fetchAll(){
            this.data = [];
            const response = await api.GET('/users');
            if(response.status){
                var i = 1;
                for (const user of response.payload) {
                    this.data.push([i, user.username, user.avatar, user.rules.name]);
                    i++;
                }
            }
            console.log(response);
        }
    },
    created() {
        this.fetchAll();
    }
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