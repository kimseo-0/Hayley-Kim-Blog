<template>
    <v-row>
        <v-col cols="12" style="overflow: auto">
            <div style="float: left">
                LATEST PROJECT
            </div>
            <div style="float: right">
                <more-button-component link="/projects"/>
            </div>
        </v-col>

        <v-col v-if="index<3" cols="12" sm="6" v-for="(post, index) in posts" :key="index">
            <v-card dark width="100%" height="430px">
                <post-card-component :post="post"/>
            </v-card>
        </v-col>

        <v-col v-show="(this.$vuetify.breakpoint.name === 'xs')" cols="12">
            <div style="float: right">
                <more-button-component link="/projects"/>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    import PostCardComponent from "./PostCardComponent";
    import MoreButtonComponent from "../Button/MoreButtonComponent";

    export default {
        name: "LatestPostComponent",
        components: {MoreButtonComponent, PostCardComponent},
        props: {
            posts: Array
        }
    }
</script>

<style scoped>

</style>