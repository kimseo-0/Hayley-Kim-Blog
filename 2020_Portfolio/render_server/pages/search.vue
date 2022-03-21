<template>
    <v-card class="project-container" dark color="black">
        <v-row>
            <v-col cols="12">
                <h3>PROJECT</h3>
            </v-col>
            <v-col cols="12">
                <div v-if="searchPosts.length === 0">
                    "{{$route.query.q}}"에 대한 검색 결과가 없습니다
                </div>
                <div v-else>
                    "{{$route.query.q}}"에 대한 검색 결과가 {{searchPosts.length}}개 있습니다.
                </div>
            </v-col>
            <v-col v-if="searchPosts" cols="12" sm="6" md="4" v-for="(post, index) in searchPosts" :key="index">
                <v-card dark width="100%" height="430px">
                    <post-card-component :post="post" :theme="'black'"/>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import PostCardComponent from "../components/Post/PostCardComponent";
    export default {
        watchQuery: true,
        name: "search",
        components : {
            PostCardComponent
        },
        data() {
            return {
            }
        },
        computed:{
            me() {
                return this.$store.state.user.me;
            },
            searchPosts() {
                return this.$store.state.post.searchPosts;
            },
        },
        methods : {
        },
        async fetch({store,query}) {
            const res = await store.dispatch('post/searchPost',{
                text : query.q
            });
            const {info} = res;
            if (info === 'no search result') {

            }
        },
        async created() {
            this.$store.commit('currentPage',{
                currentPage : "posts"
            });
        },
        mounted() {
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

