<template>
    <div class="index-container">
        <v-row dense>
            <v-col v-if="!isMobile" cols="0" lg="2"/>
            <v-col cols="12" lg="8">
                <v-card height="200px" dark color="black">
                    <index-banner-component/>
                </v-card>
                <v-card class="index-card" v-if="posts.length !== 0" color="black" dark>
                    <latest-post-component :posts="posts"/>
                </v-card>
                <v-card class="index-card" color="black" dark>
                    <contact-component/>
                </v-card>
            </v-col>
            <v-col v-if="!isMobile" cols="0" lg="2"/>
        </v-row>
    </div>
</template>

<script>
    import ContactComponent from "../components/Contact/ContactComponent";
    import IndexBannerComponent from "../components/IndexBannerComponent";
    import LatestPostComponent from "../components/Post/LatestPostComponent";

    export default {
        name: "index",
        components: {
            LatestPostComponent,
            IndexBannerComponent,
            ContactComponent
        },
        data() {
            return {
            }
        },
        computed : {
            isMobile() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return true;
                    case 'sm':
                        return true;
                    case 'md':
                        return true;
                    case 'lg':
                        return false;
                    case 'xl':
                        return false;
                    default:
                        return true;
                }
            },
            me (){
                return this.$store.state.user.me;
            },
            posts() {
                return this.$store.state.post.posts;
            },
        },
        methods: {
        },
        async fetch({store}) {
            store.dispatch('post/loadPosts');
        },
        async created() {
            this.$store.commit('currentPage',{
                currentPage : "home"
            });
        },
    }
</script>

<style scoped>
    .index-container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .index-card {
        display: block;
        padding: 30px 10px;
        clear: both;
    }
</style>