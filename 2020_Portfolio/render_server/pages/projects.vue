<template>
    <v-card class="project-container" color="black" dark>
        <v-row>
            <v-col cols="12">
                <h3>PROJECT</h3>
            </v-col>
            <v-col v-if="posts.length === 0">
                NO POST
            </v-col>
            <v-col v-else cols="12" sm="6" md="4" v-for="(post, index) in posts" :key="index">
                <v-card dark width="100%" height="430px">
                    <post-card-component :post="post" :color="'black'"/>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import PostCardComponent from "../components/Post/PostCardComponent";

    export default {
        name: "posts",
        components : {
            PostCardComponent,
        },
        data() {
            return {
            }
        },
        computed:{
            me() {
                return this.$store.state.user.me;
            },
            posts() {
                return this.$store.state.post.posts;
            }
        },
        methods : {

        },
        async fetch({store}) {
            //store.dispatch('post/loadPosts');
        },
        async created() {
            if (this.posts.length === 0) {
                //await this.$store.dispatch('post/loadPosts');
            }
            this.$store.commit('currentPage',{
                currentPage : "posts"
            });
        },
        mounted() {
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style scoped>
    .project-container {
        padding: 40px 20px;
    }
</style>