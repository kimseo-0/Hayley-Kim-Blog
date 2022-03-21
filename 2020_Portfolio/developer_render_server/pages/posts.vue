<template>
    <v-card flat style="padding: 20px; width: 100%">
        <v-btn absolute fixed icon right bottom dark x-large style="bottom: 30px; right: 35px; background-color: rgb(144, 107, 255)" nuxt :to="`/postForm/${-1}`">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn v-show="searchTag" absolute fab fixed text right bottom dark style="bottom: 90px; right: 35px; background-color: rgb(144, 107, 255)" @click="getAllPosts">
            All
        </v-btn>
        <v-card-title>
            <h3>POSTS</h3>
        </v-card-title>
        <v-card-subtitle style="clear: both">
            <v-text-field v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details />
        </v-card-subtitle>
        <post-data-component :search="search" :search-tag="searchTag" :posts="posts" :search-posts="searchPosts" @searchHashTag="searchHashTag"/>
    </v-card>
</template>

<script>
   import PostDataComponent from "../components/Posts/PostDataComponent";

    export default {
        name: "posts",
        components:{
            PostDataComponent
        },
        data() {
            return {
                search: '',
                searchTag: false
             }
        },
        computed: {
            posts() {
                return this.$store.state.post.allPosts;
            },
            searchPosts() {
                return this.$store.state.post.searchPosts;
            }
        },
        methods: {
            searchHashTag() {
                this.searchTag = true;
            },
            getAllPosts() {
                this.searchTag = false;
            }
        },
        async created() {
            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
    }
</script>

<style scoped>

</style>