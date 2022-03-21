<template>
    <v-form class="comment-form" v-model="valid" @submit.prevent="addComment">
        <table>
            <tr>
                <td class="comment-form-textarea-container">
                    <v-textarea v-model="text"
                            dark color="rgb(144, 107, 255)"
                            required single-line solo outlined flat :dense = true auto-grow hide-details
                            rows=3
                            height="100%"
                            :placeholder="me ? '' : '로그인 후 댓글을 달 수 있습니다'"
                            @keyup.enter.exact.prevent="enterText"
                            @keydown.enter.shift.exact.prevent="enterText" />
                </td>
                <td class="comment-form-button-container">
                    <v-btn icon @click="addComment" height="100%">
                        <v-icon class="comment-form-button-icon">
                            mdi-send
                        </v-icon>
                    </v-btn>
                </td>
            </tr>
            <tr v-show="info">
                <v-alert dense outlined type="error" width="100%" >
                    {{info}}
                </v-alert>
            </tr>
        </table>
    </v-form>
</template>

<script>
    export default {
        name: "CommentFormComponent",
        props : {
            me: Object,
            postId : Number
        },
        data() {
            return {
                valid : false,
                text : this.comment ? this.comment : '',

                info: null
            }
        },
        computed : {
            comment() {
                return this.$store.state.post.comment
            }
        },
        methods:{
            enterText() {
                this.text = this.text+'\n';
                console.log(this.text)
            },
            async addComment() {
                try {
                    if (!this.me) {
                        this.$store.commit('post/saveComment',{
                            text : this.text
                        });
                        this.info = '로그인 후 댓글을 사용할 수 있습니다';
                        return 0;
                    }
                    if (this.text === "") {
                        //info
                        return 0;
                    }
                    await this.$store.dispatch('post/addComment',{
                        postId : this.postId,
                        text : this.text
                    });
                    this.$store.commit('post/saveComment',{
                        text : ""
                    });
                    this.text = "";
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
</script>

<style scoped>
    .comment-form {
        width:100%;
        height: 100%
    }
    .comment-form-textarea-container {
        width: 100%;
        height: 100%;
        padding-right: 5px;
    }
    .comment-form-button-container {
        height: 100%;
        background-color: rgb(144, 107, 255);
        border-radius: 5px;
        cursor: pointer;
    }
    .comment-form-button-icon {
        padding: 5px;
    }
</style>