<template>
    <div class="card">
        <div class="card-header">
            Add Section
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label for="name" class="form-label">Section Name</label>
                <input type="text" class="form-control" id="name" placeholder="section name" autocomplete="off">
            </div>
        </div>
        <div class="card-footer text-right">
            <button class="btn btn-sm btn-primary">simpan</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "card create section",
    
    props: {
        onSubmit: () => {},
    }
}

</script>