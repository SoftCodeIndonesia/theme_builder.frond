<template>
    <div class="item {{result.offer}} {{result.product}}">
        <img :src="result.banner">
            <div class="detail">
            <div class="detail__info">
                <h4>{{ result.titile }}</h4>
                <p>{{ result.description }}</p>
            </div>
            <button class="secondary"><a :href=result.uri >View Detail</a></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "card-filter",
    props: {
        // titile: String,
        // description: String,
        // uri: String,
        result: Object
    }
}
</script>