<template>
    <div class="mb-3">
        <label for="{{label}}" class="form-label">{{this.label}}</label>
        <input :type="type" class="form-control" id="{{label}}" :placeholder="this.label" required>
    </div>
</template>

<script>
export default {
    name: "form-component",
    props: {
        label: String,
        type: String,
        placeholder: String,
    }
}
</script>