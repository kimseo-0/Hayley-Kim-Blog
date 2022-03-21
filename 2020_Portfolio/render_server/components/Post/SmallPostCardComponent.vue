<template>
    <div class="small-post-card-container">
        <v-image-slide-component :images="post.Images"/>

        <div class="small-post-card-top-container">
            <nuxt-link class="small-post-card-title" :to="`project/${post.id}`">
                {{post.title}}
            </nuxt-link>
            <div class="small-post-card-period">
                {{post.startTime}}~{{post.endTime}}
            </div>
        </div>
        <div class="small-post-card-summary">
            {{post.summary}}
        </div>
    </div>
</template>

<script>
    import VImageSlideComponent from "../Image/VImageSlideComponent";

    export default {
        name: "SmallPostCardComponent",
        components: {
            VImageSlideComponent
        },
        props: {
            color : String,
            post: Object
        },
    }
</script>

<style scoped>
    .small-post-card-container {
        z-index:1;
        border-radius: 5px;
        width: 100%;
        height: 100%;
    }
    .small-post-card-top-container {
        overflow: auto;
        position: relative;
        padding: 10px;
    }
    .small-post-card-title {
        color: rgb(144, 107, 255);
        float:left;
        text-decoration: none;
        font-size: 20px;
    }
    .small-post-card-period {
        float:right;
        font-size: 12px;
        position: absolute;
        top: 0;
        right: 0;
        color: #8A8A8A;
    }
    .small-post-card-summary {
        clear: both;
        font-size: 14px;
        color: #ababab;
        padding: 0 12px;
    }
</style>