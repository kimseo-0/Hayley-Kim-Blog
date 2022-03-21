<template>
    <div style="">
        <div style="z-index: 2; width: 100%; padding: 10px; overflow: auto; position: fixed; top:0; background-color: white">
            <h3 style="float: left;">
                <v-btn icon @click="back">
                    <v-icon large color='black'>
                        mdi-chevron-left
                    </v-icon>
                </v-btn>
                POST FORM
            </h3>
        </div>

        <post-form-component :post="post" :type="'posts'"/>
    </div>
</template>

<script>

    import PostFormComponent from "../../components/PostForm/PostFormComponent";
    export default {
        name: "postForm",
        components : {
            PostFormComponent

        },
        data() {
            return {
                type : "posts",
            }
        },
        computed : {
            post() {
                return this.$store.state.post.post
            }
        },
        methods : {
            back() {
                this.$router.push('/posts');
            }
        },
        async fetch({store,params}) {
            try {
                if (params.postId != -1) {
                    await store.dispatch("post/loadSinglePost",{
                        postId : params.postId
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },
        created() {
            this.$store.commit('currentPage',{
                currentPage : "postForm"
            });
        }
    }
</script>

<style scoped>

</style>