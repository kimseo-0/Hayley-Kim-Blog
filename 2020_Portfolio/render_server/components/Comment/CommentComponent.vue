<template>
    <div style="width: 100%;">
        <div>
            <v-btn text @click="showComments=!showComments" >
                <span>
                    댓글 {{comments.length}}개
                    <v-divider inset/>
                </span>
            </v-btn>
        </div>

        <div v-show="showComments">
            <div style="padding:20px 0">
                <comment-form-component :post-id="postId" :me="me"/>
            </div>

            <div style="padding: 15px 0">
                <div v-for="(comment,index) in comments" :key="index" style="padding: 10px 0; border-bottom: #8A8A8A solid 1px">
                    <comment-card-component :me="me" :comment="comment" :index="index"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentCardComponent from "./CommentCardComponent";
    import CommentFormComponent from "../Form/CommentFormComponent";

    export default {
        name: "PostCommentComponent",
        props: {
            postId: Number,
            me: Object
        },
        components: {
            CommentFormComponent,
            CommentCardComponent,
        },
        data() {
            return {
                showComments: true
            }
        },
        computed: {
            comments() {
                return this.$store.state.post.comments;
            }
        }
    }
</script>

<style scoped>

</style>