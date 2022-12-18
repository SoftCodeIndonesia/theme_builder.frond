<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="onSubmit">
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="rules_name" class="form-label">Rules</label>
                            <input type="text" class="form-control" v-model="this.rules" id="rules_name" placeholder="rules name" required>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-sm btn-primary">simpan</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from '../../../../config/api';
export default {
    name: "Update-view",
    data(){
        return {
            rules: '',
        }
    },
    methods: {
        async fetchDetail(){
            const response = await api.GET('/rules/' + this.$router.currentRoute.value.params.id);
            if(response.status){
                this.rules = response.payload.name;
            }
        },
        async onSubmit(){
            try {
                const response = await api.PUT(`/rules/${this.$router.currentRoute.value.params.id}`, {name: this.rules});
                if(response){
                    this.$router.push({
                        path: '/rules'
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    created(){
        this.fetchDetail();
    }

}
</script>