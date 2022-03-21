<template>
    <div class="comment-card-container">
        <div v-if="!commentForm">
            <v-list-item>
                <v-list-item-avatar size="50" color="white">
                    <v-img class="comment-user-avatar-image" :src="`http://localhost:4001/${comment.User.avatarImageUrl}`" alt=""/>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        <div class="comment-user-nickname" v-if="post.User.id===comment.User.id">{{comment.User.nickName}}(writer)</div>
                        <div class="comment-user-nickname" v-else>{{comment.User.nickName}}</div>
                        <div v-if="comment.createdAt !== comment.updatedAt">(수정됨)</div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <div class="comment-time-text">{{$moment(comment.updatedAt).fromNow()}}</div>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-row align="center" justify="end">
                    <comment-menu-component v-if="me" :me="me" :delete-overlay="deleteOverlay" :report-overlay="reportOverlay" :comment-user-id="comment.User.id"
                                            @getCommentUpdateForm="getCommentUpdateForm" @openDeleteOverlay="openDeleteOverlay" @openReportOverlay="openReportOverlay" />
                </v-row>
            </v-list-item>
            <div class="comment-text">
                {{comment.text}}
            </div>
        </div>

        <div v-else>
            <v-form class="comment-update-form" v-model="valid" @submit.prevent="updateComment">
                <v-textarea v-model="text"
                        required single-line solo outlined flat :dense=true auto-grow hide-details
                        color="rgb(144, 107, 255)"
                        rows=3
                        height="100%"
                        placeholder="로그인 후 댓글을 달 수 있습니다"
                        @keyup.enter="updateComment"
                />
                <div class="comment-update-form-button">
                    <v-btn type="submit" text color="green" :disabled="saveText===text">
                        save
                    </v-btn>
                    <v-btn @click="goCancel" text color="red">
                        cancel
                    </v-btn>
                </div>
            </v-form>
        </div>

        <div v-show="info">
            <v-alert dense outlined type="error" width="100%">
                {{info}}
            </v-alert>
        </div>

        <comment-report-overlay :report-overlay="reportOverlay" @closeReportOverlay="closeReportOverlay" @reportComment="reportComment"/>
        <comment-delete-overlay :delete-overlay="deleteOverlay" @closeDeleteOverlay="closeDeleteOverlay" @deleteComment="deleteComment"/>
    </div>
</template>

<script>
    import CommentMenuComponent from "./CommentMenuComponent";
    import CommentReportOverlay from "./CommentReportOverlay";
    import CommentDeleteOverlay from "./CommentDeleteOverlay";

    export default {
        name: "CommentCardComponent",
        components: {
            CommentDeleteOverlay,
            CommentReportOverlay,
            CommentMenuComponent
        },
        props : {
            me: Object,
            comment : Object,
            index : Number
        },
        data() {
            return {
                valid : false,
                text : (this.comment.text),
                saveText : this.comment.text,
                commentForm : false,
                commentRules : [
                    v => !!v || 'comment is required',
                ],

                deleteOverlay: false,
                reportOverlay: false,

                info: null
            }
        },
        computed : {
            post() {
                return this.$store.state.post.post;
            }
        },
        methods : {
            getCommentUpdateForm() {
                this.text = this.comment.text;
                this.commentForm = !this.commentForm;
            },
            openDeleteOverlay() {
                this.deleteOverlay = true;
            },
            closeDeleteOverlay() {
                this.deleteOverlay = false;
            },
            openReportOverlay() {
                this.reportOverlay = true;
            },
            closeReportOverlay() {
                this.reportOverlay = false;
            },
            goCancel() {
                this.text = this.comment.text;
                this.commentForm = !this.commentForm;
            },

            async updateComment() {
                try {
                    if(this.saveText===this.text) {
                        return 0;
                    }
                    const res = await this.$store.dispatch('post/updateComment',{
                        commentUserId: this.comment.userId,
                        commentId : this.comment.id,
                        text : this.text,
                        index : this.index
                    });
                     const {info} = res;
                     if (info === 'not available') {
                         this.info = '수정 권한이 없습니다'
                     }
                    this.goCancel();
                } catch(e) {
                    console.error(e);
                }
            },
            async deleteComment() {
                try {
                    this.closeDeleteOverlay();
                    const res = await this.$store.dispatch('post/deleteComment',{
                        commentUserId: this.comment.userId,
                        commentId : this.comment.id,
                        index : this.index
                    });
                    const {info} = res;
                    if (info === 'not available') {
                        this.info = '삭제 권한이 없습니다'
                    }
                } catch(e) {
                    console.error(e);
                }
            },
            async reportComment() {
                this.reportOverlay = false;
                await this.$store.dispatch('post/reportComment',{
                    commentId : this.comment.id,
                    text : this.radios === 'text' ? this.report : this.radios
                });
            }
        }
    }
</script>

<style scoped>
    .comment-card-container {
        width: 100%;
        height: 100%;
    }
    .comment-user-avatar-image {
        width: 100%;
        height: 100%;
    }
    .comment-user-nickname {
        float: left;
        font-size: 13px;
    }
    .comment-time-text {
        font-size: 12px;
        color: #8A8A8A;
    }
    .comment-text {
        clear:both;
        padding: 10px 12px;
        font-size: 16px;
        white-space: pre-line;
    }

    .comment-update-form {
        overflow: auto;
    }
    .comment-update-form-button {
        padding: 10px 0;
        float: right;
    }
</style>