<template>
    <DataTable :data="this.data" class="table table-bordered" aria-describedby="datatable-fixed-header_info" >
        <thead>
            <tr>
                <th>First</th>
                <th>Second</th>
            </tr>
        </thead>
    </DataTable>
</template>


<script>
import DataTable from 'datatables.net-vue3';
export default {
    name: 'template list',
    components: {
        DataTable,
    },
    data(){
        return {
            data: [
                [1, 2],
                [3, 4],
            ]
        }
    }
}
</script>

<style>
/* @import 'bootstrap'; */
/* @import 'datatables.net-bs5'; */


.dataTables_filter{
    float: right !important;
}
.dataTables_paginate{
    float: right !important;
}
</style>