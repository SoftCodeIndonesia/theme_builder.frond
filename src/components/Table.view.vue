<template>
    <DataTable class="table table-bordered">
        <thead> 
            <tr>
                <th v-for="header, index in tbHeaders" v-bind:key="index">{{header}}</th>
              
            </tr>
        </thead>
        <tbody>
            <tr v-for="data, index in tbData" v-bind:key="index">
                <td v-for="row, index in data" v-bind:key="index" v-html="row"></td>
               
            </tr>
        </tbody>
    </DataTable>
</template>

<script>
import DataTable from 'datatables.net-vue3';
export default {
    name: "Table-view",
    props: {
        
        tbHeaders: Array,
        tbData: Array,
    },
    components: {
        DataTable,
    }
}
</script>