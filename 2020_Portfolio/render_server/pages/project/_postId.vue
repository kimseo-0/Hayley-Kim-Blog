<template>
    <v-card v-scroll="onScroll" id="post-container" flat color="black" dark height="100%" style="padding: 30px 10px">
        <v-row style="padding-bottom: 20px" dense>
            <v-col v-if="!isMobile" cols="0" md="2" lg="3"/>
            <v-col cols="12" md="8" lg="6" style="height: 100%;">
                <single-post-component :post="post" @getContents="getContents"/>

                <div style="height: 50px;"></div>

                <single-post-menu-component/>

                <div style="padding: 20px 0; clear:both">
                    <comment-component :post-id="post.id" :me="me"/>
                </div>
            </v-col>
            <v-col v-if="!isMobile" cols="0" md="2" lg="3" style="padding: 30px">
                <div v-show="this.$vuetify.breakpoint.name!=='md'" style="position: fixed">
                    <single-post-contents-component :top="top" :contents="contents"/>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import SinglePostComponent from "../../components/Post/SinglePostComponent";
    import CommentComponent from "../../components/Comment/CommentComponent";
    import SinglePostMenuComponent from "../../components/Post/SinglePostMenuComponent";
    import SinglePostContentsComponent from "../../components/Post/SinglePostContentsComponent";

    export default {
        name: "_postId",
        components: {
            SinglePostContentsComponent,
            SinglePostMenuComponent,
            CommentComponent,
            SinglePostComponent,
        },
        data () {
            return {
                contents: [],

                top: 0,
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
                        return false;
                    case 'lg':
                        return false;
                    case 'xl':
                        return false;
                    default:
                        return true;
                }
            },
            me() {
                return this.$store.state.user.me;
            },
            post() {
                return this.$store.state.post.post;
            },
            posts() {
                return this.$store.state.post.posts;
            },
        },
        methods : {
            getContents(data) {
                const {contents} = data;
                this.contents = contents;
            },
            onScroll(e) {
                this.top = e.target.scrollingElement.scrollTop;
            }
        },
        async fetch({store,params}) {
            try {
                const res = await store.dispatch("post/loadSinglePost",{
                    postId : params.postId
                });
                const {info} = res;
                if (info === '') {

                }
            } catch (e) {
                console.error(e);
            }
        },
        created() {
            this.$store.commit('currentPage',{
                currentPage : "singlePost"
            });
        },
        mounted() {
        },
        beforeDestroy() {
        }
    }
</script>

<style scoped>

</style>